import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { Button } from "@mui/material";
import { showPath } from "../utils/showPath";

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

  .text-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  .buttons {
    /* width: 100%; */
    display: flex;
    gap: 12px;
  }
`;

type TProps = {
  nodeId: string;
  isFolder?: boolean;
  onCancel: () => void;
  onRemove: () => void;
};

export const RemoveNodeModal: React.FC<TProps> = ({
  nodeId,
  isFolder,
  onCancel,
  onRemove,
}) => {
  useEffect(() => {
    function handleEnterKey(event: KeyboardEvent) {
      if (event.code === "Enter") {
        onRemove();
      }
    }

    document.addEventListener("keydown", handleEnterKey);
    return () => document.removeEventListener("keydown", handleEnterKey);
  }, [onRemove]);

  return (
    <Wrapper>
      <DeleteIcon sx={{ fontSize: 80, color: "#DB5C5C" }} />
      <div className="text-wrapper">
        <div style={{ fontWeight: 800 }}>{showPath(nodeId)}</div>
        <div>
          Are you sure you want to delete this{" "}
          {isFolder ? "Folder" : "Sequence"}?
        </div>
      </div>
      <div className="buttons">
        <Button
          onClick={onCancel}
          sx={{
            width: 246,
            bgcolor: "#393939",
            color: "inherit",
            ":hover": { bgcolor: "#303030" },
          }}
        >
          No, cancel
        </Button>
        <Button
          onClick={onRemove}
          sx={{
            width: 246,
            bgcolor: "#5E3838",
            color: "#DB5C5C",
            ":hover": { bgcolor: "#4f2f2f" },
          }}
        >
          Yes, delete
        </Button>
      </div>
    </Wrapper>
  );
};
