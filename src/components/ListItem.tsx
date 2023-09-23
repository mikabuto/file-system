import React, { useRef, useState } from "react";
import styled from "styled-components";
import FolderIcon from "@mui/icons-material/Folder";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowDropDown } from "@mui/icons-material";
import store from "../store/store";
import { TFile, TFolder } from "../constants/types";
import { observer } from "mobx-react-lite";
import { removeNode } from "../utils/removeNode";
import { RemoveNodeModal } from "../modals/RemoveNodeModal";
import { Modal } from "@mui/material";
import { isNodeFolder } from "../utils/isNodeFolder";
import { AddButton } from "./AddButton";

interface IWrapperProps {
  isFolder?: boolean;
  showAddDropdown: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  padding: 8px 4px;
  border-radius: 3px;
  cursor: pointer;

  .clickable-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &:hover {
    background-color: #343434;
  }

  .hover-icons {
    display: ${(props) => (props.showAddDropdown ? "flex" : "none")};
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
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .clickable-icon:hover {
    fill: #858585;
  }
`;

export const ListItem: React.FC<{
  node: TFolder | TFile;
  isFolder?: boolean;
  showChildren?: boolean;
  onArrowClick?: (show: boolean) => void;
}> = observer(({ isFolder, node, showChildren, onArrowClick }) => {
  const nodeId = isFolder ? (node as TFolder).folderId : (node as TFile).fileId;
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const addDropdownRef = useRef(null);

  return (
    <Wrapper isFolder={isFolder} showAddDropdown={showAddDropdown}>
      <div
        className="clickable-wrapper"
        onClick={() => {
          if (isFolder && onArrowClick) {
            onArrowClick(!showChildren);
          }
        }}
      >
        {isFolder ? (
          <>
            {showChildren ? (
              <ArrowDropDown className="clickable-icon" fontSize="small" />
            ) : (
              <ArrowRightIcon className="clickable-icon" fontSize="small" />
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
          <AddButton
            node={isNodeFolder(node) ? node : undefined}
            onArrowClick={onArrowClick}
          />
          <DeleteIcon
            className="clickable-icon"
            fontSize="small"
            onClick={(e) => {
              e.stopPropagation();
              setShowRemoveModal(true);
            }}
          />
        </div>
      </div>
      {showRemoveModal && (
        <Modal
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={showRemoveModal}
          onClose={(e) => {
            setShowRemoveModal(false);
          }}
        >
          <RemoveNodeModal
            nodeId={nodeId}
            isFolder={isFolder}
            onCancel={() => setShowRemoveModal(false)}
            onRemove={() => {
              removeNode(store.fileSystem, nodeId);
              setShowRemoveModal(false);
            }}
          />
        </Modal>
      )}
    </Wrapper>
  );
});
