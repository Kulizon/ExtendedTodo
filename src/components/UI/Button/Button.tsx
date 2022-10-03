import styled from "styled-components";

import { fntWghtBld, lght1, main } from "../../../resources/variables";

const StyledButton = styled.button`
  border: none;
  background: ${main};
  font-size: 1rem;
  color: ${lght1};
  padding: 0.3rem 1rem;
  border-radius: 8px;
  font-weight: ${fntWghtBld};

  &:hover {
    opacity: 0.85;
  }
`;

const Button = (props: {
  onClick?: () => void;
  disabled?: boolean;
  children: any;
  className?: string;
  id?: string;
}) => {
  return (
    <StyledButton
      id={props.id}
      onClick={props.onClick}
      disabled={props.disabled}
      className={props.className}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
