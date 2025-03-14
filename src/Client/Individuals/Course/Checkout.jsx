import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPayment } from "../../../Store/Hooks/CourseHook";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import chapalogo from "/assets/img/chapa.png";
import arifpay from "/assets/img/arifpay.png";
import axios from "axios";
import { back_base_url } from "../../../util/config";
function decrypt(text) {
  return atob(text);
}
const Checkout = () => {
  const navigate = useNavigate()
  const token = Cookies.get("token");
  let userId;

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  const { slug, id } = useParams();
  const decryptedId = decrypt(slug);
  const dispatch = useDispatch();

  const [filterCourseById, setFilterCourse] = useState([]);
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/course/${decryptedId}`
      );
      setFilterCourse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const orderId = useSelector((state) => state.OrderHook.OutputOrder);

  const chapaHandle = async () => {
    try {
      dispatch(getPayment({ data: { order_id: id } }));
    } catch (error) {
      console.error("Error while getting payment:", error);
    }
  };

  // const santimHandle = () => {
  //   dispatch(getPaymentWithSantim());
  // };
  const handleArifPay = async () => {
    try {
        axios.defaults.withCredentials = true;
        const arifPayUrl = `${back_base_url}payment/arif-pay/pay`;
        const body = {
            order_id: id,
            cancelUrl: `https://e-learning-nine-gold.vercel.app/CourseDetail/${slug}`,
            errorUrl: `https://e-learning-nine-gold.vercel.app/CourseDetail/${slug}`,
            notifyUrl: `${back_base_url}`,
            successUrl: `https://e-learning-nine-gold.vercel.app/lesson/${slug}`,
            items: [
                {
                    name: filterCourseById?.courseName,
                    price: filterCourseById?.price,
                    PhoneNumber: filterCourseById?.PhoneNumber,
                    quantity: 1,
                },
            ],
        };
        const response = await axios.post(arifPayUrl, body);
        console.log(response);
        toast.success("Redirecting to Arif Pay checkout page ");
        setTimeout(() => {
          navigate(response.data.url);
        }, 2000);
    } catch (error) {
        console.error("Error in handleArifPay:", error);
        toast.error("Error while making a payment with Arif Pay ");
    }
};


  return (
    <div className="checkoutarea sp_bottom_100 sp_top_100">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="checkoutarea__billing">
              <div className="checkoutarea__billing__heading">
                <h2>Course Details</h2>
              </div>
              <div className="checkoutarea__billing__form">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="checkoutarea__inputbox d-flex gap-2">
                      <strong>Course Name : </strong>
                      <span>{filterCourseById?.courseName}</span>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="checkoutarea__inputbox d-flex gap-2">
                      <strong>Number of Review : </strong>
                      <span>{filterCourseById?.numOfReviews}</span>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="checkoutarea__inputbox d-flex gap-2">
                      <strong>Price : </strong>
                      <span>{filterCourseById?.price} ETB</span>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="checkoutarea__inputbox d-flex gap-2">
                      <strong>Course Duration : </strong>
                      <span>{filterCourseById?.courseDuration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-12">
            <div className="checkoutarea__payment__wraper">
              <div className="checkoutarea__total">
                <h3>Your order</h3>
                <form method="post">
                  <div className="checkoutarea__table__wraper">
                    <table className="checkoutarea__table">
                      <thead>
                        <tr className="checkoutarea__item">
                          <td className="checkoutarea__ctg__type"> Product</td>
                          <td className="checkoutarea__cgt__des"> 1</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="checkoutarea__item prd-name">
                          <td className="checkoutarea__ctg__type">
                            {" "}
                            Product Title × <span>1</span>
                          </td>
                          <td className="checkoutarea__cgt__des">
                            {" "}
                            {filterCourseById?.price} ETB
                          </td>
                        </tr>
                        <tr className="checkoutarea__item">
                          <td className="checkoutarea__ctg__type"> Subtotal</td>
                          <td className="checkoutarea__cgt__des">0.00</td>
                        </tr>
                        <tr className="checkoutarea__item">
                          <td className="checkoutarea__itemcrt-total">
                            {" "}
                            Total
                          </td>
                          <td className="checkoutarea__cgt__des prc-total">
                            {" "}
                            {filterCourseById?.price} ETB
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
                <div className="header__bottom-right pl-30 ">
                  <div className="header__search w-100  d-xl-block pb-2">
                    <NavLink
                      className="tg-button-wrap btn "
                      style={{
                        backgroundColor: "#0D1B34",
                        color: "#FFFFFF",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                      onClick={() => 
                        chapaHandle
                      }
                    >
                      <img
                        src={chapalogo}
                        alt="chapa logo"
                        style={{ width: "50px" }}
                      />
                      <span className="text">Pay with CHAPA</span>
                    </NavLink>
                  </div>
                  {/* <div className="header__search w-100  d-xl-block pb-2">
                    <NavLink
                      className="tg-button-wrap btn "
                      style={{
                        backgroundColor: "#0D1B34",
                        color: "#FFFFFF",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "2rem",
                      }}
                      onClick={() => handleArifPay()}
                    >
                      <img
                        src={arifpay}
                        alt="arifpay logo"
                        style={{ width: "30px" }}
                      />
                      <span className="text"> Arif Pay</span>
                    </NavLink>
                  </div> */}
                  {/* <div className="header__search w-100  d-xl-block">
                    <NavLink
                      style={{
                        backgroundColor: "#D3AF35",
                        color: "#FFFFFF",
                        width: "100%",
                      }}
                      className="tg-button-wrap btn "
                      onClick={() => santimHandle()}
                    >
                      <span className="text">Pay with SANTIMPAY</span>
                    </NavLink>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
