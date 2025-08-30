import styled from "styled-components";
import ChatUser from "./ChatUser";
import { Skeleton, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../../slices/chatSlice";

const { useToken } = theme;

const UserList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  height: 100%;
  flex: 1;
`;

const UserItem = styled.li`
  padding: ${({ $token }) => `${$token.padding / 2}px ${$token.padding / 2}px`};
  cursor: pointer;
  background-color: ${({ $token, $active }) =>
    $active ? $token.colorPrimaryBgHover : "transparent"};

  &:hover {
    background-color: ${({ $token }) => $token.colorPrimaryBgHover};
  }
`;

const ChatUserList = () => {
  const { selectedUser, users, isUsersLoading } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();
  const { token } = useToken();

  const handleUserClick = (user) => {
    dispatch(setSelectedUser(user));
  };

  if (isUsersLoading) {
    return (
      <UserList>
        {Array.from({ length: 5 }).map((_, index) => (
          <UserItem $token={token} key={index}>
            <Skeleton
              avatar={{ shape: "circle" }}
              title={{ width: "80%" }}
              active
              paragraph={false}
            />
          </UserItem>
        ))}
      </UserList>
    );
  }

  return (
    <UserList>
      {users.map((user) => (
        <UserItem
          $token={token}
          key={user._id}
          $active={selectedUser?._id === user._id}
          onClick={() => handleUserClick(user)}
        >
          <ChatUser user={user} />
        </UserItem>
      ))}
    </UserList>
  );
};

export default ChatUserList;
