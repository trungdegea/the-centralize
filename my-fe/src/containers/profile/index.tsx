import { Button, Col, Image, Input, Modal, Row, Select, Tabs } from "antd";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../App";
import { ButtonStyled } from "../../components/atoms/CourseInfo";

const { TabPane } = Tabs;
const { Option } = Select;

export default function ProfileContainer() {
  const { teacher } = useContext(UserContext);
  const [balance, setBalance] = useState(500000);
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);

  const onCancel = () => setVisible(false);
  const handleOK = () => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
      toast.success("Withdraw successfully");
      setBalance(balance - value);
      onCancel();
    }, 4000);
  };
  return (
    <div>
      <Modal
        confirmLoading={loading}
        title="Withdraw balance"
        visible={visible}
        onCancel={onCancel}
        onOk={handleOK}
      >
        <div>Amount</div>
        <Input
          onChange={(e) => setValue(+e.target.value)}
          placeholder="0.0"
          addonAfter={"VND"}
        />
        <div>Please Provide information about wallet</div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bank" key="1">
            <Select style={{ width: 200 }} defaultValue="1">
              <Option value="1" key="1">
                <Image
                  style={{ width: "auto", height: 32 }}
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Logo_BIDV.svg/1200px-Logo_BIDV.svg.png"
                  }
                />
              </Option>
              <Option value="2" key="2">
                <Image
                  style={{ width: "auto", height: 32 }}
                  src={
                    "https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-Vietcombank.png"
                  }
                />
              </Option>
              <Option value="3" key="3">
                <Image
                  style={{ width: "auto", height: 32 }}
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToorBSw02dSAMNUUUg-E-7lxy8XtR0HhajCQ&usqp=CAU"
                  }
                />
              </Option>
              <Option value="4" key="4">
                <Image
                  style={{ width: "auto", height: 32 }}
                  src={
                    "data:image/png;base64,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"
                  }
                />
              </Option>
              <Option value="5" key="5">
                <Image
                  style={{ width: "auto", height: 32 }}
                  src={
                    "https://inkythuatso.com/uploads/images/2021/11/logo-acb-vector-inkythuatso-01-10-10-25-09.jpg"
                  }
                />
              </Option>
            </Select>
            <div>Số Tài khoản</div>
            <Input placeholder="314..." />
          </TabPane>
          <TabPane tab="Momo" key="2">
            <Image
              src={
                "https://images.careerbuilder.vn/employer_folders/lot9/221789/95340imgpsh_fullsize.jpg"
              }
              style={{ height: 100, width: "auto" }}
            />
            <Input addonBefore={"SDT"} placeholder="09...." />
          </TabPane>
        </Tabs>
      </Modal>
      <Row>
        <Col sm={12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={"https://joeschmoe.io/api/v1/1"} />
          </div>
        </Col>
        <Col sm={12} style={{ marginTop: 50 }}>
          <div style={{ width: 400, marginBottom: 10 }}>
            <div>Name</div>
            <Input placeholder="trung" />
          </div>
          <div style={{ width: 400, marginBottom: 10 }}>
            <div>Email</div>
            <Input placeholder="Email" />
          </div>
          <div style={{ width: 400, marginBottom: 10 }}>
            <div>Phone number</div>
            <Input placeholder="phone number" />
          </div>
          <div style={{ width: 400, marginBottom: 10 }}>
            <div>Birthday</div>
            <Input placeholder="30/03/2000" />
          </div>
          <div style={{ width: 400, marginBottom: 10 }}>
            <ButtonStyled
              onClick={() => toast.success("Update profile successfully")}
            >
              Update
            </ButtonStyled>
          </div>
          {teacher && (
            <div style={{ width: 400 }}>
              <h2>Wallet</h2>
              <h4>Balance: {balance} VND</h4>
              <ButtonStyled onClick={() => setVisible(true)}>
                Withdraw
              </ButtonStyled>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
