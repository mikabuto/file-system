import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { Button } from "@mui/material";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Wrapper = styled.div`
  width: 524px;
  height: 224px;
  padding: 44px 14px 12px;
  background-color: #232323;
  border-color: #333333;
  border-radius: 10px;
  border-width: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

type TProps = {
  parentFolderName: string;
  isFolder?: boolean;
  onCancel: () => void;
  onAdd: (newNodeName: string) => void;
};

export const AddNodeModal: React.FC<TProps> = ({
  parentFolderName,
  isFolder,
  onCancel,
  onAdd,
}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Wrapper>
      <Button
        onClick={() => onAdd(inputValue)}
        startIcon={<AddBoxIcon />}
        sx={{
          width: 164,
          bgcolor: "#5E3838",
          color: "#DB5C5C",
          ":hover": { bgcolor: "#4f2f2f" },
        }}
      >
        Add {isFolder ? "Folder" : "Sequence"}
      </Button>
    </Wrapper>
  );
};
