import React, { useContext, useEffect } from "react";
import { getListCourseFavor } from "../../services/user.service";
import { Button, Tabs } from "antd";
import Favorite from "../../components/Favorite";
import MyCourses from "../../components/MyCourses";
import styled from "styled-components";
import { UserContext } from "../../App";
import CourseForSell from "../../components/CourseForSell";
import CreateCourse from "../../components/CreateCourse";

const { TabPane } = Tabs;

export const MyCoursesStyled = styled.div`
  padding: 0 1rem;
`;

export default function MyCoursesContainer() {
  const { maTk, setMaTk, teacher } = useContext(UserContext);

  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <MyCoursesStyled>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="My Favorite Courses" key="1">
          <Favorite />
        </TabPane>
        <TabPane tab="My Courses" key="2">
          <MyCourses />
        </TabPane>
        {teacher && (
          <>
            <TabPane tab="Courses For Sell" key="3">
              <CourseForSell />
            </TabPane>
            <TabPane tab="Create Course" key="4">
              <CreateCourse />
            </TabPane>
          </>
        )}
      </Tabs>
    </MyCoursesStyled>
  );
}
