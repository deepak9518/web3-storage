import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { FileRenameDialogProps } from "./index.types";
import * as Styled from "./index.styles";
import { useDispatch } from "react-redux";
import { renameFileThunk, renameFolderThunk } from "src/store/data/slice";
import { fileReName } from "src/utils/index";

const FileRenameDialog = ({ fileDetails }: FileRenameDialogProps) => {
  const dispatch = useDispatch();
  const fileName = fileDetails.file.replace(/\.[^/.]+$/, "");

  const [fieldValue, setFieldValue] = useState<string>(fileName || "");
  const [changed, setChanged] = useState<boolean>(false);
  const isFolder = fileDetails.type === "folder";

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
    setChanged(true);
  };

  const handleClickSave = () => {
    const renameThunk = isFolder ? renameFolderThunk : renameFileThunk;

    renameThunk({
      name: isFolder ? fieldValue : fileReName(fileDetails?.file, fieldValue), //`${fieldValue.split('.')[0]}.${fileDetails?.file?.split('.')[1]}`,
      walletId: fileDetails.walletId,
      fileId: isFolder ? fileDetails.folderId : fileDetails.fileId,
    });

    dispatch({ type: "closeDialog" });
  };

  const hasError = (): boolean => {
    if (!changed) return false;
    return (
      (fieldValue.length > 0
        ? /[<>:"/\\|?*.”]/.test(fieldValue)
        : fieldValue.length === 0) || false
    );
  };

  return (
    <Styled.CustomDialogWindow
      open
      maximumWidth={480}
      fullWidth
      crossIconVisibility
      dialogHeader={
        <Styled.HeaderTitle>
          Rename {isFolder ? "Folder" : "File"}
        </Styled.HeaderTitle>
      }
    >
      <Styled.ContentWrapper>
        <TextField
          label={`New ${fileDetails.type} name`}
          color="primary"
          fullWidth
          value={fieldValue}
          placeholder="Untitled File"
          onChange={handleChangeInput}
          error={hasError()}
          helperText={
            !changed || !hasError()
              ? ""
              : fieldValue.length === 0
              ? "Name is required"
              : `The ${fileDetails.type} name cannot contain any of the following characters: \n < > : " /  | ? * . `
          }
          FormHelperTextProps={{
            sx: {
              marginLeft: 0,
              marginRight: 0,
            },
          }}
        />
        <Styled.Footer>
          <Button
            variant="contained"
            onClick={handleClickSave}
            disabled={fieldValue.length === 0 || hasError()}
          >
            Save
          </Button>
        </Styled.Footer>
      </Styled.ContentWrapper>
    </Styled.CustomDialogWindow>
  );
};

export default FileRenameDialog;
