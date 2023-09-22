import { TFile, TFolder } from "../constants/types";

export const isNodeFolder = (node: TFolder | TFile): node is TFolder => {
  return (node as TFolder).folderId !== undefined;
};
