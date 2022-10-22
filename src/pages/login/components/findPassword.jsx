import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";

import httpUtill from "../../../utils/httpUtil";
import BG from "../../../utils/BG";
import "./findPassword.scss";

export default function FindPassword() {
  const emailRef = useRef(false);
  const [status, setStatus] = useState(false);
  // 提交表单后正确和错误的信息
  const onFinish = (values) => {
    delete values.confirm;
    httpUtill.reSetPassword(values).then((res) => {
      if (res.msg === "验证码不存在或已过期") {
        message.warn(
          "The verification code has expired, please obtain it again"
        );
        return;
      }
      if (res.data) {
        setStatus(true);
        message.success("The password has been changed successfully ~");
      }
    });
  };
  //   获取登录验证码
  const getEmailCode = () => {
    const email = emailRef.current.input.value;
    if (!email) {
      message.warning("Please enter your email first !");
      return;
    }
    message.success("Send successful, please check your email ~");
    httpUtill.getServerCodeFIND(email).then((res) => {
      if (res.msg === "该账号不存在") {
        message.error(
          "This account does not exist, please re-enter your account !"
        );
      }
    });
  };

  if (status) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="Register">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="reg-center">
          {/* 标题 */}
          <div className="center-item header">
            <span style={{ textAlign: "center", fontSize: "30px" }}>
              F i n d &nbsp; P a s s w o r d
            </span>
          </div>
          {/* 填写邮箱地址 */}
          <div className="center-item">
            <div className="cnt-item-center">
              <div className="text">
                <span style={{ color: "red" }}>*</span>Email:
              </div>
              <div className="input">
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input ref={emailRef} />
                </Form.Item>
              </div>
            </div>
          </div>
          {/* 获取验证码 */}
          <div className="center-item">
            <div className="cnt-item-center">
              <div className="input-server">
                <Form.Item
                  name="verificationCode"
                  rules={[
                    {
                      required: true,
                      message: "Please input your verificationCode!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="Btn">
                <Button onClick={getEmailCode}>get code</Button>
              </div>
            </div>
          </div>
          {/* 输入新的密码 */}
          <div className="center-item">
            <div className="cnt-item-center">
              <div className="text">
                <span style={{ color: "red" }}>*</span>Password:
              </div>
              <div className="input">
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>
            </div>
          </div>
          {/* 确认密码正确 */}
          <div className="center-item">
            <div className="cnt-item-center">
              <div className="text">
                <span style={{ color: "red" }}>*</span>Confirm:
              </div>
              <div className="input">
                <Form.Item
                  name="confirm"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>
            </div>
          </div>
          {/* 注册按钮 */}
          <div className="center-item">
            <div className="cnt-item-center">
              <div className="text"></div>
              <div className="reset">
                <Button type="primary" block={true} htmlType="submit">
                  Confirm
                </Button>
              </div>
            </div>
          </div>
          {/* 版权信息 */}
          <div className="center-item">
            <span style={{ fontSize: "15px", paddingBottom:"15px" }}>
              Copyright &copy; {new Date().getFullYear()} MISLab 版权所有
            </span>
          </div>
        </div>
      </Form>
      <BG />
    </div>
  );
}
