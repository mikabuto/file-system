import { TFile, TFolder } from "../constants/types";
import store from "../store/store";
import { isNodeFolder } from "./isNodeFolder";

const getNodeName = (node: TFile | TFolder) =>
  `/${(node as TFile).fileName || (node as TFolder).folderName}`;

export const showPath = (nodeId: string) => {
  let path = "";

  const dfs = (tree: TFile | TFolder, currentPath: string) => {
    if (isNodeFolder(tree)) {
      if (tree.folderId === nodeId) {
        path = currentPath;
        return;
      } else {
        tree.children.forEach((node) =>
          dfs(node, currentPath + getNodeName(node))
        );
      }
    } else {
      if (tree.fileId !== nodeId) {
        return;
      } else {
        path = currentPath;
        return;
      }
    }
  };

  store.fileSystem.forEach((node) => dfs(node, `Project${getNodeName(node)}`));
  console.log(path);
  return path;
};
