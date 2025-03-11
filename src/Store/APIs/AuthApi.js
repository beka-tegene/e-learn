// https://lms-api.purposeblacketh.com
// https://back.letsgotnt.com
import axios from "axios";
import { toast } from "react-toastify";
import { setLogin, setLoginData } from "../Hooks/AuthHook";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { back_base_url } from "../../util/config";

export const Login = async (data) => {
  try {
    axios.defaults.withCredentials = true;
    setLogin();
    const response = await axios.post(
      `${back_base_url}api/v1/auth/login`,
      data
    );
    if (response.status === 400) {
      toast.error(response.data.message);
    }
    if (response.status === 200) {
      const token = response.data.token;
      const decodedToken = jwt_decode(token);
      const role = decodedToken.role;
      if (role === "user") {
        Cookies.set("token", response.data.token);
        const attemptedUrl = localStorage.getItem("attemptedUrl");
        window.location.href = attemptedUrl || "/";
        localStorage.removeItem("attemptedUrl");
      } else if (role === "instructor") {
        if (decodedToken?.status === "Approved") {
          Cookies.set("token", response.data.token);
          window.location.href = "/instructor/dashboard";
        } else {
          window.location.href = "/process";
        }
      } else if (role === "company_owner") {
        Cookies.set("token", response.data.token);
        window.location.href = "/lms-business/course-browser";
      } else if (role === "admin") {
        Cookies.set("token", response.data.token);
        window.location.href = "/admin/dashboard";
      } else if (role === "tutorinstructor") {
        if (decodedToken?.status === "Approved") {
          Cookies.set("token", response.data.token);
          window.location.href = "/tutor/dashboard";
        } else {
          window.location.href = "/process";
        }
      } else {
        window.location.reload(true);
      }
    }
    setLoginData();
  } catch (error) {
    toast.error(error.response.data.error);
    toast.error(error.response.data.message);
    setLoginData();
  }
};


export const StudentRegister = async (data) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `${back_base_url}api/v1/auth/reguser`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 400) {
      toast.error(response.data.message);
    }
    if (response.status === 201) {
      window.location.href = "/accounts/login";
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const InstructorRegister = async (data) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `${back_base_url}api/v1/auth/registerinsructor`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 400) {
      toast.error(response.data.message);
    }
    if (response.status === 201) {
      window.location.href = "/accounts/login";
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
