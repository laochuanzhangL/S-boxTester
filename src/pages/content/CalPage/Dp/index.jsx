import React, { Fragment, useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import { message } from "antd";

// 自己组件引入
import "./index.scss";
import calDefaultData from "../../../../static/calRes.json";

export function Dp() {
  const data = useOutletContext();
  const [dp, setDp] = useState(null);
  const [dpStatus, setDpStatus] = useState(false);
  const DefArray = calDefaultData['Dp']
  const index = calDefaultData["DpIndex"];
  // 计算的一些结果数据
  let MaxVal = 0;

  useEffect(() => {
    if (data === null) {
      setDpStatus(true);
    } else {
      setDp(data.dp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 判断是否接收到了文件的数据
  if (dpStatus) {
    message.error("没有获取到对应数据");
    return <Navigate to="/MainPage/Show" />;
  }

  // 接收到数据之后开始计算
  if (dp) {
    let calArray = [];
    if (dp !== "" && dp !== undefined) {
      //先转为一维数组
      (dp ? dp : calDefaultData.Bic).forEach((item) => {
        calArray = [...calArray, ...item];
      });
      MaxVal = calArray[2];
      calArray.forEach((val) => {
        MaxVal = MaxVal < val ? val : MaxVal;
      });
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
  //   生成表格具体内容
  const RowItemCol = ({ data }) => {
    let key = 0;
    return data.map((item) => {
      key = key + 1;
      return (
        <div className="row-item-col" tabIndex={item} key={key}>
          {item}
        </div>
      );
    });
  };
  const RowItem = () => {
    let key = 0;
    return (dp ? dp : DefArray).map((item) => {
      key = key + 1;
      return (
        <div className="tab-row-item" key={key}>
          {<RowItemCol data={item} />}
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div className="content2">
        {/* 左边展示具体数据表格 */}
        <div className="content-left">
          <div className="content-table">
            <div className="table-header">
              <HeadItem />
            </div>
            <div className="table-content">
              <div className="tab-con-index">{<ContentIndexItem />}</div>
              <div className="tab-con-content">{<RowItem />}</div>
            </div>
          </div>
        </div>

        {/* 右边展示最大最小值等数据 */}
        <div className="content-right">
          <div className="cnt-rgt-res">
            <div className="cnt-rgt-res-center">
              <div className="head">计算结果分析</div>
              <div className="value">
                <div className="top">
                  {/* 结果分析计算的值 */}
                  <div className="val-item">
                    <div className="fang">
                      <div className="center"></div>
                    </div>
                    <div className="val">Max Value : {MaxVal}</div>
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
