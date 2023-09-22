import { v4 } from "uuid";
import { TFile, TFileSystem, TFolder } from "../constants/types";
import { isNodeFolder } from "./isNodeFolder";
import { generateFile } from "./generateFile";
import { generateFolder } from "./generateFolder";

export const addNode = (
  node: TFile | TFolder,
  newNodeName: string,
  newNodeType: "sequence" | "folder"
) => {
  if (isNodeFolder(node)) {
    (node as TFolder).children.push(
      newNodeType === "folder"
        ? generateFolder(newNodeName)
        : generateFile(newNodeName)
    );
  }
};

// export const addNode = (
//   fileSystem: TFileSystem,
//   parentFolderId: string,
//   newName: string,
//   isFolder?: boolean
// ) => {
//   const newNode: TFolder | TFile = isFolder
//     ? { folderId: v4(), folderName: newName, children: [] }
//     : { fileId: v4(), fileName: newName };

//   const dfs = (tree: TFolder | TFile) => {
//     console.log("dfs", (tree as TFolder).folderName, (tree as TFile).fileName);
//     if (!isNodeFolder(tree)) {
//       return;
//     }
//     if (parentFolderId === tree.folderId) {
//       console.log("found parent!", parentFolderId, tree);
//       tree.children.push(newNode);
//       return;
//     }
//     tree.children.forEach(dfs);
//   };

//   fileSystem.forEach(dfs);
//   return fileSystem;
// };
