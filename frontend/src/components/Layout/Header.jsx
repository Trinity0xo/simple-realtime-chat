import { Avatar, Dropdown, Space, theme } from "antd";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useContext } from "react";
import { MessageApiContext } from "../../contexts/messageApiContext";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import { disconnectSocket, getSocket } from "../../lib/socket";
import { API_URL } from "../../lib/axios";

const { useToken } = theme;

const HeaderContainer = styled.div`
  display: block;
  background-color: ${({ $token }) => $token.colorBgContainer};
  height: 64px;
  box-shadow: ${({ $token }) => $token.boxShadowTertiary};
`;

const LogoText = styled.div`
  font-size: ${({ $token }) => $token.fontSizeHeading1}px;
  font-weight: ${({ $token }) => $token.fontWeightStrong};
`;

const SpaceContainer = styled.div`
  cursor: pointer;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: ${({ $token }) => $token.colorPrimary};
`;

const Header = () => {
  const { token } = useToken();

  const messageApi = useContext(MessageApiContext);
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then((data) => {
        messageApi.success(data?.message);
        if (getSocket()) {
          disconnectSocket();
        }
      })
      .catch((err) => {
        messageApi.error(err);
      });
  };

  const onClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    }
    if (key === "profile") {
      navigate("/profile");
    }
  };

  const items = [
    {
      key: "profile",
      label: "Profile",
      icon: <SettingOutlined />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <HeaderContainer $token={token}>
      <Container
        $display="flex"
        $justifyContent="space-between"
        $alignItems="center"
        $height="64px"
      >
        <LogoText $token={token}>
          <LogoLink $token={token} to="/">
            DEMO
          </LogoLink>
        </LogoText>

        {authUser ? (
          <Dropdown menu={{ items, onClick }} trigger={["click"]}>
            <SpaceContainer>
              <Space>
                <Avatar
                  size={32}
                  src={
                    authUser?.avatar
                      ? `${API_URL}/files/${authUser.avatar}`
                      : "/default-avatar.png"
                  }
                />
                {`${authUser.firstName} ${authUser.lastName}`}
              </Space>
            </SpaceContainer>
          </Dropdown>
        ) : (
          <></>
        )}
      </Container>
    </HeaderContainer>
  );
};

export default Header;
