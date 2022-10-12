import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "src/hooks/useReduxTypedHooks";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { usePrevious } from "src/hooks/usePrevious";
import { FileNameDialogProps } from "./index.types";
import { uploadFileThunk } from "src/store/data/slice";
import { DataItemType } from "src/pages/dashboard";
import * as Styled from "./index.styles";
// import { useRouter } from 'next/router';

const FileNameDialog = ({
  walletId,
  onFileUploading,
  onFileUploadComplete,
  onFileUploadFail,
  setLoader,
}: FileNameDialogProps) => {
  const dispatch = useAppDispatch();
  const { dataPreview } = useAppSelector((state) => state.common);
  const prevDataPreview = usePrevious(dataPreview);
  const [fieldValue, setFieldValue] = useState<string>("");
  // const [fieldBlur, setFieldBlur] = useState<boolean>(false);
  const [fileCreated, setFileCreated] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);
  // const router = useRouter();
  const router: { [key: string | number]: any } = { quer: { folderId: "" } };
  const {
    query: { folderId = "root" },
  } = router;
  useEffect(() => {
    if (fileCreated && dataPreview && prevDataPreview !== dataPreview) {
      setLoader(false);
      window.open(
        `/preview?filename=${encodeURIComponent(dataPreview.file)}`,
        "_blank"
      );
    }
  }, [dataPreview, fileCreated]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
    setChanged(true);
  };

  const hasError = (): boolean => {
    if (!changed) return false;
    return (
      (fieldValue.length > 0
        ? /[<>:"/\\|?*.”]/.test(fieldValue)
        : fieldValue.length === 0) || false
    );
  };

  // generate DOCX document
  const generateDocx = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun("")],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);

    return blob;
  };

  const handleClickSave = async () => {
    const blob = await generateDocx();

    onFileUploading(true);

    const uploadFileResponse = await uploadFileThunk({
      walletId: walletId,
      file: new File([blob], `${fieldValue}.docx`),
      parentFolderId: `${folderId}`,
    });

    if (
      uploadFileResponse?.type &&
      uploadFileResponse?.type.includes("data/upload/fulfilled")
    ) {
      onFileUploadComplete(true);
      setFileCreated(true);
      dispatch({ type: "setDataPreview", payload: uploadFileResponse?.payload as DataItemType });
      setLoader(true);
    } else {
      onFileUploadFail(true);
    }
    dispatch({ type: "closeDialog" });
  };
  return (
    <Styled.CustomDialogWindow
      open
      maximumWidth={480}
      fullWidth
      crossIconVisibility
      dialogHeader={<Styled.HeaderTitle>Create File</Styled.HeaderTitle>}
    >
      <Styled.ContentWrapper>
        <TextField
          label="File name"
          color="primary"
          fullWidth
          value={fieldValue}
          placeholder="Untitled File"
          onChange={handleChangeInput}
          // onBlur={() => setFieldBlur(true)}
          error={hasError()}
          helperText={
            !changed || !hasError()
              ? ""
              : fieldValue.length === 0
              ? "Name is required"
              : 'The file name cannot contain any of the following characters: \n < > : " /  | ? * . '
          }
        />
        <Styled.Footer>
          <Button
            variant="contained"
            onClick={handleClickSave}
            disabled={fieldValue.length === 0 || hasError()}
          >
            Create
          </Button>
        </Styled.Footer>
      </Styled.ContentWrapper>
    </Styled.CustomDialogWindow>
  );
};

export default FileNameDialog;
