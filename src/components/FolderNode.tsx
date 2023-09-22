import React, { useState } from "react";
import { TFolder } from "../constants/types";
import { ListItem } from "./ListItem";
import { List } from "./List";

export const FolderNode: React.FC<{ tab: number; node: TFolder }> = ({
  tab,
  node,
}) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <>
      <div key={node.folderId} style={{ paddingLeft: `${tab}px` }}>
        <ListItem
          id={node.folderId}
          showChildren={showChildren}
          onArrowClick={(show: boolean) => setShowChildren(show)}
          isFolder
          title={node.folderName}
        />
      </div>
      {showChildren && <List folderTree={node.children} tab={tab + 28} />}
    </>
  );
};
