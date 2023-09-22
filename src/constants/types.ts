export type TFileSystem = Array<TFolder | TFile>;

export type TFile = {
  fileId: string;
  fileName: string;
};

export type TFolder = {
  folderId: string;
  folderName: string;
  children: TFileSystem;
};
