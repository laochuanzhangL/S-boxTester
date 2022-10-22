import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, Button, Popconfirm, message } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import httpUtill from "../../../utils/httpUtil";

export default function FileList(props) {
  const setResarray = props.setResArray;
  const [totalPage, setTotalPage] = useState(5);
  const [fileData, setFileData] = useState(null);
  // 获取缓存在本地的文件列表数据
  // const [localRecords, setLocalRecords] = useState(
  //   JSON.parse(localStorage.getItem("fileList_records"))
  // );
  const time = props.time;

  // 用于获取文件列表第一页
  useEffect(() => {
    // console.log(localStorage.getItem("fileList_records"));
    // console.log(localRecords);
    httpUtill.getFileList(1, 5).then((res) => {
      setTotalPage(res.data.total);
      // 将获取到的数据缓存到本地
      // const records = JSON.stringify(res.data.records);
      // localStorage.setItem("fileList_records", [...records]);
      setFileData(res.data.records);
    });
  }, []);

  // 获取指定页的文件
  const getCertentPage = (id) => {
    console.log(localStorage.getItem("fileList_records"));
    message.loading(
      "Loading started! The data is large, please wait a minute ~"
    );
    httpUtill.getFileList(id, 5).then((res) => {
      setTotalPage(res.data.total);
      // const records = JSON.stringify(res.data.records);
      // // 添加进本地的数据
      // localStorage.setItem("fileList_records", [
      //   ...localStorage.getItem("fileList_records"),
      //   ...records,
      // ]);
      setFileData(res.data.records);
    });
  };

  // 删除指定的文件
  const onConfirm = (item) => {
    const destoryLoading = message.loading("Deleting, please wait ~");
    httpUtill.deleteSingleFileData(item.id).then((res) => {
      if (res.data) {
        httpUtill
          .getFileList(1, 5)
          .then((res) => {
            setFileData(res.data.records);
          })
          .finally(() => {
            destoryLoading();
            message.success("Success to delete the file ~");
          });
      } else {
        destoryLoading();
        message.error(
          "The file does not exist or has been deleted, please refresh to check !"
        );
      }
    });
  };

  // 用于更改全局变量mainPage_fileData
  const sendFileData = (item) => {
    const data = JSON.stringify(item.singleTest);
    sessionStorage.setItem("mainPage_fileData", data);
  };

  return (
    <div className="ctn-right-center">
      <div className="list-top">Uploaded file list</div>
      <List
        className="list-show"
        size="large"
        bordered
        dataSource={fileData ? fileData : ""}
        loading={fileData ? false : true}
        pagination={{
          simple: true,
          pageSize: 5,
          total: totalPage,
          onChange: getCertentPage.bind(this),
        }}
        renderItem={(item) => {
          return (
            <List.Item className="list-item">
              <div className="fileName">
                <div className="Span">{item.name}</div>
              </div>
              <div className="file-btn">
                <div className="showData">
                  <Button
                    type="text"
                    block
                    onClick={() => {
                      setResarray(item.data);
                    }}
                  >
                    show
                  </Button>
                </div>
                <div className="showRes">
                  <Link to="/CalPage/Nlr">
                    <Button type="text" onClick={sendFileData.bind(null, item)}>
                      calculate
                    </Button>
                  </Link>
                </div>
                <div className="delete">
                  <Popconfirm
                    title="Are you sure ?"
                    placement="left"
                    onConfirm={onConfirm.bind(null, item)}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Button type="text" block>
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </List.Item>
          );
        }}
      />
      <div className="list-bottom">
        You have {time} calculation opportunities.
      </div>
    </div>
  );
}
