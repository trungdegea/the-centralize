import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getListCoursesForSell,
  getListMyCourses,
} from "../../services/user.service";
import { CardStyled } from "../atoms/AllCourses";
import { ButtonStyled } from "../atoms/CourseInfo";
import { EyeOutlinedStyled } from "../Favorite";
import AddVideoCourseModal from "../Modal/AddVideoCourse";
const { Meta } = Card;
export const EditOutlinedStyled = styled(EditOutlined)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  margin-top: 10px;
  svg {
    fill: #b71eb7;
    width: 30px;
    height: 30px;
  }
`;
export default function CourseForSell() {
  const [list, setList] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [currentCourse, setCurrentCourse] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    void (async () => {
      const res: any = await getListCoursesForSell();
      if (res) {
        setList(res);
      }
    })();
  }, []);

  const handleAddVideo = (MaKH: string) => {
    setCurrentCourse(MaKH);
    setVisible(true);
  };

  const handleEdit = (MaKH: string) => {
    navigate(`/course-for-sell/edit/${MaKH}`);
  };
  return (
    <div>
      <Row>
        <AddVideoCourseModal
          visible={visible}
          onCancel={() => setVisible(false)}
          currentCourse={currentCourse}
        />
        {list.map((item, idx) => (
          <Col sm={12} xl={6}>
            <CardStyled
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  style={{ height: 225 }}
                  src={
                    item?.Link
                      ? item.Link
                      : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  }
                />
              }
              actions={[
                <ButtonStyled onClick={() => handleAddVideo(item?.MaKH)}>
                  Add Video
                </ButtonStyled>,
                <EyeOutlinedStyled
                  style={{
                    width: "100%",
                    height: "32px",
                    display: "flex",
                    justifyContent: "Center",
                    alignItems: "center",
                  }}
                  onClick={() => navigate(`/courses/${item?.MaKH}`)}
                />,
                <EditOutlinedStyled onClick={() => handleEdit(item?.MaKH)} />,

                // <CheckOutlined
                //   onClick={() => favorCourseAsync(item?.MaKH)}
                //   style={{
                //     width: "100%",
                //     height: "32px",
                //     display: "flex",
                //     justifyContent: "Center",
                //     alignItems: "center",
                //   }}
                // />,
                // <EditOutlined key="edit" />,
              ]}
            >
              <Meta
                avatar={<Avatar src={`https://joeschmoe.io/api/v1/${idx}`} />}
                title={
                  <>
                    <div>{item?.TenKhoaHoc}</div>
                    <div>
                      {String(item?.HocPhi)?.replace(
                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                        ","
                      )}{" "}
                      VND
                    </div>

                    <div>{item?.SoBuoiDuKien} VIDEO</div>
                  </>
                }
                description={`This Course teach about ${item?.TenKhoaHoc}`}
              />
            </CardStyled>
          </Col>
        ))}
      </Row>
    </div>
  );
}
