import styled from "styled-components";

import { lght1, main } from "../../../resources/variables";

const StyledButton = styled.button`
  border-radius: 360px;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: ${main};
  color: ${lght1};
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.4);


  svg {
    width: 100%;
    height: 100%;  
    padding: 0.4rem;
    fill: ${lght1}
  }

  &:hover {
    opacity: 0.85;
  }
`;

const IconButton = (props: { icon: any; onClick: (e: any) => void }) => {
  return <StyledButton onClick={props.onClick}>{props.icon}</StyledButton>;
};

export default IconButton;
