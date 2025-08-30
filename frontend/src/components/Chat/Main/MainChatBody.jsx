import { Skeleton, theme } from "antd";
import styled from "styled-components";
import ChatMessage from "../Messaage/ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { getChatMessages } from "../../../slices/chatSlice";
import { useEffect } from "react";
import { subscribeToMessage, unSubscribeToMessage } from "../../../lib/socket";

const { useToken } = theme;

const Body = styled.div`
  height: 100%;
  flex: 1;
  overflow-y: hidden;
  border-bottom: ${({ $token }) =>
    `${$token.lineWidth}px ${$token.lineType} ${$token.colorBorder}`};
`;

const MessageList = styled.ul`
  height: 100%;
  list-style: none;
  margin: 0;
  padding: ${({ $token }) => $token.padding}px;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
`;

const MessageItem = styled.li`
  margin-bottom: ${({ $token }) => $token.marginLG}px;
  display: flex;
  justify-content: ${({ $isOwnMessage }) =>
    $isOwnMessage ? "flex-end" : "flex-start"};
`;

const SkeletonContainer = styled.div`
  width: 40%;
`;

const MainChatBody = () => {
  const { messages, selectedUser, isMessagesLoading } = useSelector(
    (state) => state.chat
  );

  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { token } = useToken();

  useEffect(() => {
    if (!selectedUser?._id) {
      return;
    }
    dispatch(getChatMessages());
    subscribeToMessage(selectedUser?._id, dispatch);

    return () => unSubscribeToMessage();
  }, [
    selectedUser?._id,
    getChatMessages,
    subscribeToMessage,
    unSubscribeToMessage,
  ]);

  if (isMessagesLoading) {
    return (
      <Body $token={token}>
        <MessageList $token={token}>
          {Array.from({ length: 15 }).map((value, index) => {
            const isOwnMessage = index % 2 == 0;
            return (
              <MessageItem
                key={index}
                $token={token}
                $isOwnMessage={isOwnMessage}
              >
                <SkeletonContainer>
                  <Skeleton
                    avatar={!isOwnMessage}
                    active
                    title={false}
                    paragraph={{ rows: 3, width: ["100%", "100%", "100%"] }}
                  />
                </SkeletonContainer>
              </MessageItem>
            );
          })}
        </MessageList>
      </Body>
    );
  }

  return (
    <Body $token={token}>
      <MessageList $token={token}>
        {[...messages].reverse().map((message) => (
          <MessageItem
            $token={token}
            key={message._id}
            $isOwnMessage={message.senderId === authUser._id}
          >
            <ChatMessage
              isOwnMessage={message.senderId === authUser._id}
              message={message}
            />
          </MessageItem>
        ))}
      </MessageList>
    </Body>
  );
};

export default MainChatBody;
