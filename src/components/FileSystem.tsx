import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TFile, TFileSystem, TFolder } from "../constants/types";
import { v4 as uuidv4 } from "uuid";
import { isNodeFolder } from "../utils/isNodeFolder";
import { List } from "./List";
import store from "../store/store";
import { observer } from "mobx-react-lite";

const Wrapper = styled.div`
  padding: 12px;
  width: 380px;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #232323;
`;

export const FileSystem = observer(() => {
  const folderTree = store.fileSystem;
  // const defaultFolderTree: TFileSystem = [
  //   {
  //     folderId: uuidv4(),
  //     folderName: "folder1",
  //     children: [{ fileId: uuidv4(), fileName: "file1" }],
  //   },
  //   {
  //     folderId: uuidv4(),
  //     folderName: "folder2",
  //     children: [{ folderId: uuidv4(), folderName: "folder2_1", children: [] }],
  //   },
  //   {
  //     fileId: uuidv4(),
  //     fileName: "file2",
  //   },
  // ];
  // const [folderTree, setFolderTree] = useState<Array<TFolder | TFile> | null>(
  //   defaultFolderTree
  // );

  return (
    <Wrapper>{folderTree && <List folderTree={folderTree} tab={0} />}</Wrapper>
  );
});
