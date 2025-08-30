import { Button, Card, Input, Typography, Form, theme } from "antd";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MessageApiContext } from "../contexts/messageApiContext";
import { Link } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../slices/authSlice";
import Container from "../components/Layout/Container";
import { connectSocket } from "../lib/socket";

const { Text, Title } = Typography;
const { useToken } = theme;

const LoginContainer = styled.div`
  max-width: 500px;
  width: 100%;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ $token }) => $token.margin / 2}px;
`;

const LoginPrompt = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ $token }) => $token.size / 4}px;
`;

const LoginPage = () => {
  const { token } = useToken();
  const messageApi = useContext(MessageApiContext);
  const { isLoggingIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(login(values))
      .unwrap()
      .then((data) => {
        messageApi.success(data?.message);
        connectSocket(data?.data?._id, dispatch);
      })
      .catch((err) => {
        messageApi.error(err);
      });
  };

  return (
    <Container
      $display="flex"
      $justifyContent="center"
      $alignItems="center"
      $paddingTop={`${token.padding}px`}
      $paddingBottom={`${token.padding}px`}
    >
      <LoginContainer>
        <Card variant="borderless">
          <LoginHeader $token={token}>
            <Title>Login</Title>
            <Text type="secondary">
              Welcome back to Demo! Please enter your details below to Login
            </Text>
          </LoginHeader>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email:"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                type="email"
                placeholder="email..."
              />
            </Form.Item>

            <Form.Item
              label="Password:"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="password..."
              />
            </Form.Item>

            <Form.Item>
              <Button
                block="true"
                type="primary"
                htmlType="submit"
                loading={isLoggingIn}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <LoginPrompt $token={token}>
            <Text>Don't have an account?</Text>
            <Link to="/signup">Sign up</Link>
          </LoginPrompt>
        </Card>
      </LoginContainer>
    </Container>
  );
};

export default LoginPage;
