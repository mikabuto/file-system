import { TFile, TFileSystem, TFolder } from "../constants/types";
import { isNodeFolder } from "./isNodeFolder";

const checkId = (node: TFile | TFolder, removeNodeId: string) =>
  (isNodeFolder(node) ? node.folderId : node.fileId) === removeNodeId;

export const removeNode = (fileSystem: TFileSystem, removeNodeId: string) => {
  const dfs = (tree: TFolder | TFile) => {
    console.log("dfs", (tree as TFolder).folderName, (tree as TFile).fileName);
    const foundIndex = isNodeFolder(tree)
      ? tree.children.findIndex((node) => checkId(node, removeNodeId))
      : -2;

    if (foundIndex === -1 && isNodeFolder(tree)) {
      tree.children.forEach(dfs);
    } else if (foundIndex === -2) {
      return;
    } else if (isNodeFolder(tree)) {
      console.log(
        "found parent! deleting from folder ",
        tree.folderName,
        " file/folder",
        (tree.children[foundIndex] as TFile).fileName ||
          (tree.children[foundIndex] as TFolder).folderName
      );
      tree.children.splice(foundIndex, 1);
    }
  };

  const foundIndex = fileSystem.findIndex((node) =>
    checkId(node, removeNodeId)
  );

  if (foundIndex === -1) {
    fileSystem.forEach(dfs);
  }
};
