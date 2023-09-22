import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TFile, TFileSystem, TFolder } from "../constants/types";
import { v4 as uuidv4 } from "uuid";
import { isNodeFolder } from "../utils/isNodeFolder";
import { List } from "./List";
import store from "../store/store";
import { observer } from "mobx-react-lite";

const Wrapper = styled.div`
  padding: 12px;
  width: 380px;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #232323;
`;

export const FileSystem = observer(() => {
  return (
    <Wrapper>
      {store.fileSystem && <List folderTree={store.fileSystem} tab={0} />}
    </Wrapper>
  );
});
