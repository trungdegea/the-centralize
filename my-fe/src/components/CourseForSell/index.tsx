import { CheckOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListMyCourses } from "../../services/user.service";
import { CardStyled } from "../atoms/AllCourses";
import { ButtonStyled } from "../atoms/CourseInfo";
import { EyeOutlinedStyled } from "../Favorite";
const { Meta } = Card;

export default function CourseForSell() {
  const [list, setList] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    void (async () => {
      const res: any = await getListMyCourses();
      setList(res);
    })();
  }, []);
  return (
    <div>
      <Row>
        {list.map((item, idx) => (
          <Col sm={12} xl={6}>
            <CardStyled
              style={{ width: 300 }}
              onClick={() => navigate(`/courses/${item?.MaKH}`)}
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
                <ButtonStyled>Buy</ButtonStyled>,
                <EyeOutlinedStyled
                  style={{
                    width: "100%",
                    height: "32px",
                    display: "flex",
                    justifyContent: "Center",
                    alignItems: "center",
                  }}
                />,

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
                      {String(item?.HocPhi * 0.8)?.replace(
                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                        ","
                      )}{" "}
                      VND
                    </div>
                    <div style={{ textDecoration: "line-through" }}>
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
