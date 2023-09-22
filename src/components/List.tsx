import React, { useState } from "react";
import { TFileSystem } from "../constants/types";
import { isNodeFolder } from "../utils/isNodeFolder";
import styled from "styled-components";
import { ListItem } from "./ListItem";
import { FolderNode } from "./FolderNode";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const List: React.FC<{ folderTree: TFileSystem; tab: number }> = ({
  folderTree,
  tab,
}) => {
  return (
    <Wrapper>
      {folderTree.map((node) => {
        return isNodeFolder(node) ? (
          <FolderNode node={node} tab={tab} />
        ) : (
          <div key={node.fileId} style={{ paddingLeft: `${tab}px` }}>
            <ListItem id={node.fileId} title={node.fileName} />
          </div>
        );
      })}
    </Wrapper>
  );
};
