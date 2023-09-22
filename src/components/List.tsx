import React, { useState } from "react";
import { TFileSystem } from "../constants/types";
import { isNodeFolder } from "../utils/isNodeFolder";
import styled from "styled-components";
import { ListItem } from "./ListItem";
import { FolderNode } from "./FolderNode";
import { observer } from "mobx-react-lite";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const List: React.FC<{ folderTree: TFileSystem; tab: number }> =
  observer(({ folderTree, tab }) => {
    return (
      <Wrapper>
        {folderTree.map((node) => {
          return isNodeFolder(node) ? (
            <FolderNode node={node} tab={tab} />
          ) : (
            <div key={node.fileId} style={{ paddingLeft: `${tab}px` }}>
              <ListItem node={node} />
            </div>
          );
        })}
      </Wrapper>
    );
  });
