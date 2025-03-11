import axios from "axios";
import { toast } from "react-toastify";
import { back_base_url } from "../../util/config";
function encrypt(text) {
  return btoa(text);
}
export const getAllCourse = async () => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${back_base_url}api/v1/course`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const setCourseEnroll = async (data) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `${back_base_url}api/v1/users/${data.decryptedId}/enroll`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success(response.data.message);
    setTimeout(() => {
      window.location.href = `/lesson/${encrypt(data.decryptedId)}`;
    }, 2000);
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const setPayment = async (data) => {
  try {
    axios.defaults.withCredentials = true;
    const chapaPayUrl = `${back_base_url}payment/chapa/pay`;
    const body = {
      order_id: data.order_id,
      slug: data.slug,
    };
    axios
      .post(chapaPayUrl, body)
      .then((data) => {
        toast.success("Redirecting to chapa checkout page");
        setTimeout(() => {
          window.open(data.data.url, "_blank");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Error while making a payment with chapa");
      });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const setPaymentSantim = async () => {
  try {
    axios.defaults.withCredentials = true;
    const santimPayUrl =
      "https://girma.letsgotnt.com/payment/santim-pay/pay";
    const body = {
      reason: "Paying to course that this",
      total: 1,
      order_id: 1,
    };
    axios
      .post(santimPayUrl, body)
      .then((data) => {
        toast.success("Redirecting to santim-pay checkout page");
        setTimeout(() => {
          window.location.href = data.data.url;
        }, 2000);
      })
      .catch((error) => {
        toast.error("Error while making a payment with santim pay");
      });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

/*
    Author :  Melak Sisay
    Logic  :  Initiating ArifPay Payment
    Result :  Getting Redirected to arifpay checkout page
  */
// export const handleArifPay = async () => {
//   axios.defaults.withCredentials = true;
//   // Change this url to the deployed url on production
//   const arifPayUrl = back_base_url + "payment/arif-pay/pay";
//   const body = {
//     reason: "Paying to course that this",
//     total: 1,
//     order_id: 1,
//   };
//   await axios
//     .post(arifPayUrl, body)
//     .then((data) => {
//       // Show Toast Message for the user
//       // toast.success("Redirecting to arif-pay checkout page");
//       setTimeout(() => {
//         // Redirect the user to a arif-pay payment checkout
//         window.location.href = data.data.url;
//       }, 2000);
//     })
//     .catch((error) => {
//       // Use a logger method on production to trigger the error happening for the user
//       console.log({ error });
//       // Toast an error message to the user
//       // toast.error("Error while making a payment with arif pay");
//     });
// };

export const updateLessonProgress = async (data) => {
  try {
    axios.defaults.withCredentials = true;
    await axios.put(`${back_base_url}api/v1/users/updatelessonprogress`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const getAllCourseById = async (data) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `${back_base_url}api/v1/course/${data.decodedUserId}/courses`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const setAllCourseById = async (formData) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `${back_base_url}api/v1/course`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success("created course successfully");
    setTimeout(() => {
      if (formData.get("role") === "instructor") {
        window.location.href = `/instructor/add_detail/${response.data._id}`;
      } else {
        window.location.href = `/lms-business/add_detail/${response.data._id}`;
      }
    }, 2000);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
