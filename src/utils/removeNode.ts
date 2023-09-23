import { TFile, TFileSystem, TFolder } from "../constants/types";
import { isNodeFolder } from "./isNodeFolder";

const checkId = (node: TFile | TFolder, removeNodeId: string) =>
  (isNodeFolder(node) ? node.folderId : node.fileId) === removeNodeId;

export const removeNode = (fileSystem: TFileSystem, removeNodeId: string) => {
  const dfs = (tree: TFolder | TFile) => {
    const foundIndex = isNodeFolder(tree)
      ? tree.children.findIndex((node) => checkId(node, removeNodeId))
      : -2;

    if (foundIndex === -1 && isNodeFolder(tree)) {
      tree.children.forEach(dfs);
    } else if (foundIndex === -2) {
      return;
    } else if (isNodeFolder(tree)) {
      tree.children.splice(foundIndex, 1);
    }
  };

  const foundIndex = fileSystem.findIndex((node) =>
    checkId(node, removeNodeId)
  );

  if (foundIndex === -1) {
    fileSystem.forEach(dfs);
  } else {
    fileSystem.splice(foundIndex, 1);
  }
};
