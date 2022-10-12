import React, { useEffect, Fragment, useState } from "react";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { Divider, Button } from "antd";

// 自己的组件
import httpUtill from "../../../utils/httpUtil";
import "./index.scss";

export default function UploadAndShow() {
  const [calData] = useState(useLocation().state);
  // const [detail, setDetail] = useOutletContext()
  const btnData = [
    {
      path: "Bic",
      name: "Bic",
    },
    {
      path: "Dp",
      name: "Dp",
    },
    {
      path: "Lp",
      name: "Lp",
    },
    {
      path: "Nlr",
      name: "Nonlinear",
    },
    {
      path: "Sac",
      name: "Sac",
    },
    {
      path: "SOB",
      name: "SacOfBic",
    },
  ];

  useEffect(() => {
    console.log(calData);
  }, []);

  // 用于控制用户退出登录的函数
  const forExit = () => {
    httpUtill.checkLogout();
  };

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
                    <Button className="btn">{item.name}</Button>
                  </Link>
                );
              })}
            </div>
            <div className="cle-right"></div>
          </div>
        </div>
        <Divider />
        <Outlet context={calData}/>
      </div>
    </Fragment>
  );
}
