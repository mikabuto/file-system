import React, { useState } from "react";
import { TFolder } from "../constants/types";
import { ListItem } from "./ListItem";
import { List } from "./List";
import { observer } from "mobx-react-lite";

export const FolderNode: React.FC<{ tab: number; node: TFolder }> = observer(
  ({ tab, node }) => {
    const [showChildren, setShowChildren] = useState(false);

    return (
      <>
        <div key={node.folderId} style={{ paddingLeft: `${tab}px` }}>
          <ListItem
            node={node}
            showChildren={showChildren}
            onArrowClick={(show: boolean) => {
              setShowChildren(show);
            }}
            isFolder
          />
        </div>
        {showChildren && <List folderTree={node.children} tab={tab + 28} />}
      </>
    );
  }
);
