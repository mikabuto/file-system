import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

type TProps = {
  onNodeTypeClick: (nodeType: "sequence" | "folder") => void;
};

export const AddDropdown: React.FC<TProps> = ({ onNodeTypeClick }) => {
  return <Wrapper>AddDropdown</Wrapper>;
};
