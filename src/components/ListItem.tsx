import React from "react";
import styled from "styled-components";
import FolderIcon from "@mui/icons-material/Folder";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowDropDown } from "@mui/icons-material";
import store from "../store/store";

const Wrapper = styled.div<{ isFolder?: boolean }>`
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
    display: ${(props) => (props.isFolder ? "flex" : "none")};
  }

  .title {
    margin-left: 4px;
  }

  .clickable-icon:hover {
    fill: #858585;
  }
`;

export const ListItem: React.FC<{
  title: string;
  id: string;
  isFolder?: boolean;
  showChildren?: boolean;
  onArrowClick?: (show: boolean) => void;
}> = ({ isFolder, title, id, showChildren, onArrowClick }) => {
  return (
    <Wrapper isFolder={isFolder}>
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
      <div className="title">{title}</div>
      <div className="hover-icons">
        <AddBoxIcon
          className="clickable-icon"
          fontSize="small"
          onClick={() => store.addItem(id, "recuursiooon", false)}
        />
        <DeleteIcon
          className="clickable-icon"
          fontSize="small"
          onClick={() => console.log("delete")}
        />
      </div>
    </Wrapper>
  );
};
