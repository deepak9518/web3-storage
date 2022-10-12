import React, { useEffect } from "react";
import { DataItemType } from "../dashboard";
import { useAppSelector } from "../../hooks/useReduxTypedHooks";
import { IconButton } from "@mui/material";
import { CloseIcon } from "../../assets/svg";
import { UserInfoDropdown } from "../../modules/UserInfoDropdown";
import { COLORS } from "../../constants/colors";

export const docTypes = [
  "doc",
  "docm",
  "docx",
  "docxf",
  "dot",
  "dotm",
  "dotx",
  "epub",
  "fodt",
  "fb2",
  "htm",
  "html",
  "mht",
  "odt",
  "oform",
  "ott",
  "oxps",
  "pdf",
  "rtf",
  "txt",
  "djvu",
  "xml",
  "xps",
];
export const sheetTypes = [
  "csv",
  "fods",
  "ods",
  "ots",
  "xls",
  "xlsm",
  "xlsx",
  "xlt",
  "xltm",
  "xltx",
];
export const presTypes = [
  "fodp",
  "odp",
  "otp",
  "pot",
  "potm",
  "potx",
  "pps",
  "ppsm",
  "ppsx",
  "ppt",
  "pptm",
  "pptx",
];

const Preview = () => {
  // const router = useRouter();
  const router:{[key: string|number]:any} = {query: {filename:''}}
  const { dataPreview, copiedDataPreview } = useAppSelector(
    (state) => state.common
  );
  const { token } = useAppSelector((state) => state.user);

  const onlyOfficeCallbackUrl = (preview: DataItemType | null | undefined) =>
    `${process.env.ONLYOFFICE_CALLBACK_API_BASE_URL}/wallets/${preview?.walletId}/storage/${preview?.fileId}/updateCallback`;

  useEffect(() => {
    if (router?.query?.filename === copiedDataPreview?.file) {
      loadEditor(copiedDataPreview);
    }

    if (router?.query?.filename === dataPreview?.file) {
      loadEditor(dataPreview);
    }
  }, [dataPreview, copiedDataPreview, router.query]);

  const loadEditor = (previewItem: DataItemType | undefined) => {
    const script = document.createElement("script");
    const body = document.querySelector("body");
    // body && (body.style.height = "100%");

    const apiUrl = process.env.ONLYOFFICE_API_URL;

    if (!apiUrl) {
      // history.back();
    } else {
      script.src = apiUrl;
      script.async = true;

      document.body.appendChild(script);

      script.onload = () => {
        const { filename } = router.query;

        if (filename && typeof filename === "string") {
          const type = filename.split(".")[filename.split(".").length - 1];
          let documentType;
          if (docTypes.includes(type)) documentType = "word";

          if (sheetTypes.includes(type)) documentType = "cell";

          if (presTypes.includes(type)) documentType = "slide";

          if (documentType)
            openOnlyOfficeEditor(type, documentType, previewItem);
        }
      };
    }
  };

  const handleClose = () => {
    if (window) {
      window.close();
    }
    // router.back();
  };

  const openOnlyOfficeEditor = (
    fileType: string,
    documentType: string,
    previewItem: DataItemType | undefined
  ) => {
    // Disable type check due to no package DocsAPI in npm registry
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.docEditor = new DocsAPI.DocEditor("placeholder", {
      token, //`Bearer ${token}`,
      document: {
        fileType,
        key: previewItem?.fileId,
        title: previewItem?.file,
        url: previewItem?.publicUrl,
        permissions: {
          edit:
            previewItem?.owner === "You"
              ? true
              : previewItem?.access === "WRITE",
        },
      },
      documentType: documentType,
      editorConfig: {
        callbackUrl: onlyOfficeCallbackUrl(previewItem),
        customization: {
          anonymous: { request: false },
          logo: {
            image: `${process.env.BASE_URL}/web3cloud.png`,
            imageEmbedded: `${process.env.BASE_URL}/web3cloud.png`,
            url: `${process.env.BASE_URL}/dashboard`,
          },
          uiTheme: "web3_doc_theme",
        },
      },

      services: {
        CoAuthoring: {
          autoAssembly: {
            enable: true,
            interval: "1m",
          },
        },
      },
      height: "100%",
      width: "100%",
    });
  };
  return (
    <>
      <div id="placeholder" />
      <div className="preview-hide-wrapper" />
      <div className="preview-menu-container">
        <UserInfoDropdown />
      </div>
      <IconButton size="small" className="preview-close" onClick={handleClose}>
        <CloseIcon stroke={COLORS.WHITE_100} />
      </IconButton>
    </>
  );
};

export default Preview;
