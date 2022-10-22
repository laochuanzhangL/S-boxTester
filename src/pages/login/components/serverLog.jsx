import React, { Fragment, useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import {
  SafetyCertificateOutlined,
  FileMarkdownOutlined,
} from "@ant-design/icons";
import cookies from "react-cookies";

import httpUtill from "../../../utils/httpUtil";

export const ServerLog = () => {
  const emailRef = useRef();
  const [status, setStatus] = useState(false);

  // 按下发送请求登录
  const onFinish = (values) => {
    httpUtill.serverLog(values).then((res) => {
      if (res.msg === "邮箱或密码错误") {
        message.warn("Email or password error !");
      } else if (res.code === "200") {
        const expires = new Date(
          new Date().getTime() + 60 * 60 * 1000 * 24 * 3
        );
        cookies.save("token", res.data.token, { path: "/", expires });
        setStatus(true);
        message.success("Login succeeded !");
      }
    });
  };

  // 获取登录验证码
  const getEmailCode = () => {
    const email = emailRef.current.input.value;
    if (!email) {
      message.warning("Please enter your email first !");
    }
    httpUtill.getServerCodeLOG(email).then((res) => {
      console.log(res);
      if (res.code === "0068000005") {
        message.error("This account does not exist, please register first !");
      } else if (res.data === true) {
        message.success("Send successfully !");
      }
    });
  };

  //   判断是否登录成功，成功跳转到内部页面
  if (status) {
    return <Navigate to="/MainPage/Show" />;
  }

  return (
    <Fragment>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        {/* 输入邮箱地址 */}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please your email address!",
            },
          ]}
        >
          <Input
            id="email"
            prefix={<FileMarkdownOutlined className="site-form-item-icon" />}
            placeholder="email"
            ref={emailRef}
          />
        </Form.Item>

        {/* 输入验证码 */}
        <div
          style={{
            position: "relative",
          }}
        >
          <Form.Item
            name="verificationCode"
            rules={[
              {
                required: true,
                message: "Please enter your code!",
              },
            ]}
            style={{
              width: "72.3%",
            }}
          >
            <Input
              prefix={
                <SafetyCertificateOutlined className="site-form-item-icon" />
              }
              placeholder="verificationCode"
            />
          </Form.Item>
          <Button
            style={{
              width: "28%",
              height: "32px",
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "pointer",
            }}
            onClick={getEmailCode}
          >
            getCode
          </Button>
        </div>

        {/* 点击登录 */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", marginTop: 20 }}
          >
            Login
          </Button>
        </Form.Item>

        {/* 点击找回密码 */}
        <Form.Item>
          <Form.Item valuePropName="changePassword" noStyle>
            <Link to="/Login/find">click here to find password &gt;</Link>
          </Form.Item>
        </Form.Item>
      </Form>
    </Fragment>
  );
};
