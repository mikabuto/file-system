import React, { useRef } from "react";
import styled from "styled-components";
import { ENodeTypes } from "../constants/enums";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import { useClickOutside } from "../hooks/useClickOutside";

const Wrapper = styled.div`
  position: absolute;
  top: 24px;
  background-color: #2c2c2c;
  width: 164px;
  border-radius: 4px;
  z-index: 2;

  .dropdown-item {
    border-radius: 4px;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 12px;

    &:hover {
      background-color: #343434;
    }
  }
`;

type TProps = {
  onNodeTypeClick: (nodeType: ENodeTypes) => void;
};

export const AddDropdown: React.FC<TProps> = ({ onNodeTypeClick }) => {
  return (
    <Wrapper>
      <div
        key={ENodeTypes.Folder}
        className="dropdown-item"
        onClick={(e) => {
          e.stopPropagation();
          onNodeTypeClick(ENodeTypes.Folder);
        }}
      >
        <FolderIcon sx={{ fontSize: 20 }} />
        {ENodeTypes.Folder}
      </div>
      <div
        key={ENodeTypes.Sequence}
        className="dropdown-item"
        onClick={() => onNodeTypeClick(ENodeTypes.Sequence)}
      >
        <MovieCreationOutlinedIcon sx={{ fontSize: 20 }} />
        {ENodeTypes.Sequence}
      </div>
    </Wrapper>
  );
};
