import { theme } from "antd";
import styled, { css } from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../slices/chatSlice";
import ChatSidebarHeader from "./ChatSidebarHeader";
import ChatUserList from "../User/ChatUserList";

const { useToken } = theme;

const Sidebar = styled.aside`
  position: absolute;
  width: 240px;
  height: 100%;
  border-right: ${({ $token }) =>
    `${$token.lineWidth}px ${$token.lineType} ${$token.colorBorder}`};
  display: flex;
  flex-direction: column;
  transition: 0.5s;

  @media (max-width: 768px) {
    width: 100%;
    transform: ${({ $selectedUser }) =>
      $selectedUser ? "translateX(-100%)" : "translateX(0)"};
    border-right: none;
  }
`;

const ChatSidebar = () => {
  const { token } = useToken();
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getUsers());
  }, [getUsers]);

  return (
    <Sidebar $token={token} $selectedUser={selectedUser}>
      <ChatSidebarHeader />
      <ChatUserList />
    </Sidebar>
  );
};

export default ChatSidebar;
