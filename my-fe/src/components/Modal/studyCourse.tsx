import { StepForwardOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  AddDetailCourse,
  getCourseDetail,
} from "../../services/course.service";

export const ModalStyled = styled(Modal)`
  .ant-modal-content {
    width: 800px;
  }
`;

export const VideoItem = styled.div`
  border: 1px solid gray;
  margin: 10px 0;
  padding: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px 4px #32405e;
  }
`;

export default function StudyCourseModal(props: any) {
  const { visible, onCancel, currentCourse } = props;
  const [listVideo, setListVideo] = useState([]);
  const [url, setUrl] = useState(0);

  useEffect(() => {
    void (async () => {
      const MaKH = currentCourse;
      const res: any = await getCourseDetail({ MaKH });
      console.log(res);
      setListVideo(res);
    })();
  }, [currentCourse, visible]);

  useEffect(() => {}, [currentCourse]);
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Study, study more, study forever"
      footer={false}
    >
      <div>
        <Row style={{ width: "100%" }}></Row>
        <Row style={{ width: "100%" }}>
          <div style={{ padding: "0 10px", marginTop: 30 }}>List Video</div>
          <div style={{ padding: "0 10px" }}>
            {listVideo?.map((item: any, idx) => (
              <>
                <VideoItem
                  onClick={() => {
                    setUrl(idx);
                    console.log("first");
                  }}
                >
                  <StepForwardOutlined style={{ marginRight: 10 }} />
                  {item?.MoTa}
                </VideoItem>
                {url === idx && (
                  <video width={"100%"} autoPlay controls>
                    <source
                      src={"https://media.w3.org/2010/05/sintel/trailer_hd.mp4"}
                    />
                  </video>
                )}
              </>
            ))}
          </div>
        </Row>
      </div>
    </Modal>
  );
}
