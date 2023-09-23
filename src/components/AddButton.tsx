import React, { useEffect, useRef, useState } from "react";
import { ENodeTypes } from "../constants/enums";
import { useClickOutside } from "../hooks/useClickOutside";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { isNodeFolder } from "../utils/isNodeFolder";
import { AddDropdown } from "./AddDropdown";
import { TFolder } from "../constants/types";
import styled from "styled-components";
import { Modal } from "@mui/material";
import { AddNodeModal } from "../modals/AddNodeModal";
import { addNode } from "../utils/addNode";

const Wrapper = styled.div`
  .dropdown {
    position: relative;
    display: inline-block;

    .add-icon {
      cursor: pointer;
    }
    .add-icon:hover {
      fill: #858585;
    }
  }
`;

type TProps = {
  node?: TFolder;
  onArrowClick?: (show: boolean) => void;
};

export const AddButton: React.FC<TProps> = ({ node, onArrowClick }) => {
  const addDropdownRef = useRef(null);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState<ENodeTypes | null>(null);

  const onAdd = (newNodeName: string) => {
    if (showAddModal) {
      addNode(node || null, newNodeName, showAddModal);
      if (onArrowClick) {
        onArrowClick(true);
      }
    }
    setShowAddModal(null);
  };

  useClickOutside(addDropdownRef, (e: Event) => {
    e.stopPropagation();
    setShowAddDropdown(false);
  });

  return (
    <Wrapper>
      <div className="dropdown" ref={addDropdownRef}>
        <AddBoxIcon
          onClick={(e) => {
            e.stopPropagation();
            setShowAddDropdown((prev) => !prev);
          }}
          className="add-icon"
          fontSize="small"
        />
        {showAddDropdown && (
          <AddDropdown
            onNodeTypeClick={(nodeType: ENodeTypes) => {
              setShowAddModal(nodeType);
              setShowAddDropdown(false);
            }}
          />
        )}
      </div>
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={!!showAddModal}
        onClose={() => setShowAddModal(null)}
        onClick={(e) => e.stopPropagation()}
      >
        <AddNodeModal
          parentFolderName={node?.folderName || ""}
          isFolder={showAddModal === ENodeTypes.Folder}
          onCancel={() => setShowAddModal(null)}
          onAdd={onAdd}
        />
      </Modal>
    </Wrapper>
  );
};
