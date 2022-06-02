import {
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerAsync } from "../../services/user.service";

export const ContainerLogin = styled.div<{ bgImg: string }>`
  background: url(${(p) => p.bgImg});
  height: 91vh;
  background-size: 100% 120%;
  position: relative;
`;

export const WrapperForm = styled.div`
  position: absolute;
  left: 35%;
  top: 20vh;
  background: transparent;
  box-shadow: 0px 0px 10px 4px #b4c6eb;
  padding: 20px;
  border-radius: 14px;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;
export const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  color: #fefef5;
`;

export const InputStyled = styled(Input)`
  margin-bottom: 10px;
  height: 40px;
  width: 400px;
  padding: 0 20px;
  .ant-input-wrapper {
    box-shadow: 0px 0px 4px 2px #b4c6eb;
    border-radius: 14px;

    background: transparent;
    .ant-input-group-addon {
      background: transparent;
      border: none;
      svg {
        fill: #fefef5;
      }
    }
    input {
      border: none;
      background: transparent;
      height: 40px;
      color: #fefef5;
      font-size: 20px;
      &:focus {
        border: none;
      }
    }
  }
`;

export const ButtonStyled = styled(Button)`
  margin-top: 20px;
  dont-size: 24px;
  border-radius: 4px;
  height: 40px;
  width: 100px;
  background: transparent;
  box-shadow: 0px 0px 4px 2px #b4c6eb;
  color: #fefef5;
  border: none;
  &:hover,
  &:focus {
    color: #fefef5;
    border: none;
    background: transparent;
  }
`;

export const ForgotPass = styled.div`
  padding: 5px 20px;
  color: #fefef5;
  text-align: right;
  font-size: 16px;
  cursor: pointer;
`;
export const HaveAccount = styled.div`
  padding: 5px 20px;
  color: #fefef5;
  text-align: center;
  font-size: 16px;
`;
export default function RegisterContainer() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    phonenumber: "",
    birthday: "",
  });
  const handleRegister = async () => {
    try {
      const res: any = await registerAsync(info);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ContainerLogin
      bgImg={
        "https://res.cloudinary.com/practicaldev/image/fetch/s--_MCEk7P6--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/vm957e5dm3hxnwc94dd7.jpg"
      }
    >
      <Row>
        <WrapperForm>
          <Title className="text-center">ACCOUNT REGISTER</Title>
          <InputStyled
            onChange={(e) => setInfo({ ...info, username: e.target.value })}
            addonBefore={<UserOutlined />}
            placeholder="User Name"
          />
          <InputStyled
            onChange={(e) => setInfo({ ...info, password: e.target.value })}
            addonBefore={<UnlockOutlined />}
            type="password"
            placeholder="Password"
          />
          <InputStyled
            addonBefore={<UnlockOutlined />}
            type="password"
            placeholder="Confirm Password"
          />
          <InputStyled
            onChange={(e) => setInfo({ ...info, fullname: e.target.value })}
            addonBefore={<MailOutlined />}
            type=""
            placeholder="Name"
          />
          <InputStyled
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            addonBefore={<MailOutlined />}
            type=""
            placeholder="Email"
          />
          <InputStyled
            onChange={(e) => setInfo({ ...info, phonenumber: e.target.value })}
            addonBefore={<PhoneOutlined />}
            type=""
            placeholder="Phone Number"
          />
          <InputStyled
            onChange={(e) => setInfo({ ...info, birthday: e.target.value })}
            addonBefore={<CalendarOutlined />}
            type=""
            placeholder="Date of birth"
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonStyled onClick={handleRegister}>Register</ButtonStyled>
          </div>
          <HaveAccount>
            Have Account ?{" "}
            <Link
              style={{ color: "#870daf", fontWeight: 600, fontSize: 16 }}
              to={"/login"}
            >
              Login
            </Link>
          </HaveAccount>
        </WrapperForm>
      </Row>
    </ContainerLogin>
  );
}
