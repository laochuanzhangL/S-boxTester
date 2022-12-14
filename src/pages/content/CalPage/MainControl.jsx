import React, { Fragment, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { Divider, Button } from "antd";
import cookies from "react-cookies";

// 自己的组件
import httpUtill from "../../../utils/httpUtil";
import "./index.scss";

export default function UploadAndShow() {
  const [calData] = useState(useLocation().state);
  const btnData = [
    {
      path: "Nlr",
      name: "Nonlinear",
    },
    {
      path: "Sac",
      name: "Sac",
    },
    {
      path: "Bic",
      name: "Bic",
    },
    {
      path: "SOB",
      name: "SacOfBic",
    },

    {
      path: "Dp",
      name: "Dp",
    },
    {
      path: "Lp",
      name: "Lp",
    },
  ];
  const url = useLocation();

  // 用于控制用户退出登录的函数
  const forExit = () => {
    httpUtill.checkLogout();
  };

  // 判断是否登录
  if (!cookies.load("token")) {
    return <Navigate to="/Login" />;
  }

  return (
    <Fragment>
      <div className="calPage">
        {/* 展示名称，跳转登录和退出登录 */}
        <div className="header">
          <div className="showName">Welcom back,&nbsp;&nbsp; jiejie</div>
          <div className="Exit">
            <div className="login">
              <Link to="/Login">Login</Link>
            </div>
            &nbsp; | &nbsp;
            <div className="eText">
              <Button type="text" onClick={forExit}>
                Exit
              </Button>
            </div>
          </div>
        </div>

        {/* 控件和标题 */}
        <div className="control">
          <div className="title"> Calculation result display page </div>
          <div className="controlElement">
            {/* 左边六个控件 */}
            <div className="cle-left">
              {btnData.map((item) => {
                return (
                  <Link
                    to={`/CalPage/${item.path}`}
                    className="resBtn"
                    key={item.path}
                  >
                    {url.pathname.indexOf(item.path) !== -1 ? (
                      <Button className="btn btnClick">{item.name}</Button>
                    ) : (
                      <Button className="btn">{item.name}</Button>
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="cle-right">
              <Link to="/MainPage/Show" className="rgt-back-button">
                <Button block className="btn">
                  Back to Calculate
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Divider />
        <Outlet context={calData} />
      </div>
    </Fragment>
  );
}
