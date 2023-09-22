import { v4 } from "uuid";
import { TFile } from "../constants/types";

export const generateFile = (fileName: string): TFile => {
  return { fileId: v4(), fileName };
};
