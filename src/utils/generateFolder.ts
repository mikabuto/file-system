import { v4 } from "uuid";
import { TFile, TFolder } from "../constants/types";

export const generateFolder = (
  folderName: string,
  ...children: Array<TFolder | TFile>
): TFolder => {
  return { folderId: v4(), folderName, children };
};
