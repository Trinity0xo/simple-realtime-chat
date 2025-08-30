import styled from "styled-components";
import { Avatar, theme, Typography } from "antd";
import { formatMessageDate } from "../../../lib/utils";
import { Image } from "antd";
import { useSelector } from "react-redux";
import { API_URL } from "../../../lib/axios";

const { useToken } = theme;
const { Text } = Typography;

const Message = styled.div`
  flex-shrink: 0;
  max-width: 80%;
  display: flex;
  gap: ${({ $token }) => $token.size / 2}px;
`;

const Bubble = styled.div`
  background-color: ${({ $isOwnMessage, $token }) =>
    $isOwnMessage ? $token.colorPrimaryBg : $token.colorFillQuaternary};
  padding: ${({ $token }) => `${$token.padding}px ${$token.padding}px`};
  border-radius: ${({ $token }) => $token.borderRadius * 2}px;
  display: flex;
  flex-direction: column;
  gap: ${({ $token }) => $token.size / 2}px;
  box-shadow: ${({ $token }) => $token.boxShadowTertiary};
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div`
  flex: 1 0
    ${({ $count }) => {
      if ($count === 1) return "100%";
      return "50%";
    }};
  border: ${({ $token }) =>
    `${$token.lineWidth}px ${$token.lineType} ${$token.colorBorder}`};
  background-color: ${({ $token }) => $token.colorBgContainer};
  overflow: hidden;
`;

const ChatMessage = ({ isOwnMessage, message }) => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { token } = useToken();

  return (
    <Message $isOwnMessage={isOwnMessage} $token={token}>
      {isOwnMessage ? (
        <></>
      ) : (
        <AvatarContainer>
          <Avatar
            src={
              selectedUser?.avatar
                ? `${API_URL}/files/${selectedUser.avatar}`
                : "/default-avatar.png"
            }
            alt="avatar"
          />
        </AvatarContainer>
      )}

      <Bubble $isOwnMessage={isOwnMessage} $token={token}>
        {message.images && message.images.length > 0 && (
          <ImagesContainer $token={token}>
            {message.images.map((img, index) => (
              <ImageContainer
                key={index}
                $token={token}
                $count={message.images.length}
              >
                <Image
                  width="100%"
                  height="100%"
                  src={`${API_URL}/files/${img}`}
                  alt={`chat-img-${index}`}
                />
              </ImageContainer>
            ))}
          </ImagesContainer>
        )}
        {message.text && <Text>{message.text}</Text>}
        <Text type="secondary">{formatMessageDate(message.createdAt)}</Text>
      </Bubble>
    </Message>
  );
};
export default ChatMessage;
