import styled from "styled-components";
import { Button, Form, Input, theme, Upload, Image } from "antd";
import {
  UploadOutlined,
  CloseCircleFilled,
  SendOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../slices/chatSlice";
import { MessageApiContext } from "../../../contexts/messageApiContext";

const { useToken } = theme;

const Footer = styled.div`
  margin-top: auto;
  width: 100%;
`;

const FormContainer = styled.div`
  padding: ${({ $token }) => $token.padding}px;
`;

const InputContainer = styled.div`
  flex: 1;
`;

const ImagesPreviewContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ $token }) => $token.size}px;
  overflow-x: auto;
  width: 100%;
  padding: ${({ $token }) => `${$token.padding}px `};
`;

const PreviewImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  max-width: 80px;
  max-height: 80px;
  border: ${({ $token }) =>
    `${$token.lineWidth}px ${$token.lineType} ${$token.colorBorder}`};
`;

const RemovePreviewImageButton = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  color: ${({ $token }) => $token.colorError};
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ $token }) => $token.colorBgContainer};
`;

const MainChatFooter = () => {
  const { token } = useToken();
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const messageApi = useContext(MessageApiContext);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = (uid) => {
    setFileList((prev) => prev.filter((file) => file.uid !== uid));
  };

  const handleFinish = (values) => {
    const formData = new FormData();

    formData.append("text", values?.text || "");
    for (const file of fileList) {
      console.log(file);
      formData.append("images", file.originFileObj);
    }

    dispatch(sendMessage(formData))
      .unwrap()
      .catch((err) => {
        messageApi.error(err);
      });

    form.resetFields();
    setFileList([]);
  };

  return (
    <Footer>
      {fileList.length > 0 ? (
        <ImagesPreviewContainer $token={token}>
          {fileList.map((file) => (
            <PreviewImageContainer key={file.uid} $token={token}>
              <Image
                width="100%"
                height="100%"
                src={URL.createObjectURL(file.originFileObj)}
              />
              <RemovePreviewImageButton
                $token={token}
                onClick={() => handleRemove(file.uid)}
              >
                <CloseCircleFilled />
              </RemovePreviewImageButton>
            </PreviewImageContainer>
          ))}
        </ImagesPreviewContainer>
      ) : (
        <></>
      )}

      <FormContainer $token={token}>
        <Form form={form} layout="inline" onFinish={handleFinish}>
          <InputContainer>
            <Form.Item
              name="text"
              rules={[
                () => ({
                  validator(_, value) {
                    if (fileList && fileList.length > 0) {
                      return Promise.resolve();
                    }
                    if (!value || value.trim().length === 0) {
                      return Promise.reject(
                        new Error("Please input your message!")
                      );
                    }
                    if (value.length < 1) {
                      return Promise.reject(
                        new Error("Message must be at least 1 character!")
                      );
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input placeholder="Message..." />
            </Form.Item>
          </InputContainer>

          <Form.Item>
            <Upload
              multiple
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false}
              showUploadList={false}
              accept="image/*"
            >
              <Button type="text">
                <UploadOutlined />
              </Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            <SendOutlined />
          </Button>
        </Form>
      </FormContainer>
    </Footer>
  );
};

export default MainChatFooter;
