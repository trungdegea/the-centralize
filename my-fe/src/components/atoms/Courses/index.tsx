import {
  CheckOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Col, Row, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCourses } from "../../../services/home.service";
import { EyeOutlinedStyled } from "../AllCourses";
import { HeartOutlinedStyled } from "../BestSales";
const { Meta } = Card;

export const Container = styled.div`
  padding: 10px 3%;
`;

export const CardStyled = styled(Card)`
  transition: all 0.4s;
  margin-bottom: 20px;
  cursor: pointer;
  box-shadow: 0px 0px 4px 0px #32405e;
  &:hover {
    box-shadow: 0px 0px 10px 4px #32405e;
    transform: translate(0, -10px);
  }
  .ant-card-meta-title {
    height: 120px;
    div {
      display: block;
      flex-wrap: wrap;
      white-space: break-spaces;
    }
  }
  .ant-card-meta-description {
    height: 50px;
  }
  .ant-card-actions {
    padding: 0 12px;
  }
`;

export const ButtonStyled = styled(Button)`
  width: 100%;
  background: #b71eb7;
  color: #fefef5;
  &:hover {
    border-color: #b71eb7;
    color: #b71eb7;
  }
`;
const { Countdown } = Statistic;
export const CountdownStyle = styled(Countdown)`
  .ant-statistic-content-value {
    font-size: 1.5em;
  }
`;

export const ViewStyle = styled.div`
  color: #b71eb7;
  text-decoration: underline;
  text-align: right;
  margin-bottom: 50px;
  cursor: pointer;
`;

export default function Courses() {
  const [listSales, setListSales] = useState<any[]>([]);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const res: any = await getCourses();
      console.log(res);
      setListSales(res);
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <h1 style={{ display: "flex", alignItems: "center" }}>Courses</h1>
      <Row>
        {listSales
          .filter((item, idx) => idx < 8)
          .map((item, idx) => (
            <Col sm={12} xl={6} style={{ padding: "0 30px" }}>
              <CardStyled
                style={{ width: 350 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
                    onClick={() => navigate(`/courses/${item?.MaKH}`)}
                  />,
                  <HeartOutlinedStyled
                    style={{
                      width: "100%",
                      height: "32px",
                      display: "flex",
                      justifyContent: "Center",
                      alignItems: "center",
                    }}
                  />,
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
      <ViewStyle onClick={() => navigate("/courses")}>View All</ViewStyle>
    </Container>
  );
}
