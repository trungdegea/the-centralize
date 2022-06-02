import { SearchOutlined } from "@ant-design/icons";
import { Input, Menu, Modal } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../App";
import { teacherGetGo } from "../../services/user.service";
import { toast } from "react-toastify";

export const MenuStyled = styled(Menu)`
  .ant-menu-item,
  .ant-menu-submenu {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 18px;
  }
  .ant-menu-item:nth-child(1) {
    margin-right: auto;
  }
`;
export const InputStyled = styled(Input)`
  margin-top: 10px;
  width: 400px;
  .ant-input-group {
    border: 1px solid #d9d9d9;
    border-radius: 14px;
    padding: 4px;
    .ant-input-group-addon,
    input {
      border: none;
      &:focus,
      &:hover {
        border: none;
        box-shadow: 0 0 0 0 #000;
      }
    }
  }
`;
export default function Header() {
  const { maTk, setMaTk, teacher } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  console.log(maTk);
  const becomeTeacher = async () => {
    try {
      const res = await teacherGetGo();
      console.log(res);
      toast.success("Great! You are a teacher now!");
    } catch (error) {}
  };
  const handleNavigate = (key: string) => {
    switch (key) {
      case "item-1":
        navigate("/");
        break;
      case "item-2":
        console.log("true");
        setVisible(true);
        break;
      case "item-3":
        navigate("/login");
        break;
      case "item-4":
        navigate("/register");
        break;
      case "submenu-item-2":
        setMaTk("");
        navigate("/login");
        break;
      case "submenu-item-1":
        navigate("/profile");
        break;
      case "submenu-item-3":
        navigate("/my-courses");
        break;
      default:
        break;
    }
  };
  const items = maTk
    ? teacher
      ? [
          {
            label: (
              <>
                <img
                  src="https://www.kindpng.com/picc/m/241-2417218_transparent-familia-clipart-centralized-system-logo-png-png.png"
                  width={80}
                  height={80}
                  style={{ marginRight: 5 }}
                />
                <span>THE CENTRALIZE</span>
              </>
            ),
            key: "item-0",
          },
          {
            label: (
              <InputStyled
                addonBefore={<SearchOutlined />}
                placeholder="search course"
              />
            ),
            key: "item-5",
          },
          { label: "HOME", key: "item-1" },

          {
            label: "ACCOUNT",
            key: "submenu",
            children: [
              { label: "PROFILE", key: "submenu-item-1" },
              { label: "MY-COURSES", key: "submenu-item-3" },
              { label: "LOGOUT", key: "submenu-item-2" },
            ],
          },
        ]
      : [
          {
            label: (
              <>
                <img
                  src="https://www.kindpng.com/picc/m/241-2417218_transparent-familia-clipart-centralized-system-logo-png-png.png"
                  width={80}
                  height={80}
                  style={{ marginRight: 5 }}
                />
                <span>THE CENTRALIZE</span>
              </>
            ),
            key: "item-0",
          },
          {
            label: (
              <InputStyled
                addonBefore={<SearchOutlined />}
                placeholder="search course"
              />
            ),
            key: "item-5",
          },
          { label: "HOME", key: "item-1" },
          { label: "BECOME A TEACHER", key: "item-2" },

          {
            label: "ACCOUNT",
            key: "submenu",
            children: [
              { label: "PROFILE", key: "submenu-item-1" },
              { label: "MY-COURSES", key: "submenu-item-3" },
              { label: "LOGOUT", key: "submenu-item-2" },
            ],
          },
        ]
    : [
        {
          label: (
            <>
              <img
                src="https://www.kindpng.com/picc/m/241-2417218_transparent-familia-clipart-centralized-system-logo-png-png.png"
                width={80}
                height={80}
                style={{ marginRight: 5 }}
              />
              <span>THE CENTRALIZE</span>
            </>
          ),
          key: "item-0",
        },
        {
          label: (
            <InputStyled
              addonBefore={<SearchOutlined />}
              placeholder="search course"
            />
          ),
          key: "item-5",
        },
        { label: "HOME", key: "item-1" },
        { label: "BECOME A TEACHER", key: "item-2" },
        { label: "LOGIN", key: "item-3" },
        { label: "REGISTER", key: "item-4" },
      ];
  return (
    <>
      <Modal
        title={"Confirm become a teacher"}
        visible={visible}
        onOk={() => becomeTeacher()}
        onCancel={() => setVisible(false)}
      >
        Are you sure want to become a teacher ?
      </Modal>
      <MenuStyled
        items={items}
        mode="horizontal"
        onClick={(e) => handleNavigate(e.key)}
      />
    </>
  );
}
