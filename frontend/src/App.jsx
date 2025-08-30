import { useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Layout/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, Spin, message, theme } from "antd";
import { MessageApiContext } from "./contexts/messageApiContext";
import { checkAuth } from "./slices/authSlice";
import styled from "styled-components";
import { connectSocket } from "./lib/socket";

const { useToken } = theme;

const Layout = styled.div`
  height: 100%;
`;

function App() {
  const { token } = useToken();

  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .then((data) => {
        connectSocket(data?.data?._id, dispatch);
      })
      .catch((err) => {});
  }, [checkAuth]);

  return (
    <MessageApiContext.Provider value={messageApi}>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 16,
          },
        }}
      >
        {contextHolder}
        {isCheckingAuth && !authUser ? (
          <Spin fullscreen />
        ) : (
          <Layout>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  authUser ? <HomePage /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/signup"
                element={
                  !authUser ? <SignUpPage /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/login"
                element={
                  !authUser ? <LoginPage /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/profile"
                element={
                  authUser ? <ProfilePage /> : <Navigate to="/login" replace />
                }
              />
            </Routes>
          </Layout>
        )}
      </ConfigProvider>
    </MessageApiContext.Provider>
  );
}

export default App;
