import Api from "./index";

export const getCourses = async (keyword: string = "") => {
  return await Api.post("/find-courses", { keyword });
};

export const registeredCourses = async () => {
  return await Api.get("registered-courses");
};
