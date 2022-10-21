import React, { Fragment, useEffect, useState, Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { message } from "antd";

// 自己组件引入
import "./index.scss";
import calDefaultData from "../../../../static/calRes.json";
const RowItem = lazy(() => import("./RowItem"));

export function Lp() {
  const lp = JSON.parse(sessionStorage.getItem("mainPage_fileData")).lp;
  const [lpStatus, setLpStatus] = useState(false);
  const index = calDefaultData["LpIndex"];
  // 计算的一些结果数据
  let MaxVal = 0;
  let MaxCount = 0;

  useEffect(() => {
    if (lp === null) {
      setLpStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 判断是否接收到了文件的数据
  if (lpStatus) {
    message.error("Sorry, didn't get the data !");
    return <Navigate to="/MainPage/Show" />;
  }
  // 接收到数据之后开始计算
  if (lp) {
    let calArray = [];
    if (lp !== "" && lp !== undefined) {
      //先转为一维数组
      (lp ? lp : calDefaultData.Bic).forEach((item) => {
        calArray = [...calArray, ...item];
      });
      MaxVal = calArray[2];
      calArray.forEach((val) => {
        MaxVal = MaxVal < val ? val : MaxVal;
      });
      MaxCount = Math.abs(MaxVal / 256.0 - 0.5);
    }
  }

  //   生成头部的小方块
  const HeadItem = () => {
    return index[0].map((item) => {
      let bgc = "";
      if (item === 0) {
        bgc = "rgb(61, 61, 90)";
      }
      return (
        <div className="head-item" key={item} style={{ backgroundColor: bgc }}>
          {item}
        </div>
      );
    });
  };
  //   生成表格左边的坐标
  const ContentIndexItem = () => {
    return index[1].map((item) => {
      return (
        <div className="tab-con-indexItem" key={item}>
          {item}
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div className="content3">
        {/* 左边展示具体数据表格 */}
        <div className="content-left">
          <div className="content-table">
            <div className="table-box">
              <div className="table-header">
                <HeadItem />
              </div>
              <div className="table-content">
                <div className="tab-con-index">{<ContentIndexItem />}</div>
                <div className="tab-con-content">
                  <Suspense
                    fallback={
                      <h1
                        style={{
                          color: "rgb(23, 204, 204)",
                          margin: "170px 500px",
                        }}
                      >
                        Loding...
                      </h1>
                    }
                  >
                    {<RowItem lp={lp} />}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右边展示最大最小值等数据 */}
        <div className="content-right">
          <div className="cnt-rgt-res">
            <div className="cnt-rgt-res-center">
              <div className="head">Analysis of Lp</div>
              <div className="value">
                <div className="top">
                  {/* 结果分析计算的值 */}
                  <div className="val-item">
                    <div className="fang">
                      <div className="center"></div>
                    </div>
                    <div className="val">Max Count : {MaxVal}</div>
                  </div>
                  <div className="val-item">
                    <div className="fang">
                      <div className="center"></div>
                    </div>
                    <div className="val">Max Value : {MaxCount}</div>
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
