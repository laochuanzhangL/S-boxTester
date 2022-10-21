import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { FileMarkdownOutlined, LockOutlined } from "@ant-design/icons";
import cookies from "react-cookies";

// 自己的组件
import httpUtill from "../../../utils/httpUtil";

export const User = () => {
  const [status, setStatus] = useState(false);

  const onFinish = (values) => {
    httpUtill.passwordLog(values).then((res) => {
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

  // 登录成功之后跳转
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
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "please enter your email address!",
            },
          ]}
        >
          <Input
            prefix={<FileMarkdownOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "please enter your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", marginTop: 20 }}
          >
            Login
          </Button>
        </Form.Item>

        <Form.Item>
          <Form.Item valuePropName="changePassword" noStyle>
            <Link to="/Login/find">click here to find password &gt;</Link>
          </Form.Item>
        </Form.Item>
      </Form>
    </Fragment>
  );
};
