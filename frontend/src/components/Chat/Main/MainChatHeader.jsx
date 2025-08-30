import styled from "styled-components";
import { Button, theme } from "antd";
import ChatUser from "../User/ChatUser";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { setSelectedUser } from "../../../slices/chatSlice";

const { useToken } = theme;

const Header = styled.div`
  padding: ${({ $token }) => `${$token.padding / 2}px ${$token.padding}px`};
  border-bottom: ${({ $token }) =>
    `${$token.lineWidth}px ${$token.lineType} ${$token.colorBorder}`};
  display: flex;
  align-items: center;
  height: 64px;
  gap: ${({ $token }) => $token.size / 2}px;

  @media (max-width: 768px) {
    padding: ${({ $token }) =>
      `${$token.padding / 2}px ${$token.padding / 2}px`};
  }
`;

const BackButtonContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MainChatHeader = () => {
  const { token } = useToken();
  const { selectedUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handleUnselectUser = () => {
    dispatch(setSelectedUser(null));
  };

  return (
    <Header $token={token}>
      <BackButtonContainer>
        <Button type="text" onClick={() => handleUnselectUser()}>
          <ArrowLeftOutlined />
        </Button>
      </BackButtonContainer>

      {selectedUser ? <ChatUser user={selectedUser} /> : <></>}
    </Header>
  );
};

export default MainChatHeader;
