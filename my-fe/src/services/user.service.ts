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

export interface IEditCouse {
  TenKhoaHoc: string;
  HocPhi: string;
  SoBuoiDuKien: string;
  Link: string;
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

export const getListCoursesForSell = async () => {
  return await Api.get("/my-courses");
};

export const getListMyCourses = async () => {
  return await Api.get("/registered-courses");
};

function formatDate(date: any) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
export const teacherGetGo = async () => {
  return await Api.post("/become-teacher", {
    cert_name: "Get gooo",
    cert_recv_date: formatDate("Sun May 11,2014"),
    cert_provider: "lorem isum",
  });
};

export const joinCourse = async (data: IFaver) => {
  return await Api.post("/join-course", data);
};

export const updateCourse = async (data: IEditCouse) => {
  return await Api.post("/update-course", data);
};
