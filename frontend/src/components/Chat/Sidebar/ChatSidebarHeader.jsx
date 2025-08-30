import { theme, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { useToken } = theme;
const { Text } = Typography;

const Header = styled.div`
  padding: ${({ $token }) => $token.padding}px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ $token }) => $token.size / 2}px;
  border-bottom: ${({ $token }) =>
    `${$token.lineWidth}px ${$token.lineType} ${$token.colorBorder}`};
  min-height: 64px;
`;

const ChatSidebarHeader = ({}) => {
  const { token } = useToken();

  return (
    <Header $token={token}>
      <TeamOutlined />
      <Text>Contacts</Text>
    </Header>
  );
};

export default ChatSidebarHeader;
