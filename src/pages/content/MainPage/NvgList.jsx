import React, { useState } from "react";
import { MenuOutlined, UpOutlined } from "@ant-design/icons";
import { useEffect } from "react";

// 下载文件
import { btnClickExport } from "../../../utils/downLoadFile";

export default function NvgList(props) {
  const detailSee = props.detailSee;
  const [nvgList, setNvgList] = useState(false);
  const nvgButtonList = [
    "Download Results",
    "Nonlinearity",
    "SAC",
    "BIC-Nonlinearity",
    "BIC-SAC",
    "DP",
    "ScrollLp",
  ];

  useEffect(() => {
    document.onmousedown = (event) => {
      // 鼠标点击事件，希望点击外部的时候小窗口消失
      const e = event || window.event;
      let elem = e.target;
      while (elem) {
        if (elem.id === "nvg" || elem.id === "cnvg") {
          return;
        }
        elem = elem.parentNode;
      }
      setNvgList(false);
    };
  }, []);

  // 下载文件或者去到具体表格的位置
  const downOrGo = (name) => {
    if (name === "Download Results") {
      // 下载当前文件
      btnClickExport(JSON.parse(sessionStorage.getItem("mainPage_fileData")));
      return;
    }
    const anchorElement = document.getElementById(name);
    if (anchorElement) {
      anchorElement.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  };
  // 展开菜单列表
  const showNavigate = () => {
    setNvgList(!nvgList);
  };

  // 回到顶部
  const backTop = () => {
    const anchorElement = document.getElementById("top");
    if (anchorElement) {
      anchorElement.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {/* 设置页面上两个导航控件 */}
      {/* 展开导航列表的控件 */}
      <button
        style={{ display: detailSee }}
        className="navigation"
        onClick={showNavigate}
        id="cnvg"
      >
        <MenuOutlined />
      </button>

      {/* 回到顶部的按钮 */}
      <button
        style={{ display: detailSee }}
        className="backTop"
        onClick={backTop}
      >
        <UpOutlined />
      </button>

      {nvgList === true ? (
        <div className="navigationList" id="nvg">
          {nvgButtonList.map((item) => {
            if (item === "ScrollLp") {
              return (
                <button onClick={downOrGo.bind(this, item)} key={item}>
                  LP
                </button>
              );
            }
            return (
              <button onClick={downOrGo.bind(this, item)} key={item}>
                {item}
              </button>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
