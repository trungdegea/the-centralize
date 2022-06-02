import Api from "./index";

interface ICourseDetail {
  MaKH: string;
}

export interface ICourse {
  course_name: string;
  course_grade: number;
  course_class_num: string;
  course_min_student: number;
  fee: string;
  Link: string;
}

export const getCourseDetail = async (data: ICourseDetail) => {
  return await Api.post("/course-detail", data);
};

export const insertCourse = async (data: ICourse) => {
  return await Api.post("/insert-course", data);
};
