import React from "react";
import BG from "../../utils/BG";
import styles from "./index.module.css";
import { User, Register, ServerLog } from "./components/index";
import { Tabs } from "antd";

export default function Login() {
  return (
    <div>
      <div className={styles["login-wrap"]}>
        <div className={styles["login-top"]}>cipher calculate</div>
        <Tabs
          className={styles["login-select-form"]}
          defaultActiveKey="1"
          centered={true}
          tabBarGutter={80}
          items={[
            {
              label: `PasswordLog`,
              key: "1",
              children: <User />,
              className: styles["login-select-form-content"],
            },
            {
              label: `ServerLog`,
              key: "2",
              children: <ServerLog />,
              className: styles["login-select-form-content"],
            },
            {
              label: `Register`,
              key: "3",
              children: <Register />,
              className: styles["login-select-form-content"],
            },
          ]}
        />
        <div className={styles["login-text"]}>
          Copyright &copy; {new Date().getFullYear()} MISLab 版权所有
        </div>
        <BG />
      </div>
    </div>
  );
}
