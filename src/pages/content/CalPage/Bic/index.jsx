import React, { Fragment, useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";

// 自己组件引入
import "./index.scss";
import calDefaultData from "../../../../static/calRes.json";
import { message } from "antd";

export function Bic() {
  const data = useOutletContext();
  const [bic, setBic] = useState(null)
  const [bicStatus, setBicStatus] = useState(false)
  const index = calDefaultData["B&SIndex"];

  useEffect(() => {
    if(bic === null){
      setBicStatus(true)
    }
    console.log(bic);
    console.log(index);
  }, []);

  // 判断是否接收到了文件的数据
  if(bicStatus){
    message.error("没有获取到对应数据");
    return <Navigate to="/MainPage/Show"/>
  }
  const HeaderItem = () => {
    return index[0].map((item) => {
      return <div className="headerItem">{item}</div>;
    });
  };

  return (
    <Fragment>
      <div className="content1">
        <div className="content-left">
          <div className="table-border">
            <div className="content-table">
              <div className="headerIndex">{<HeaderItem />}</div>
              <div className="tbl-cnt">
                <div className="rightIndex"></div>
                <div className="detail"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-right">
          <div className="cnt-rgt-res"></div>
        </div>
      </div>
    </Fragment>
  );
}
