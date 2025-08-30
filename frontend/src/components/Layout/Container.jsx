import styled from "styled-components";
import { theme, Grid } from "antd";

const { useToken } = theme;
const { useBreakpoint } = Grid;

const LayoutContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: ${({ $display }) => $display || "block"};
  flex-direction: ${({ $flexDirection }) => $flexDirection || "row"};
  justify-content: ${({ $justifyContent }) => $justifyContent || "flex-start"};
  align-items: ${({ $alignItems }) => $alignItems || "stretch"};
  gap: ${({ $gap }) => $gap || "0px"};
  height: ${({ $height }) => $height || "auto"};
  flex: ${({ $flex }) => $flex || "initial"};
  padding-top: ${({ $paddingTop }) => $paddingTop || "0px"};
  padding-bottom: ${({ $paddingBottom }) => $paddingBottom || "0px"};
  padding-left: ${({ $paddingLeft, $token }) =>
    $paddingLeft ? $paddingLeft : `${$token.padding}px`};
  padding-right: ${({ $paddingRight, $token }) =>
    $paddingRight ? $paddingRight : `${$token.padding}px`};

  @media (max-width: 768px) {
    padding-left: ${({ $paddingLeft, $token }) =>
      $paddingLeft ? $paddingLeft : `${$token.paddingLG}px`};

    padding-right: ${({ $paddingRight, $token }) =>
      $paddingRight ? $paddingRight : `${$token.paddingLG}px`};
  }
`;

const Container = ({ children, ...props }) => {
  const { token } = useToken();
  const screens = useBreakpoint();

  return (
    <LayoutContainer $token={token} $screens={screens} {...props}>
      {children}
    </LayoutContainer>
  );
};

export default Container;
