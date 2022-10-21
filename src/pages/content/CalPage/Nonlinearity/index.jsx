import React, { Fragment, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { message } from "antd";

// 自己组件引入
import "./index.scss";
import calDefaultData from "../../../../static/calRes.json";

export function Nonlinearity() {
  const [Nlr, setNlr] = useState(null);
  const nlr = JSON.parse(
    sessionStorage.getItem("mainPage_fileData")
  ).nonlinearity;
  const [NlrStatus, setNlrStatus] = useState(false);
  const index = calDefaultData["B&SIndex"];
  // 计算的一些结果数据
  let MaxVal = 0;
  let MinVal = 0;
  let AvgVal = 0;

  useEffect(() => {
    if (nlr) {
      setNlr([[...nlr], ...calDefaultData.Non]);
    } else {
      setNlrStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 判断是否接收到了文件的数据
  if (NlrStatus) {
    message.error("sorry, didn't get the Data !");
    return <Navigate to="/MainPage/Show" />;
  }

  // 接收到数据之后开始计算
  if (nlr) {
    let calArray = nlr;
    calArray.forEach((val) => {
      MaxVal = MaxVal < val ? val : MaxVal;
      MinVal = MinVal > val ? val : MinVal;
      AvgVal = AvgVal + val;
    });
    AvgVal = AvgVal / 8;
  }

  // 头部小方块
  const HeaderItem = () => {
    return index[0].map((item) => {
      return (
        <div className="headerItem" key={`${item}`}>
          {item}
        </div>
      );
    });
  };

  // 右边index小方块
  const RightIndexItem = () => {
    return index[1].map((item) => {
      return (
        <div className="rightItem" key={`${item}`}>
          {item}
        </div>
      );
    });
  };

  // 获取具体小方块
  const DetailItemCol = (data) => {
    return data.data.map((item) => {
      let key = Math.random() * 10;
      return (
        <div className="detailItem" key={key} tabIndex={item}>
          {item}
        </div>
      );
    });
  };
  const DetailItem = () => {
    let key = 0;
    return (Nlr ? Nlr : calDefaultData.Bic).map((item) => {
      key = key + 1;
      return (
        <div className="detailRow" key={key}>
          {<DetailItemCol data={item} />}
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div className="content4">
        {/* 左边展示具体数据表格 */}
        <div className="content-left">
          <div className="table-border">
            <div className="content-table">
              <div className="headerIndex">{<HeaderItem />}</div>

              <div className="tbl-cnt">
                <div className="rightIndex">{<RightIndexItem />}</div>
                <div className="detail">{<DetailItem />}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 右边展示最大最小值等数据 */}
        <div className="content-right">
          <div className="cnt-rgt-res">
            <div className="cnt-rgt-res-center">
              <div className="head">Analysis of Nonlinearity</div>
              <div className="value">
                <div className="top">
                  {/* 结果分析计算的值 */}
                  <div className="val-item">
                    <div className="fang">
                      <div className="center"></div>
                    </div>
                    <div className="val">Max Value : {MaxVal}</div>
                  </div>
                  <div className="val-item">
                    <div className="fang">
                      <div className="center"></div>
                    </div>
                    <div className="val">Min Value : {MinVal}</div>
                  </div>
                  <div className="val-item">
                    <div className="fang">
                      <div className="center"></div>
                    </div>
                    <div className="val">Average : {AvgVal}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
