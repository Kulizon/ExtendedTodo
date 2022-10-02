import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 360px;
  width: 2rem;
  height: 2rem;
  font-size: 1.25rem;
`;

const IconButton = (props: { icon: any; onClick: (e: any) => void }) => {
  return <StyledButton onClick={props.onClick}>{props.icon}</StyledButton>;
};

export default IconButton;
