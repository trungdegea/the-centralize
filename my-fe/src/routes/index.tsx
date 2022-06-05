import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import CourseInfoContainer from "../containers/courseInfo";
import CoursesContainer from "../containers/courses";
import EditCourseContainer from "../containers/EditCourse";
import HomeContainer from "../containers/home";
import LoginContainer from "../containers/login";
import MyCoursesContainer from "../containers/my-courses";
import ProfileContainer from "../containers/profile";
import RegisterContainer from "../containers/register";
import SearchCoursesContainer from "../containers/search-courses";

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Header />
      <Routes>
        <Route path="/courses" element={<CoursesContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/courses/:id" element={<CourseInfoContainer />} />
        <Route
          path="/courses/search/:keyword"
          element={<SearchCoursesContainer />}
        />
        <Route path="/profile" element={<ProfileContainer />} />
        <Route path="/my-courses" element={<MyCoursesContainer />} />
        <Route path="/course-for-sell/:id" element={<MyCoursesContainer />} />
        <Route
          path="/course-for-sell/edit/:id"
          element={<EditCourseContainer />}
        />
        <Route path="/" element={<HomeContainer />} />
      </Routes>
    </Suspense>
  );
};
