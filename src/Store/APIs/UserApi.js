import axios from "axios";
import { toast } from "react-toastify";
import { back_base_url } from "../../util/config";

export const getAllUser = async (data) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `${back_base_url}api/v1/users/getuserById/${data.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
    throw error;
  }
};

export const getAllUserCourse = async (data) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `${back_base_url}api/v1/users/enrolled-courses/${data.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
    throw error;
  }
};

export const getAllUserCourseById = async (data) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `${back_base_url}api/v1/users/courses/${data.courseId}`, 
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
    throw error;
  }
};

export const getAllUserInstructor = async () => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `${back_base_url}api/v1/auth/instructors`
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
