import {
  Button,
  Card,
  Input,
  Typography,
  Form,
  theme,
  Avatar,
  Upload,
} from "antd";
import styled from "styled-components";
import Container from "../components/Layout/Container";
import { UserOutlined, MailOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { MessageApiContext } from "../contexts/messageApiContext";
import { useContext, useEffect, useState } from "react";
import { updateProfile } from "../slices/authSlice";
import { API_URL } from "../lib/axios";

const { Text, Title } = Typography;
const { useToken } = theme;

const ProfileContainer = styled.div`
  max-width: 500px;
  width: 100%;
`;

const ProfileHeader = styled.div`
  text-align: center;
`;

const ProfileAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const EditAvatarButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background: ${({ $token }) => $token.colorPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ $token }) => $token.colorBgContainer};
  transition: background 0.5s;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $token }) => $token.size}px;
`;

const ProfilePage = () => {
  const { token } = useToken();
  const dispatch = useDispatch();
  const messageApi = useContext(MessageApiContext);
  const { isUpdatingProfile, authUser } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const handleChange = ({ file }) => {
    setFile(file.originFileObj || file);
  };

  const loadProfile = () => {
    form.setFieldsValue(authUser);
  };

  useEffect(() => {
    if (authUser) {
      loadProfile();
    }
  }, [authUser]);

  const onFinish = (values) => {
    const formData = new FormData();

    formData.append("avatar", file);

    for (const key in values) {
      formData.append(key, values[key]);
    }

    dispatch(updateProfile(formData))
      .unwrap()
      .then((data) => {
        messageApi.success(data?.message);
      })
      .catch((err) => {
        messageApi.error(err);
      });
  };

  return (
    <Container
      $display="flex"
      $flexDirection="column"
      $justifyContent="center"
      $alignItems="center"
      $gap={`${token.size}px`}
      $paddingTop={`${token.padding}px`}
      $paddingBottom={`${token.padding}px`}
    >
      <ProfileContainer>
        <Card>
          <CardContent $token={token}>
            <ProfileHeader>
              <Title>Profile</Title>
              <Text type="secondary">Your profile information</Text>
            </ProfileHeader>

            <ProfileAvatar>
              <AvatarContainer>
                <Avatar
                  size={128}
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : authUser?.avatar
                      ? `${API_URL}/files/${authUser.avatar}`
                      : "/default-avatar.png"
                  }
                />
                <Upload
                  showUploadList={false}
                  beforeUpload={() => false}
                  accept="image/*"
                  onChange={handleChange}
                >
                  <EditAvatarButton $token={token}>
                    <EditOutlined />
                  </EditAvatarButton>
                </Upload>
              </AvatarContainer>
            </ProfileAvatar>

            <Form form={form} layout="vertical" onFinish={onFinish}>
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
                  {
                    min: 2,
                    message: "Last name must be at least 2 characters!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Last name..." />
              </Form.Item>

              <Form.Item label="Email:" name="email">
                <Input
                  prefix={<MailOutlined />}
                  type="email"
                  placeholder="email..."
                  disabled
                />
              </Form.Item>

              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={isUpdatingProfile}
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </CardContent>
        </Card>
      </ProfileContainer>
      {/* <ProfileContainer>
        <Card>
          <CardContent $token={token}>
            <Text type="secondary">Account Information</Text>
            <InfoContainer>
              <Text>Member since:</Text>
              <Text>January 15, 2023</Text>
            </InfoContainer>
          </CardContent>
        </Card>
      </ProfileContainer> */}
    </Container>
  );
};

export default ProfilePage;
