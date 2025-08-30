import styled from "styled-components";
import { Button, Card, Form, Input, Typography, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { signup } from "../slices/authSlice";
import { MessageApiContext } from "../contexts/messageApiContext";
import { useContext } from "react";
import Container from "../components/Layout/Container";
import { connectSocket } from "../lib/socket";

const { Text, Title } = Typography;
const { useToken } = theme;

const SignupContainer = styled.div`
  max-width: 500px;
  width: 100%;
`;

const SignupHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ $token }) => $token.margin / 2}px;
`;

const SignupPrompt = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ $token }) => $token.size / 4}px;
`;

const SignUpPage = () => {
  const { token } = useToken();
  const messageApi = useContext(MessageApiContext);
  const { isSigningUp } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(signup(values))
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
      <SignupContainer>
        <Card variant="borderless">
          <SignupHeader $token={token}>
            <Title>Sign up</Title>
            <Text type="secondary">
              Join us! Create an account to get started
            </Text>
          </SignupHeader>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="First name:"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
                {
                  min: 2,
                  message: "First name must be at least 2 characters!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="First name..." />
            </Form.Item>

            <Form.Item
              label="Last name:"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
                { min: 2, message: "Last name must be at least 2 characters!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Last name..." />
            </Form.Item>

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

            <Form.Item
              label="Confrim password:"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="confrim password..."
              />
            </Form.Item>

            <Form.Item>
              <Button
                block="true"
                type="primary"
                htmlType="submit"
                loading={isSigningUp}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
          <SignupPrompt $token={token}>
            <Text>Already have an account?</Text>
            <Link to="/login">Login</Link>
          </SignupPrompt>
        </Card>
      </SignupContainer>
    </Container>
  );
};

export default SignUpPage;
