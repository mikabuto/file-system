import { TFile, TFolder } from "../constants/types";
import { isNodeFolder } from "./isNodeFolder";
import { generateFile } from "./generateFile";
import { generateFolder } from "./generateFolder";
import { ENodeTypes } from "../constants/enums";
import store from "../store/store";

export const addNode = (
  node: TFile | TFolder | null,
  newNodeName: string,
  newNodeType: ENodeTypes
) => {
  const isFolder = newNodeType === ENodeTypes.Folder;
  const newInstance = isFolder
    ? generateFolder(newNodeName)
    : generateFile(newNodeName);

  if (!node) {
    store.fileSystem = [...store.fileSystem, newInstance];
  } else if (isNodeFolder(node)) {
    (node as TFolder).children.push(newInstance);
  }
};
