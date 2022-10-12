// import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Grid, Button, ButtonProps } from "@mui/material";
import {
  Wrapper,
  FolderContainer,
  FolderTitle,
  IconContainer,
} from "./index.styles";
import { CaretRightIcon, FolderIcon } from "src/assets/svg";
import Path from "components/Table/Path";
import { SORT_VALUES, sortList } from "components/Table/utils";
import { COLORS } from "src/constants/colors";
import { useAppDispatch, useAppSelector } from "src/hooks/useReduxTypedHooks";
import { moveToFolderThunk } from "store/data/slice";
import { FileProps, FolderProps } from "store/data/types";
import { DataItemType } from "pages/dashboard/index";
import { getFilesAndFoldersData } from "../../services/file/file.service";
import { filterFolders } from "utils/folders.utils";

interface ISubPopoverProps {
  item: DataItemType | FolderProps | null;
  onClose: () => void;
  breadcrumbs: string[];
}

const CustomButton = (props: ButtonProps<"span">) => {
  return <Button component="span" {...props} />;
};

export const SubPopover: React.FC<ISubPopoverProps> = ({
  item,
  onClose,
  breadcrumbs,
}) => {
  const [selected, setSelected] = useState<FolderProps | null>(null);
  const [listFiles, setListFiles] = useState<(FileProps | FolderProps)[]>([]);
  const [links, setLinks] = useState<string[]>(breadcrumbs || ["Home"]);

  const router: { [key: string | number]: any } = { query: { folderId: "" } };
  // const router = useRouter();
  const { folderId } = router.query;

  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {
    data: { files },
    user: { user },
  } = useAppSelector((state) => state);

  const filterOutCurrentFolder = (
    list: (FileProps | FolderProps)[]
  ): (FileProps | FolderProps)[] =>
    [...list].filter(
      (val) => val._id !== item?.folderId && item?._id !== val._id
    );

  useEffect(() => {
    setListFiles(filterOutCurrentFolder(files));
  }, [files]);

  const generateRootPlaceholder = (): FolderProps => ({
    file: "Home",
    folderId: "root",
    modified: Date.now().toString(),
    owner: "You",
    ownerId: user?.walletName,
    size: "0 Bytes",
    type: "folder",
    walletId: user?.walletName,
    _id: "root",
  });

  useEffect(() => {
    if (folderId && folderId !== "root") {
      const rootPlaceholder = generateRootPlaceholder();
      const _files = [...files];
      _files.push(rootPlaceholder);
      setListFiles(filterOutCurrentFolder(_files));
    }
  }, [folderId]);

  const onFolderSelect = (folder: FolderProps) => {
    setSelected(folder);
  };

  const filterFiles = (
    list: (FileProps | FolderProps)[],
    folderId: string
  ): (FileProps | FolderProps)[] =>
    list.filter(
      (val) => (!val.type || val.type !== "folder") && val.folderId === folderId
    );

  const seeSubFolders = async (folder: FolderProps) => {
    const filesAndFolders = await getFilesAndFoldersData(
      user.walletName,
      folder._id || "root"
    );

    const newData: (FileProps | FolderProps)[] =
      filesAndFolders && Array.isArray(filesAndFolders)
        ? filterOutCurrentFolder(filesAndFolders)
        : [];

    const newFolders = filterFolders(newData);
    const newFiles = filterFiles(newData, folder._id || "root");

    if (newFolders.length) {
      const filesList = [...newFiles, ...newFolders];
      if (folder._id !== "root" && item?.folderId !== "root") {
        const rootPlaceholder = generateRootPlaceholder();
        filesList.push(rootPlaceholder);
      }
      setListFiles(
        sortList(filesList, "modified", SORT_VALUES.DESC) as (
          | FileProps
          | FolderProps
        )[]
      );
      // Replace this with breadcrumb solution
      setLinks([folder.file]);
      onFolderSelect(folder);
    } else {
      onFolderSelect(folder);
    }
  };

  const onCancel = () => {
    setSelected(null);
    onClose();
  };

  const onSubmit = async () => {
    if (!selected || !item) return;

    const isFile = item.type === "file";

    setLoading(true);

    // API call to move to folder
    await dispatch(
      moveToFolderThunk({
        isFile: isFile ? true : false,
        fileId: isFile ? (item as DataItemType).fileId : item.folderId,
        walletId: selected?.walletId,
        destinationFolderId: selected?.folderId,
      })
    );

    setLoading(false);
  };

  const Folder = ({
    title,
    onClick,
    onSubClick,
    active,
  }: {
    title: string;
    onClick: () => void;
    onSubClick: () => void;
    active: boolean;
  }) => (
    <FolderContainer
      active={active}
      container
      pr={2}
      justifyContent={"space-between"}
      alignItems={"center"}
      onClick={() => onClick()}
    >
      <Grid
        container
        justifyContent={"flex-start"}
        alignItems={"center"}
        md={10}
        xs={10}
      >
        <Grid item>
          <FolderIcon scale={"0.6"} />
        </Grid>
        <Grid item>
          <FolderTitle active={active}>{title}</FolderTitle>
        </Grid>
      </Grid>
      <Grid
        item
        onClick={(e) => {
          e.stopPropagation();
          onSubClick();
        }}
      >
        <IconContainer>
          <CaretRightIcon color={active ? COLORS.BLUE_80 : COLORS.GREY_50} />
        </IconContainer>
      </Grid>
    </FolderContainer>
  );

  const onPathClick = (path: string) => {
    if (path === "Home") {
      seeSubFolders(generateRootPlaceholder());
    }
  };

  return (
    <Wrapper>
      <Grid pt={3} pb={3} pr={3} pl={3} maxWidth={300} spacing={2}>
        <Grid item ml={1} mb={3}>
          <Grid
            container
            alignItems={"center"}
            pl={2}
            justifyContent={"flex-start"}
            spacing={2}
          >
            <Grid item>
              <Path
                links={links}
                icon
                onPathClick={(path: string) => onPathClick(path)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container>
            {listFiles.map((f: FileProps | FolderProps) => {
              if (f.type === "folder") {
                const folder = f as FolderProps;
                return (
                  <Folder
                    key={folder.folderId}
                    title={folder.file}
                    onClick={() => onFolderSelect(folder)}
                    onSubClick={() => seeSubFolders(folder)}
                    active={folder.folderId === selected?.folderId}
                  />
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </Grid>

        <Grid
          item
          md={12}
          p={2}
          xs={12}
          container
          justifyContent={"space-around"}
        >
          <CustomButton
            aria-checked={false}
            variant="text"
            onClick={onCancel}
            disabled={loading}
            sx={{
              color: COLORS.GREY_50,
              textTransform: "capitalize",
              textDecoration: "underline",
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            aria-checked={false}
            variant="contained"
            onClick={onSubmit}
            disabled={!selected || loading}
            sx={{ textTransform: "capitalize" }}
          >
            Move Here
          </CustomButton>
        </Grid>
      </Grid>
    </Wrapper>
  );
};
