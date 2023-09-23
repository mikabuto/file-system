import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";
import { Close } from "@mui/icons-material";

const Wrapper = styled.div`
  width: 524px;
  height: 172px;
  padding: 12px;
  background-color: #232323;
  border: #333333 1px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .header {
    display: flex;
    width: 100%;

    .parent-folder {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .new-node-type {
      display: flex;
      align-items: center;
    }

    .close-icon {
      margin-left: auto;
      display: flex;
      justify-content: center;
      cursor: pointer;

      svg:hover {
        fill: #858585;
      }
    }
  }

  .input-wrapper {
    width: 100%;
    display: flex;
    align-items: flex-start;
    border-bottom: 1px #333333 solid;
    margin: 0 -12px;
    padding: 12px;
    padding-bottom: 20px;
    min-height: 64px;

    svg {
      margin-top: 8px;
    }

    .input {
      flex: 1;
    }
    .MuiInputBase-root {
      color: #fff;
    }
    .MuiOutlinedInput-notchedOutline {
      border: none !important;
    }
  }

  .button {
    align-self: flex-end;
    height: 32px;
  }
`;

type TProps = {
  parentFolderName: string;
  isFolder?: boolean;
  onCancel: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onAdd: (newNodeName: string) => void;
};

export const AddNodeModal: React.FC<TProps> = ({
  parentFolderName,
  isFolder,
  onCancel,
  onAdd,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const confirm = useCallback(() => {
    if (inputValue) {
      onAdd(inputValue);
      setInputError("");
    } else {
      setInputError(`Enter name of the ${isFolder ? "folder" : "sequence"}`);
    }
  }, [inputValue]);

  useEffect(() => {
    function handleEnterKey(event: KeyboardEvent) {
      if (event.code === "Enter") {
        confirm();
      }
    }

    document.addEventListener("keydown", handleEnterKey);
    return () => document.removeEventListener("keydown", handleEnterKey);
  }, [confirm]);

  return (
    <Wrapper>
      <div className="header">
        <div className="parent-folder">
          <FolderIcon sx={{ fontSize: 16 }} />
          {parentFolderName}
        </div>
        <div className="new-node-type">
          <ArrowRightIcon sx={{ fontSize: 20 }} />
          {isFolder ? "Folder" : "Sequence"}
        </div>
        <div className="close-icon" onClick={onCancel}>
          <Close />
        </div>
      </div>
      <div className="input-wrapper">
        {isFolder ? <FolderIcon /> : <MovieCreationOutlinedIcon />}
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          id="outlined-basic"
          variant="outlined"
          placeholder={`Enter ${isFolder ? "folder" : "sequence"} name`}
          size="small"
          className="input"
          error={!!inputError}
          helperText={inputError}
        />
      </div>
      <Button
        onClick={confirm}
        startIcon={<AddBoxIcon />}
        sx={{
          width: 164,
          bgcolor: "#E08855",
          color: "#333333",
          ":hover": { bgcolor: "#bd7349" },
        }}
        className="button"
      >
        Add {isFolder ? "Folder" : "Sequence"}
      </Button>
    </Wrapper>
  );
};
