import React, { useState } from "react";
import styled from "styled-components";
import FolderIcon from "@mui/icons-material/Folder";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowDropDown } from "@mui/icons-material";
import store from "../store/store";
import { TFile, TFolder } from "../constants/types";
import { generateFile } from "../utils/generateFile";
import { observer } from "mobx-react-lite";
import { removeNode } from "../utils/removeNode";
import { RemoveNodeModal } from "../modals/RemoveNodeModal";
import { Box, Modal } from "@mui/material";
import { showPath } from "../utils/showPath";
import { AddNodeModal } from "../modals/AddNodeModal";
import { AddDropdown } from "./AddDropdown";

interface IWrapperProps {
  isFolder?: boolean;
  showAddDropdown: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  padding: 8px 4px;
  border-radius: 3px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background-color: #343434;
  }

  .hover-icons {
    display: none;
    /* display: flex; */
    margin-left: auto;
    margin-right: 10px;
    gap: 12px;
  }

  &:hover .hover-icons {
    display: flex;
  }

  .add-icon {
    display: ${(props) =>
      props.isFolder || props.showAddDropdown ? "flex" : "none"};
  }

  &:hover .add-icon {
    display: ${(props) =>
      props.isFolder || props.showAddDropdown ? "flex" : "none"};
  }

  .title {
    margin-left: 4px;
  }

  .clickable-icon:hover {
    fill: #858585;
  }
`;

enum EShowAddModal {
  "notShown",
  "Sequence",
  "Folder",
}

export const ListItem: React.FC<{
  node: TFolder | TFile;
  isFolder?: boolean;
  showChildren?: boolean;
  onArrowClick?: (show: boolean) => void;
}> = observer(({ isFolder, node, showChildren, onArrowClick }) => {
  const nodeId = isFolder ? (node as TFolder).folderId : (node as TFile).fileId;
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(EShowAddModal.notShown);

  return (
    <Wrapper isFolder={isFolder} showAddDropdown={showAddDropdown}>
      {isFolder ? (
        <>
          {showChildren ? (
            <ArrowDropDown
              className="clickable-icon"
              fontSize="small"
              onClick={() => onArrowClick && onArrowClick(false)}
            />
          ) : (
            <ArrowRightIcon
              className="clickable-icon"
              fontSize="small"
              onClick={() => onArrowClick && onArrowClick(true)}
            />
          )}
          <FolderIcon fontSize="small" />
        </>
      ) : (
        <MovieCreationOutlinedIcon fontSize="small" />
      )}
      <div className="title">
        {isFolder ? (node as TFolder).folderName : (node as TFile).fileName}
      </div>
      <div className="hover-icons">
        <AddBoxIcon
          className="clickable-icon add-icon"
          fontSize="small"
          onClick={() => {
            setShowAddDropdown(true);
          }}
        />
        {showAddDropdown && (
          <AddDropdown
            onNodeTypeClick={(nodeType: "sequence" | "folder") =>
              setShowAddModal(
                nodeType === "sequence"
                  ? EShowAddModal.Sequence
                  : EShowAddModal.Folder
              )
            }
          />
        )}
        <DeleteIcon
          className="clickable-icon"
          fontSize="small"
          onClick={() => setShowRemoveModal(true)}
        />
      </div>
      {/* {showDeleteModal && <RemoveNodeModal />} */}
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
      >
        <RemoveNodeModal
          path={showPath(nodeId)}
          isFolder={isFolder}
          onCancel={() => setShowRemoveModal(false)}
          onRemove={() => {
            removeNode(store.fileSystem, nodeId);
            setShowRemoveModal(false);
          }}
        />
      </Modal>
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={!!showAddModal}
        onClose={() => setShowAddModal(EShowAddModal.notShown)}
      >
        <AddNodeModal
          parentFolderName="name"
          isFolder={isFolder}
          onCancel={() => setShowAddModal(EShowAddModal.notShown)}
          onAdd={(newNodeName) => {
            setShowAddModal(EShowAddModal.notShown);
          }}
        />
      </Modal>
    </Wrapper>
  );
});
