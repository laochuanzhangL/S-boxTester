import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, Button, Popconfirm, message } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import httpUtill from "../../../utils/httpUtil";

export default function  FileList(props) {
  const token = props.token;
  const setResarray = props.setResArray;
  const [fileData, setFileData] = useState(null);
  const [time, setTime] = useState(50);

  // 用于获取文件列表
  useEffect(() => {
    httpUtill.getFileList(1, 5, token).then((res) => {
        // console.log(res.data.records);
      setFileData(res.data.records);
    });
    httpUtill.getRegisterStatus(token).then((res) => {
      setTime(res.data.times);
    });
  }, []);

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
                  <Link to="/CalPage" state={item.singleTest}>
                    calculate
                  </Link>
                </div>
                <div className="delete">
                  <Popconfirm
                    title="Are you sure？"
                    placement="left"
                    onConfirm={() => {
                      console.log(item.id);
                      httpUtill
                        .deleteSingleFileData(item.id, token)
                        .then((res) => {
                          console.log(res);
                          if (res.data) {
                            message.success(
                              "Success to delete the file, please refresh to get new list~"
                            );
                          } else {
                            message.error(
                              "The file does not exist or has been deleted, please refresh to check !"
                            );
                          }
                        });
                    }}
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
