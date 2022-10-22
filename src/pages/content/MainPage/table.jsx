import React, { Fragment } from "react";

import DefArray from "../../../static/test.json";
 
export default function Table(props) {
  const headerIndex = [
    "",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
  ];
  const contentIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const { data } = props;

  //   生成头部的小方块
  const HeadItem = () => {
    return headerIndex.map((item) => {
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
    return contentIndex.map((item) => {
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
    return data[0]
      ? data.map((item) => {
          key = key + 1;
          return (
            <div className="tab-row-item" key={key}>
              {<RowItemCol data={item} />}
            </div>
          );
        })
      : DefArray.start.map((item) => {
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
      <div className="content-table">
        <div className="table-header">
          <HeadItem />
        </div>
        <div className="table-content">
          <div className="tab-con-index">{<ContentIndexItem />}</div>
          <div className="tab-con-content">{<RowItem />}</div>
        </div>
      </div>
    </Fragment>
  );
}
