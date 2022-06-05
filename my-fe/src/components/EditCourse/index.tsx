import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ICourse, insertCourse } from "../../services/course.service";
import {
  getListCoursesForSell,
  IEditCouse,
  updateCourse,
} from "../../services/user.service";
import { ButtonStyled } from "../atoms/CourseInfo";

export const ItemStyled = styled(Form.Item)`
  .ant-form-item-label {
    width: 100px;
    text-align: left;
  }
`;
export default function EditCourse() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<IEditCouse>({
    TenKhoaHoc: "",
    SoBuoiDuKien: "",
    HocPhi: "",
    Link: "",
    MaKH: "",
  });
  const param = useParams();
  console.log(param);
  useEffect(() => {
    void (async () => {
      const res: any = await getListCoursesForSell();
      if (res) {
        const course = res?.filter((item: any) => item.MaKH == param.id);
        console.log(course);
        setData({
          ...data,
          TenKhoaHoc: course[0].TenKhoaHoc,
          SoBuoiDuKien: course[0].SoBuoiDuKien,
          HocPhi: course[0].HocPhi,
          Link: course[0].Link,
          MaKH: course[0].MaKH,
        });
      }
    })();
  }, [param]);
  console.log(data);
  const EditCourseAsync = async () => {
    setLoading(true);
    try {
      const datas = {
        ...data,
        course_grade: 1,
        course_min_student: 30,
      };
      const res = await updateCourse(datas);
      if (res) {
        toast.success("Edit success");
        navigate("/my-courses");
      }
    } catch (error) {
      toast.warning("Edit Failed");
    }
    setLoading(false);
  };
  return (
    <div>
      <h1>Edit Course</h1>
      <Form>
        <ItemStyled label="Name" name="TenKhoaHoc">
          <Input
            placeholder={data.TenKhoaHoc}
            onChange={(e) => setData({ ...data, TenKhoaHoc: e.target.value })}
          />
        </ItemStyled>
        <ItemStyled label="Amount Video" name="SoBuoiDuKien">
          <Input
            placeholder={data.SoBuoiDuKien}
            onChange={(e) => setData({ ...data, SoBuoiDuKien: e.target.value })}
          />
        </ItemStyled>
        <ItemStyled label="Price" name="HocPhi">
          <Input
            placeholder={data.HocPhi}
            onChange={(e) => setData({ ...data, HocPhi: e.target.value })}
          />
        </ItemStyled>
        <ItemStyled label="Image Course" name="Link">
          <Input
            placeholder={data.Link}
            onChange={(e) => setData({ ...data, Link: e.target.value })}
          />
        </ItemStyled>
        <div style={{ width: 300, marginLeft: "auto" }}>
          <ButtonStyled loading={loading} onClick={EditCourseAsync}>
            Edit
          </ButtonStyled>
        </div>
      </Form>
    </div>
  );
}
