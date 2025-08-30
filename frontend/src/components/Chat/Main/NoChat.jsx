import styled from "styled-components";
import { theme, Typography } from "antd";

const { Text } = Typography;

const { useToken } = theme;

const NoChatConainer = styled.div`
  height: 100%;
  padding: ${({ $token }) => $token.padding}px;
  flex: 1;
`;

const NoChat = () => {
  const { token } = useToken();

  return (
    <NoChatConainer $token={token}>
      <Text>Select a conversation to start chatting</Text>
    </NoChatConainer>
  );
};

export default NoChat;
