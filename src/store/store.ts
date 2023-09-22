import { v4 as uuidv4 } from "uuid";
import { TFile, TFileSystem, TFolder } from "../constants/types";
import { makeAutoObservable } from "mobx";
import { isNodeFolder } from "../utils/isNodeFolder";

class Store {
  fileSystem: TFileSystem = [
    {
      folderId: uuidv4(),
      folderName: "folder1",
      children: [{ fileId: uuidv4(), fileName: "file1" }],
    },
    {
      folderId: uuidv4(),
      folderName: "folder2",
      children: [{ folderId: uuidv4(), folderName: "folder2_1", children: [] }],
    },
    {
      fileId: uuidv4(),
      fileName: "file2",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addItem(parentFolderId: string, newName: string, isFolder?: boolean) {
    const newNode: TFolder | TFile = isFolder
      ? { folderId: uuidv4(), folderName: newName, children: [] }
      : { fileId: uuidv4(), fileName: newName };

    const dfs = (tree: TFolder | TFile) => {
      console.log(
        "dfs",
        (tree as TFolder).folderName,
        (tree as TFile).fileName
      );
      if (!isNodeFolder(tree)) {
        return;
      }
      if (parentFolderId === tree.folderId) {
        console.log("found parent!", parentFolderId, tree);
        tree.children.push(newNode);
        return;
      }
      tree.children.forEach(dfs);
    };

    this.fileSystem.forEach(dfs);
  }

  removeItem(removeItemId: string) {}
}

const store = new Store();
export default store;
