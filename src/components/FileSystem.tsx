import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TFile, TFileSystem, TFolder } from "../constants/types";
import { v4 as uuidv4 } from "uuid";
import { isNodeFolder } from "../utils/isNodeFolder";
import { List } from "./List";
import store from "../store/store";
import { observer } from "mobx-react-lite";
import { AddDropdown } from "./AddDropdown";
import { addNode } from "../utils/addNode";
import { ENodeTypes } from "../constants/enums";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button, TextField } from "@mui/material";
import { AddButton } from "./AddButton";

const Wrapper = styled.div`
  padding: 12px;
  width: 380px;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #232323;

  .list {
    > div:first-child {
      display: flex;
      justify-content: flex-end;
      padding-bottom: 12px;
    }
  }

  .create-wrapper {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .MuiInputBase-root {
      color: #fff;
    }
    .MuiOutlinedInput-notchedOutline {
      border: 1px #414141 solid !important;
    }

    .buttons-wrapper {
      display: flex;
      width: 100%;
      gap: 8px;
      button {
        flex: 1;
      }
    }
  }
`;

export const FileSystem = observer(() => {
  const [showAddModal, setshowAddModal] = useState<ENodeTypes | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  return (
    <Wrapper>
      {store.fileSystem.length ? (
        <div className="list">
          <AddButton />
          <List folderTree={store.fileSystem} tab={0} />
        </div>
      ) : (
        <div className="create-wrapper">
          <div>
            There are no folders or sequences, so you have to create new one
          </div>
          <TextField
            placeholder="Enter folder/sequence name"
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            className="input"
            error={!!inputError}
            helperText={inputError}
          />
          <div className="buttons-wrapper">
            {Object.keys(ENodeTypes).map((nodeType) => (
              <Button
                startIcon={<AddBoxIcon />}
                sx={{
                  width: 164,
                  bgcolor: "#E08855",
                  color: "#333333",
                  ":hover": { bgcolor: "#bd7349" },
                }}
                className="button"
                onClick={() => {
                  if (inputValue) {
                    addNode(null, inputValue, nodeType as ENodeTypes);
                    setInputValue("");
                    setInputError("");
                  } else {
                    setInputError("Enter name of the folder/sequence");
                  }
                }}
              >
                Add {nodeType}
              </Button>
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
});
