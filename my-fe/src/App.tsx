import React, { createContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { AppRouter } from "./routes";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";
const appCtxDefaultValue = {
  maTk: "",
  teacher: "",
  setMaTk: (state: string) => {}, // noop default callback
  setTeacher: (state: string) => {}, // noop default callback
};
export const UserContext = createContext(appCtxDefaultValue);
function App() {
  const [maTk, setMaTk] = useState<string>(appCtxDefaultValue.maTk);
  const [teacher, setTeacher] = useState<string>(appCtxDefaultValue.teacher);
  return (
    <UserContext.Provider value={{ maTk, teacher, setMaTk, setTeacher }}>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
