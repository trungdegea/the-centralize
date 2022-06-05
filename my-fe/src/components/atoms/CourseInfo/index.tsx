import {
  AccountBookFilled,
  CaretDownOutlined,
  CodeFilled,
  DownloadOutlined,
  ExclamationCircleFilled,
  MobileOutlined,
  ReconciliationTwoTone,
  VideoCameraFilled,
  VideoCameraOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Button, Col, Image, Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Player } from "video-react";
import { getCourseDetail } from "../../../services/course.service";
import { joinCourse } from "../../../services/user.service";

export const LeftInfo = styled(Col)`
  display: flex;
  justify-content: center;
`;

export const Info = styled.div`
  padding: 10px 200px;
`;

export const BestSeller = styled.span`
  background: #eceb98;
  color: #3d3c0a;
  border-radius: 4px;
  padding: 2px 4px;
  margin-right: 10px;
`;

export const Star = styled.span`
  color: yellow;
`;

export const Money = styled.div`
  align-items: center;
  color: #1c1d1f;
  display: flex;
  font-size: 30px;
  font-weight: 600;
`;

export const ButtonStyled = styled(Button)`
  width: 100%;
  background: #a435f0;
  color: #fefef5;
  height: 50px;
`;

export const CourseInclude = styled.div`
  color: #1c1d1f;
  margin: 5px 0;
`;

export const LearnInfo = styled.ul`
  li {
    margin: 8px 0;
  }
`;

export const VideoCourse = styled.div`
  width: 800px;
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

export const Continute = styled(CaretDownOutlined)`
  cursor: pointer;
  font-size: 24px;
