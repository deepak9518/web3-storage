import { docTypes, sheetTypes } from "../pages/preview/index.page";
import { FILE_ICONS } from "../components/Table/constants";
import { AxiosError } from "axios";

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function formatDates(date: string | number) {
  const dateStr = new Date(date).toLocaleString("en-GB");
  const [dd, mm, yyyy, hh, mi] = dateStr.split(/[/,:\-T]/);

  return `${dd}-${mm}-${yyyy} ${hh}:${mi}`;
}

export const copyToClipBoard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const getFileType = (url = "") => {
  switch (getFileExtension(url).toUpperCase()) {
    case "PNG":
    case "JPG":
    case "JPEG":
    case "WEBP":
    case "GIF":
      return "image";
    case "HTML":
      return "html";
    case "PSD":
      return "psd";
    case "AI":
    case "EPS":
      return "ai";
    case "MP3":
    case "WAV":
    case "M4A":
    case "AAC":
    case "FLAC":
      return "audio";
    case "XLS":
    case "XLSX":
      return "excel";
    case "DOC":
    case "DOCX":
      return "word";
    case "PDF":
      return "pdf";
    case "MP4":
    case "MOV":
    case "HEVC":
      return "video";
    case "ZIP":
      return "zip";
    default:
      return "file";
  }
};

export const getIcon = (url: string) => {
  return FILE_ICONS[getFileType(url)] ?? FILE_ICONS.file;
};

export const getFileExtension = (url: string) => {
  const regx = /\#|\?/;
  return url.split(".")?.pop()?.split(regx)[0] ?? "";
};

export const getIconByType = (type: string) => {
  let icon = "";

  if (sheetTypes.includes(type)) icon = "excel";
  if (docTypes.includes(type)) icon = "word";
  if (type === "pdf") icon = "pdf";
  else if (!icon) icon = "file";

  return icon;
};

export const getErrorMessage = (json: { [key: string | number]: any }) => {
  return json?.response?.data?.message
    ? json?.response?.data?.message
    : json?.response?.data?.errors.length
    ? json?.response?.data?.errors
    : "Error while processing your request";
};
