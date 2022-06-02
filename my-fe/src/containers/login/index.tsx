import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UserContext } from "../../App";
import { loginAsync } from "../../services/user.service";

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
  height: 350px;
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
export default function LoginContainer() {
  const { setTeacher } = useContext(UserContext);
  const [info, setInfo] = useState({ username: "", password: "" });
  const { maTk, setMaTk } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res: any = await loginAsync(info);
      setMaTk(res.maTk.MaTK);
      setTeacher(res?.maTk?.MaGV);
      navigate("/");
      toast.success("Login Successfully");
    } catch (error) {
      console.log(error);
      toast.success("Login Error");
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
          <Title className="text-center">ACCOUNT LOGIN</Title>
          <InputStyled
            addonBefore={<UserOutlined />}
            placeholder="User Name"
            onChange={(e) => setInfo({ ...info, username: e.target.value })}
          />
          <InputStyled
            addonBefore={<UnlockOutlined />}
            type="password"
            placeholder="Password"
            onChange={(e) => setInfo({ ...info, password: e.target.value })}
          />
          <ForgotPass>Forgot password?</ForgotPass>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonStyled onClick={handleLogin}>Login</ButtonStyled>
          </div>
          <HaveAccount>
            Don't Have Account ?{" "}
            <Link
              style={{ color: "#870daf", fontWeight: 600, fontSize: 16 }}
              to={"/register"}
            >
              Register
            </Link>
          </HaveAccount>
        </WrapperForm>
      </Row>
    </ContainerLogin>
  );
}
