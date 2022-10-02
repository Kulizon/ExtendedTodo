import styled from "styled-components";

import { lght1, main } from "../../../resources/variables";

const StyledButton = styled.button`
  border-radius: 360px;
  width: 2rem;
  height: 2rem;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: ${main};
  color: ${lght1};
  box-shadow: 0px 1px 2px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    opacity: 0.85;
  }
`;

const IconButton = (props: { icon: any; onClick: (e: any) => void }) => {
  return <StyledButton onClick={props.onClick}>{props.icon}</StyledButton>;
};

export default IconButton;
