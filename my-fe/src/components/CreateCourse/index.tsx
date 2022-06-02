import { Form, Input } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ICourse, insertCourse } from "../../services/course.service";
import { ButtonStyled } from "../atoms/CourseInfo";

export const ItemStyled = styled(Form.Item)`
  .ant-form-item-label {
    width: 100px;
    text-align: left;
  }
`;
export default function CreateCourse() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    course_name: "",
    course_class_num: "",
    fee: "",
    Link: "",
  });

  const createCourseAsync = async () => {
    setLoading(true);
    try {
      const datas = {
        ...data,
        course_grade: 1,
        course_min_student: 30,
      };
      const res = await insertCourse(datas);
      if (res) {
        toast.success("Create success");
      }
    } catch (error) {
      toast.warning("Create Failed");
    }
    setLoading(false);
  };
  return (
    <div>
      <h1>Create Course</h1>
      <Form>
        <ItemStyled label="Name" name="course_name">
          <Input
            placeholder="course's name "
            onChange={(e) => setData({ ...data, course_name: e.target.value })}
          />
        </ItemStyled>
        <ItemStyled label="Amount Video" name="course_class_num">
          <Input
            placeholder="amount "
            onChange={(e) =>
              setData({ ...data, course_class_num: e.target.value })
            }
          />
        </ItemStyled>
        <ItemStyled label="Price" name="fee">
          <Input
            placeholder="price"
            onChange={(e) => setData({ ...data, fee: e.target.value })}
          />
        </ItemStyled>
        <ItemStyled label="Image Course" name="Link">
          <Input
            placeholder="url"
            onChange={(e) => setData({ ...data, Link: e.target.value })}
          />
        </ItemStyled>
        <div style={{ width: 300, marginLeft: "auto" }}>
          <ButtonStyled loading={loading} onClick={createCourseAsync}>
            Create
          </ButtonStyled>
        </div>
      </Form>
    </div>
  );
}
