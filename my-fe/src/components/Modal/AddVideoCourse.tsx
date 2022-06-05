import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  AddDetailCourse,
  getCourseDetail,
} from "../../services/course.service";

export const VideoCourse = styled.div`
  width: 100%;
  border: 1px solid gray;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;
  div {
    font-size: 18px;
  }
  span {
    cursor: pointer;
    &:hover {
      svg {
        path {
          fill: #a435f0;
        }
      }
    }
  }
`;

export default function AddVideoCourseModal(props: any) {
  const { visible, onCancel, currentCourse } = props;
  const [data, setData] = useState({ Mota: "", LinkVideo: "" });
  const [listVideo, setListVideo] = useState([]);
  useEffect(() => {
    void (async () => {
      const MaKH = currentCourse;
      const res: any = await getCourseDetail({ MaKH });
      console.log(res);
      setListVideo(res);
    })();
  }, [currentCourse, visible]);
  const handleAddAsync = async () => {
    try {
      const datas = {
        MaKH: currentCourse,
        ...data,
      };
      const res = await AddDetailCourse(datas);
      if (res) {
        toast.success("Add Video Successfully");
        onCancel();
        setData({ Mota: "", LinkVideo: "" });
      }
    } catch (error) {
      console.log(error);
      toast.warning("ERROR");
    }
  };
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Add Video for this course"
      footer={false}
    >
      <div>
        {listVideo?.map((item: any, idx) => (
          <VideoCourse key={idx}>
            <div>{item?.MoTa}</div>
          </VideoCourse>
        ))}
      </div>
      <div>
        <div>Add new Video</div>
        <Input
          placeholder="description"
          onChange={(e) => setData({ ...data, Mota: e.target.value })}
        />
        <Input
          placeholder="Link Video"
          onChange={(e) => setData({ ...data, LinkVideo: e.target.value })}
        />
        <Button onClick={handleAddAsync}>Add</Button>
      </div>
    </Modal>
  );
}
