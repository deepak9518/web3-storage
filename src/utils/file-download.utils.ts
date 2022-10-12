import axios, { AxiosRequestConfig } from "axios";
import store from "src/store";
import {
  setTotalDownloadBatch,
  setCurrentDownloadProgress,
} from "src/store/data";
import { formatBytes } from "src/utils/helpers";
import { DataTypeSingle } from "src/pages/dashboard";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export const downloadFile = async (
  name: string,
  url: string,
  handleError: () => void
) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "blob",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      onDownloadProgress: (progressEvent: { [key: string | number]: any }) => {
        const total = formatBytes(progressEvent.total);
        const current = formatBytes(progressEvent.loaded);
        store.dispatch(setCurrentDownloadProgress(current));
        store.dispatch(setTotalDownloadBatch(total));
      },
    });

    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    store.dispatch(setTotalDownloadBatch("0"));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    handleError();
  }
};

export const downloadMultipleFile = async (
  dataList: DataTypeSingle,
  handleError: () => void
) => {
  try {
    const zip = new JSZip();
    const promises = [];
    const allProgress = <any>[];
    for (const key in dataList) {
      const url = dataList[key].publicUrl;
      const config: {
        responseType: ResponseType | undefined| any;
        onDownloadProgress: (ProgressEvent: ProgressEvent) => void;
      } = {
        responseType: "blob",
        onDownloadProgress: (progressEvent: ProgressEvent) => {
          const progress = {
            current: progressEvent.loaded,
            total: progressEvent.total,
          };
          if (allProgress[String(key)]) {
            allProgress[key] = { ...progress };
          } else {
            allProgress.push({
              [key]: { ...progress },
            });
          }
          let total = 0;
          let current = 0;

          for (const prog of allProgress) {
            if (typeof prog.total === "number") {
              total += prog.total;
            }
            if (typeof prog.current === "number") {
              current += prog.current;
            }
          }
          store.dispatch(setCurrentDownloadProgress(formatBytes(current)));
          store.dispatch(setTotalDownloadBatch(formatBytes(total)));
        },
      };

      promises.push(axios.create().get(url, config));
    }

    const downloadedFiles = await Promise.all(promises);
    downloadedFiles.map((response, responseIndex) => {
      const currentFile = dataList.find((_, index) => index === responseIndex);
      const { data } = response;
      zip.file(currentFile?.file, new Blob([data]), { base64: true });
    });

    // generated zip files
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "data.zip");
      store.dispatch(setTotalDownloadBatch("0"));
    });
  } catch (e) {
    store.dispatch(setTotalDownloadBatch("0"));
    handleError();
  }
};
