import React, { useEffect, Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Divider, Button, Upload, message, Popconfirm } from "antd";
import { StarOutlined, UploadOutlined } from "@ant-design/icons";
import cookies from "react-cookies"

// 自己的组件
import httpUtill from "../../../utils/httpUtil";
import "./index.scss";
import Table from "./table";
import FileList from "./fileList";

export default function UploadAndShow() {
  const [user, setUser] = useState(null);
  const [File, setFile] = useState(false);
  const [resArray, setResArray] = useState([]);

  // 用于判断是否登录
  useEffect(() => {
    // 获取登录状态
    httpUtill.getRegisterStatus().then((res) => {
      if (res.data) {
        setUser(res.data);
      }
    });
  }, []);

  // 用于判断上传文件状态
  const Props = {
    onChange({ file }) {
      if (file.status !== "uploading") {
        message.success("success to uploade your file");
        setFile(file.originFileObj);
      }
    },
  };
  // 用于上传文件
  const uploadFile = () => {
    if (!File) {
      message.warn("Please add file first !");
      return;
    }
    message.success("start to get data array ~");
    const formdata = new FormData();
    formdata.append("file", File);
    httpUtill.getFileArray(formdata).then((res) => {
      console.log(res);
      setResArray(res.data);
      message.success("get array successfully !");
    });
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
              <Button className="scan-import3" type="primary">
                Check the real vent
              </Button>
            </div>
          </div>
        </div>

        <Divider />

        {/* 展示表格 */}
        <div className="content">
          <div className="content-left">{<Table data={resArray} />}</div>
          <div className="content-right">
            {<FileList setResArray={setResArray} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