`;
export default function CourseInfo() {
  const [player, setPlayer] = useState(false);
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    void (async () => {
      const res = await getCourseDetail({ MaKH: String(id) });
      console.log(res);
    })();
  }, []);

  const handleCheckout = async () => {
    try {
      const res = await joinCourse({ MaKH: String(id) });
      if (res) {
        toast.success("Buy Course Successfully");
        setVisible(false);
      }
    } catch (error) {
      toast.warning("ERROR");
    }
  };
  return (
    <div style={{}}>
      <Row
        style={{
          paddingTop: 10,
          background: "#1c1d1f",
          color: "#fefef5",
          position: "relative",
        }}
      >
        <Info>
          <h1 style={{ color: "#fefef5" }}>
            100 Days of Code: The Complete Python Pro Bootcamp for 2022
          </h1>
          <div>
            Master Python by building 100 projects in 100 days. Learn data
            science, automation, build websites, games and apps!
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
            <BestSeller>Bestseller</BestSeller>{" "}
            <div>
              <Star>4.7 sao</Star>{" "}
              <span
                style={{
                  color: "#5624d0",
                  textDecoration: "underline",
                  opacity: "0.7",
                }}
              >
                (108,085 rating)
              </span>{" "}
              492,717 student
            </div>
          </div>
          <div>
            Create by{" "}
            <span
              style={{
                color: "#5624d0",
                textDecoration: "underline",
              }}
            >
              Dr.Strange
            </span>
          </div>
          <div>12 VIDEO</div>
        </Info>
        <div
          style={{
            position: "absolute",
            background: "#fefef5",
            right: 150,
            top: 50,
            width: 340,
            color: "#fff",
            zIndex: 10,
            boxShadow: "0 1px 8px 0px #000",
          }}
        >
          <video width={"100%"} autoPlay controls>
            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
          </video>
          <div style={{ padding: "10px 20px" }}>
            <Money>140000 VND</Money>
            <ButtonStyled onClick={() => setVisible(true)}>
              BUY NOW
            </ButtonStyled>
            <div style={{ color: "#1c1d1f", textAlign: "center" }}>
              30-Day Money-Back Guarantee
            </div>
            <div>
              <h4>This course includes:</h4>
              <CourseInclude>
                <VideoCameraOutlined /> 60 hours on-demand video
              </CourseInclude>
              <CourseInclude>
                <ExclamationCircleFilled /> 230 articles
              </CourseInclude>
              <CourseInclude>
                <DownloadOutlined /> 128 downloadable resources
              </CourseInclude>
              <CourseInclude>
                <CodeFilled /> 1 coding exercise
              </CourseInclude>
              <CourseInclude>
                <AccountBookFilled /> Full lifetime access
              </CourseInclude>
              <CourseInclude>
                <MobileOutlined /> Access on mobile and TV
              </CourseInclude>
              <CourseInclude>
                <ReconciliationTwoTone /> Certificate of completion
              </CourseInclude>
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <div
          style={{
            paddingLeft: 200,
            width: "100%",
            marginTop: 20,
            marginBottom: 50,
          }}
        >
          <Row style={{ width: 800, border: "1px solid gray", padding: 20 }}>
            <Col sm={24}>
              <h2>What you'll learn</h2>
            </Col>
            <Col sm={12}>
              <LearnInfo>
                <li>
                  You will master the Python programming language by building
                  100 unique projects over 100 days.
                </li>
                <li>You will be able to program in Python professionally</li>
                <li>
                  Create a portfolio of 100 Python projects to apply for
                  developer jobs
                </li>
                <li>
                  Be able to use Python for data science and machine learning
                </li>
                <li>Build GUIs and Desktop applications with Python</li>
              </LearnInfo>
            </Col>
            <Col sm={12}>
              <LearnInfo>
                <li>
                  You will learn automation, game, app and web development, data
                  science and machine learning all using Python.
                </li>
                <li>
                  You will learn Selenium, Beautiful Soup, Request, Flask,
                  Pandas, NumPy, Scikit Learn, Plotly, and Matplotlib.
                </li>
                <li>
                  Be able to build fully fledged websites and web apps with
                  Python
                </li>
                <li>Build games like Blackjack, Pong and Snake using Python</li>
              </LearnInfo>
            </Col>
          </Row>
        </div>
        <div style={{ paddingLeft: 200, width: "100%" }}>
          <h2>Course content</h2>
          <div>
            <VideoCourse>
              <div>
                Video 1 - Beginner - Working with variables in Python to Manage
                data - 30m
              </div>
              <VideoCameraFilled />
            </VideoCourse>
            <VideoCourse>
              <div>
                Video 2 - Beginner - Working with variables in Python to Manage
                data - 30m
              </div>
              <VideoCameraFilled />
            </VideoCourse>
            <VideoCourse>
              <div>
                Video 3 - Beginner - Working with variables in Python to Manage
                data - 30m
              </div>
              <VideoCameraFilled />
            </VideoCourse>
            <VideoCourse>
              <div>
                Video 4 - Beginner - Working with variables in Python to Manage
                data - 30m
              </div>
              <VideoCameraFilled />
            </VideoCourse>
            <VideoCourse>
              <div>
                Video 5 - Beginner - Working with variables in Python to Manage
                data - 30m
              </div>
              <VideoCameraFilled />
            </VideoCourse>
            <VideoCourse>
              <div>
                Video 6 - Beginner - Working with variables in Python to Manage
                data - 30m
              </div>
              <VideoCameraFilled />
            </VideoCourse>
            <div
              style={{ display: "flex", width: 800, justifyContent: "center" }}
            >
              <Continute />
            </div>
          </div>
        </div>
        <div style={{ paddingLeft: 200, width: "100%" }}>
          <h3>Requirements</h3>
          <ul>
            <li>
              No programming experience needed - I'll teach you everything you
              need to know
            </li>
            <li>A Mac or PC computer with access to the internet</li>
            <li>
              No paid software required - I'll teach you how to use PyCharm,
              Jupyter Notebooks and Google Colab
            </li>
            <li>
              I'll walk you through, step-by-step how to get all the software
              installed and set up
            </li>
          </ul>
        </div>
        <div style={{ paddingLeft: 200, width: "100%", marginBottom: 30 }}>
          <h3>Description</h3>
          <div>
            Welcome to the 100 Days of Code - The Complete Python Pro Bootcamp,
            the only course you need to learn to code with Python. With over
            500,000 5 STAR reviews and a 4.8 average, my courses are some of the
            HIGHEST RATED courses in the history of Udemy! 100 days, 1 hour per
            day, learn to build 1 project per day, this is how you master
            Python. At 60+ hours, this Python course is without a doubt the most
            comprehensive Python course available anywhere online. Even if you
            have zero programming experience, this course will take you from
            beginner to professional. Here's why:
          </div>
        </div>
      </Row>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={false}
      >
        <h1>Checkout</h1>
        <h3>Total : 140000 VND</h3>
        <div>Payment Method</div>
        <div>Credit/Debit Card</div>
        <div>
          <WalletOutlined /> Name on card{" "}
          <Image
            width={40}
            height={40}
            src={
              "https://www.udemy.com/staticx/udemy/images/v9/card-mastercard.svg"
            }
          />
          <Image
            width={40}
            height={40}
            src={"https://www.udemy.com/staticx/udemy/images/v9/card-visa.svg"}
          />
        </div>
        <Input placeholder="Name on card" />
        <div>Card number</div>
        <Input placeholder="0000 0000 0000 0000" />
        <Row style={{ marginBottom: 20 }}>
          <Col style={{ marginRight: 10 }}>
            <div>Security Code</div>
            <Input placeholder="Security Code" />
          </Col>
          <Col>
            <div>Expiration Date</div>
            <Input placeholder="MM/YY" />
          </Col>
        </Row>
        <ButtonStyled onClick={handleCheckout}>Complete Checkout</ButtonStyled>
      </Modal>
    </div>
  );
}
