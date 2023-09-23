import { v4 as uuidv4 } from "uuid";
import { TFile, TFileSystem, TFolder } from "../constants/types";
import { makeAutoObservable, set } from "mobx";
import { isNodeFolder } from "../utils/isNodeFolder";
import { generateFolder } from "../utils/generateFolder";
import { generateFile } from "../utils/generateFile";

class Store {
  testString: string = "test string";
  fileSystem: TFileSystem = [
    generateFolder(
      "ASSETS",
      generateFolder(
        "LNDG",
        generateFile("LNDG_0120"),
        generateFile("LNDG_0140"),
        generateFile("LNDG_0160"),
        generateFile("LNDG_0180"),
        generateFile("LNDG_0200"),
        generateFile("LNDG_0220")
      )
    ),
    generateFolder(
      "BARR",
      generateFolder(
        "BNGL",
        generateFile("BNGL_0320"),
        generateFile("BNGL_0340"),
        generateFile("BNGL_0360"),
        generateFile("BNGL_0380"),
        generateFolder(
          "BNRK",
          generateFile("BNRK_0650"),
          generateFile("BNRK_0670"),
          generateFile("BNRK_0690")
        )
      ),
      generateFile("BARR_0100")
    ),
    generateFolder(
      "BTTL",
      generateFolder(
        "ENGN",
        generateFile("ENGN_1020"),
        generateFile("ENGN_1040"),
        generateFile("ENGN_1060"),
        generateFile("ENGN_1080")
      ),
      generateFolder("BNRK"),
      generateFolder(
        "INTR",
        generateFile("INTR_0000"),
        generateFile("INTR_0020"),
        generateFile("INTR_0040")
      )
    ),
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addItem(parentFolderId: string, newName: string, isFolder?: boolean) {
    const newNode: TFolder | TFile = isFolder
      ? { folderId: uuidv4(), folderName: newName, children: [] }
      : { fileId: uuidv4(), fileName: newName };

    const dfs = (tree: TFolder | TFile) => {
      if (!isNodeFolder(tree)) {
        return;
      }
      if (parentFolderId === tree.folderId) {
        tree.children.push(newNode);
        return;
      }
      tree.children.forEach(dfs);
    };

    this.fileSystem.forEach(dfs);
  }

  updateTree(newTree: TFileSystem) {
    set(this.fileSystem, newTree);
  }

  removeItem(removeItemId: string) {}
}

const store = new Store();
export default store;
