import { theme, Grid, Avatar } from "antd";
import Container from "../components/Layout/Container";
import styled from "styled-components";
import ChatSidebar from "../components/Chat/Sidebar/ChatSidebar";
import MainChat from "../components/Chat/Main/MainChat";

const { useToken } = theme;

const ChatContainer = styled.div`
  box-shadow: ${({ $token }) => $token.boxShadowTertiary};
  background-color: ${({ $token }) => $token.colorBgContainer};
  border-radius: ${({ $token }) => $token.borderRadiusLG}px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: relative;
`;

const HomePage = () => {
  const { token } = useToken();

  return (
    <Container
      $height="calc(100% - 64px)"
      $paddingTop={`${token.padding}px`}
      $paddingBottom={`${token.padding}px`}
    >
      <ChatContainer $token={token}>
        <ChatSidebar />
        <MainChat />
      </ChatContainer>
    </Container>
  );
};

export default HomePage;
