import React, { useContext, useEffect } from "react";
import { getListCourseFavor } from "../../services/user.service";
import { Button, Tabs } from "antd";
import Favorite from "../../components/Favorite";
import MyCourses from "../../components/MyCourses";
import styled from "styled-components";
import { UserContext } from "../../App";
import CourseForSell from "../../components/CourseForSell";
import CreateCourse from "../../components/CreateCourse";
import EditCourse from "../../components/EditCourse";

const { TabPane } = Tabs;

export const MyCoursesStyled = styled.div`
  padding: 0 1rem;
`;

export default function EditCourseContainer() {
  const { maTk, setMaTk, teacher } = useContext(UserContext);

  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <MyCoursesStyled>
      <EditCourse />
    </MyCoursesStyled>
  );
}
