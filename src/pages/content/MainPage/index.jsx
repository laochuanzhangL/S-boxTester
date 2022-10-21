import React, { useEffect, Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Divider, Button, Upload, message, Popconfirm } from "antd";
import { StarOutlined, UploadOutlined } from "@ant-design/icons";
import cookies from "react-cookies";

// 自己的组件
import httpUtill from "../../../utils/httpUtil";
import "./index.scss";
import Table from "./table";
import FileList from "./fileList";

export default function UploadAndShow() {
  const [user, setUser] = useState(null);
  const [File, setFile] = useState(false);
  const [resArray, setResArray] = useState([]);
  const [time, setTime] = useState(50);
  const [fileData, setFileData] = useState(null);

  // 用于判断是否登录
  useEffect(() => {
    // 获取登录状态
    httpUtill.getRegisterStatus().then((res) => {
      if (res.data) {
        setUser(res.data);
        setTime(res.data.times);
      }
    });
  }, []);

  // 用于判断上传文件状态
  const Props = {
    onChange({ file }) {
      if (file.status !== "uploading") {
        message.success("success to add your file");
        setFile(file.originFileObj);
      }
      const formdata = new FormData();
    formdata.append("file", File);
      httpUtill.getFileArray(formdata).then((res) => {
        setResArray(res.data);
        // 用于更改上传计算次数
        httpUtill.getRegisterStatus().then((res) => {
          if (res.data) {
            setTime(res.data.times);
          }
        });
        const data = res.data;
        message.loading("Start to get the calculate result, please wait a minute ~");
        // 获取单次计算结果
        httpUtill.getSingleRes({ data: data }).then((res) => {
          const data = JSON.stringify(res.data)
          sessionStorage.setItem("mainPage_fileData", data);
          setFileData(res.data);
          message.success("Successfully to get the calculate result ~");
        });
        setFile(null);
      });
    },
  };
  // 用于上传文件
  const uploadFile = () => {
    if (!File) {
      message.warn("Please upload your file first !");
      return;
    }
    message.warn("Start to get the array of data and calculate result~");
    const formdata = new FormData();
    formdata.append("file", File);
    httpUtill.getFileArray(formdata).then((res) => {
      setResArray(res.data);
      // 用于更改上传计算次数
      httpUtill.getRegisterStatus().then((res) => {
        if (res.data) {
          setTime(res.data.times);
        }
      });
      const data = res.data;
      message.loading("Start to get the calculate result, please wait a minute ~");
      // 获取单次计算结果
      httpUtill.getSingleRes({ data: data }).then((res) => {
        const data = JSON.stringify(res.data)
        sessionStorage.setItem("mainPage_fileData", data);
        setFileData(res.data);
        message.success("Successfully to get the calculate result ~");
      });
      setFile(null);
    });
  };
  // 用于取消上传文件
  const cancelUpload = () => {
    setFile(null);
  };

  // 用于单次计算按钮
  const Calculate = () => {
    if (!fileData) {
      message.warn(
        "You currently do not have any files that can be calculated"
      );
      return;
    }
  };

  // 用于控制用户退出登录的函数
  const forExit = () => {
    httpUtill.checkLogout();
  };

  // 如果未登录跳转至登录界面
  if (!cookies.load("token")) {
    return <Navigate to="/Login" />;
  }

  return (
    <Fragment>
      <div className="uploadShow">
        {/* 展示名称，跳转登录和退出登录 */}
        <div className="header">
          <div className="showName">
            Welcom back,&nbsp;&nbsp;
            {user ? user.firstName + user.lastName : "jiejie"}
          </div>
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
          <div className="title"> System used to calculate passwords </div>
          <div className="controlElement">
            <div className="cle-left">
              <Upload
                {...Props}
                className="scan-import1"
                maxCount={1}
                showUploadList={false}
              >
                {File ? (
                  <Button
                    icon={<StarOutlined />}
                    block
                    className="cle-left-btn"
                  >
                    Upload File Sucess
                  </Button>
                ) : (
                  <Button
                    icon={<UploadOutlined />}
                    block
                    className="cle-left-btn"
                  >
                    Upload File
                  </Button>
                )}
              </Upload>
              <div className="scan-import2">
                <Popconfirm
                  placement="bottom"
                  id="upload"
                  title={
                    "This will cost a chance to calculate, sure to calculate ?"
                  }
                  onConfirm={uploadFile}
                  onCancel={cancelUpload}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button className="cle-left-btn" type="primary">
                    Confirm
                  </Button>
                </Popconfirm>
              </div>
            </div>
            <div className="cle-right">
              {fileData ? (
                <Link
                  to="/CalPage/Bic"
                  className="scan-import3"
                >
                  <Button type="primary" className="btn" onClick={Calculate}>
                    Get the result of this file
                  </Button>
                </Link>
              ) : (
                <Link className="scan-import3" state={fileData}>
                  <Button type="primary" className="btn" onClick={Calculate}>
                    Get the result of this file
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <Divider />

        {/* 展示表格 */}
        <div className="content">
          <div className="content-left">{<Table data={resArray} />}</div>
          <div className="content-right">
            {<FileList setResArray={setResArray} time={time} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
