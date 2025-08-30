import styled from "styled-components";
import { Avatar, Typography, theme } from "antd";
import { useSelector } from "react-redux";

const { Text } = Typography;

const { useToken } = theme;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $token }) => `${$token.size / 2}px`};
`;

const UserInfor = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChatUser = ({ user }) => {
  const { token } = useToken();
  const { onlineUsers } = useSelector((state) => state.auth);

  const isOnline = onlineUsers.includes(user._id);

  return (
    <UserProfile $token={token}>
      <Avatar
        size={42}
        src={
          user?.avatar
            ? `http://localhost:8080/files/${user.avatar}`
            : "/default-avatar.png"
        }
        alt="avatar"
      />

      <UserInfor>
        <Text>{`${user.firstName} ${user.lastName}`}</Text>
        <Text type={isOnline ? "success" : "secondary"}>
          {isOnline ? "Online" : "Offline"}
        </Text>
      </UserInfor>
    </UserProfile>
  );
};

export default ChatUser;
