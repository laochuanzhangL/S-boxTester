import React from "react";


export default function RowItem() {
  const lp = JSON.parse(sessionStorage.getItem("mainPage_fileData")).lp;
  let key = 0;

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
  return lp ? (
    lp.map((item) => {
      key = key + 1;
      return (
        <div className="tab-row-item" key={key}>
          {<RowItemCol data={item} />}
        </div>
      );
    })
  ) : (
    <h1 style={{ color: "rgb(23, 204, 204)", margin: "170px 500px" }}>
      Loding...
    </h1>
  );
}
