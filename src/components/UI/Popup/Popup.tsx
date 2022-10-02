import styled from "styled-components";
import { createPortal } from "react-dom";

const StyledPopup = styled.div`
  position: fixed;
  z-index: 100;
  transform: translateY(-50%) translateX(50%);
  top: 50%;
  right: 50%;
`;

const StyledBackdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 50;
  background: #000;
  opacity: 0.4;
`;

const Popup = (props: { children: any; onBackdropClick?: () => void }) => {
  return createPortal(
    <>
      <StyledBackdrop onClick={props.onBackdropClick}></StyledBackdrop>
      <StyledPopup>{props.children}</StyledPopup>
    </>,
    document.getElementById("root")!
  );
};

export default Popup;
