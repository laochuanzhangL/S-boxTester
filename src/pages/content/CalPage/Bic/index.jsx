import React, { Fragment, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, message } from "antd";

// 自己组件引入
import "./index.scss";
import calDefaultData from "../../../../static/calRes.json";
import { btnClickExport } from "../../../../utils/downLoadFile";

export function Bic() {
  const bic = JSON.parse(sessionStorage.getItem("mainPage_fileData")).bic;
  const [bicStatus, setBicStatus] = useState(false);
  const index = calDefaultData["B&SIndex"];
  // 计算的一些结果数据
  let MinVal = 0;
  let AvgVal = 0;
  let Var = 0;

  useEffect(() => {
    if(!bic){
      setBicStatus(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 判断是否接收到了文件的数据
  if (bicStatus) {
    message.error("sorry, didn't get the Data !");
    return <Navigate to="/MainPage/Show" />;
  }

  // 获取计算数值Min，Avg，Var
  if (bic) {
    let calArray = [];
    if (bic !== "" && bic !== undefined) {
      //先转为一维数组
      (bic ? bic : calDefaultData.Bic).forEach((item) => {
        calArray = [...calArray, ...item];
      });
      MinVal = calArray[2];
      calArray.forEach((val) => {
        if (val === 0) {
          return;
        }
        MinVal = MinVal > val ? val : MinVal;
        AvgVal = AvgVal + val;
      });
      AvgVal = AvgVal / 56;
      calArray.forEach((val) => {
        if (val === 0) {
          return;
        }
        Var = Var + Math.pow(val - AvgVal, 2);
      });
      Var = Var / 56;
      AvgVal = AvgVal.toFixed(6);
      Var = Var.toFixed(6);
    }
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
    return (bic ? bic : calDefaultData.Bic).map((item) => {
      key = key + 1;
      return (
        <div className="detailRow" key={key}>
          {<DetailItemCol data={item} />}
        </div>
      );
    });
  };

  // 下载文件
  const downFile = ()=>{
    btnClickExport(JSON.parse(sessionStorage.getItem("mainPage_fileData")))
  }

  return (
    <Fragment>
      <div className="content1">
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
              <div className="head">Analysis of Bic</div>
              <div className="value">
                <div className="top">
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
                  <div className="val-item">
                    <div className="fang">
                      <div className="center"></div>
                    </div>
                    <div className="val">Variance : {Var}</div>
                  </div>
                </div>
                <div className="download">
                  <Button className="download-btn" onClick={downFile}>Download</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
