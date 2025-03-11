import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { back_base_url } from "../../util/config";
export const createOrderId = async (data) => {
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  try {
    axios.defaults.withCredentials = true;
    const createOrder = `${back_base_url}api/v1/orders`;
    const body = {
      items: [
        {
          product: data,
        },
      ],
      userId,
    };
    const response = await axios.post(createOrder, body);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
