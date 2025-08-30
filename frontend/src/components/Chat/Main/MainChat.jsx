import styled from "styled-components";
import { useSelector } from "react-redux";
import MainChatHeader from "./MainChatHeader";
import MainChatBody from "./MainChatBody";
import MainChatFooter from "./MainChatFooter";
import NoChat from "./NoChat";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 240px;
  height: 100%;
  width: calc(100% - 240px);
  transition: 0.5s;

  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
    transform: ${({ $selectedUser }) =>
      $selectedUser ? "translateX(0)" : "translateX(100%)"};
  }
`;

const MainChat = () => {
  const { selectedUser } = useSelector((state) => state.chat);

  if (!selectedUser) {
    return (
      <Main $selectedUser={selectedUser}>
        <MainChatHeader />
        <NoChat />
      </Main>
    );
  }

  return (
    <Main $selectedUser={selectedUser}>
      <MainChatHeader />
      <MainChatBody></MainChatBody>
      <MainChatFooter></MainChatFooter>
    </Main>
  );
};

export default MainChat;
