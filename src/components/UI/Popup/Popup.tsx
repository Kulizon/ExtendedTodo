import styled from "styled-components";
import { createPortal } from "react-dom";

import { lght2 } from "../../../resources/variables";

const StyledPopup = styled.div`
  position: fixed;
  z-index: 100;
  transform: translateY(-50%) translateX(50%);
  top: 50%;
  right: 50%;
  width: 100%;
  max-width: 1200px;
  display: flex;
  padding: 1rem;

`;

const StyledBackdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 50;
  background: #000;
  opacity: 0.5;

  &.username-backdrop {
    background: ${lght2};
    opacity: 1;
  }
`;

const Popup = (props: {
  children: any;
  onBackdropClick?: () => void;
  isUsernameBackdrop?: boolean;
}) => {
  return createPortal(
    <>
      <StyledBackdrop
        onClick={props.onBackdropClick}
        className={props.isUsernameBackdrop ? "username-backdrop" : ""}
      ></StyledBackdrop>
      <StyledPopup>{props.children}</StyledPopup>
    </>,
    document.getElementById("root")!
  );
};

export default Popup;
