import Api from "./index";
interface ILogin {
  username: string;
  password: string;
}
interface IRegister {
  username: string;
  password: string;
  fullname: string;
  birthday: string;
  email: string;
  phonenumber: string;
}

interface IFaver {
  MaKH: string;
}

export const loginAsync = async (data: ILogin) => {
  return await Api.post("/login", data);
};

export const registerAsync = async (data: IRegister) => {
  return await Api.post("/signup", data);
};

export const favorCourse = async (data: IFaver) => {
  return await Api.post("/favor", data);
};

export const getListCourseFavor = async () => {
  return await Api.get("/favor-list");
};

export const getListMyCourses = async () => {
  return await Api.get("/registered-courses");
};

export const teacherGetGo = async () => {
  return await Api.post("/become-teacher", {
    cert_name: "Get gooo",
    cert_recv_date: "03/30/2018",
    cert_provider: "lorem isum",
  });
};

export const joinCourse = async (data: IFaver) => {
  return await Api.post("/join-course-class", data);
};
