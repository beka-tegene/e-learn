import { useEffect, useState } from "react";
import defaultImage from "/assets/img/default-course-thumbnail.png";
import { Avatar, Skeleton } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { back_base_url } from "../../../util/config";

function encrypt(text) {
  return btoa(text);
}

const PopularCourses = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${back_base_url}api/v1/course`, {
        params: {
          limit: 8,
          status: "Approved",
        },
      });
      setCourse(response.data.courses);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <section className="course__area grey-bg-4 pt-110 pb-90">
      <div className="container" style={{ marginBottom: "5rem" }}>
        <div className="row">
          <div className="col-xxl-12">
            <div className="section__title-wrapper-2 text-center mb-40">
              <span className="section__title-pre-2">Categories</span>
              <h3 className="section__title-2">Latest Courses</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xxl-12">
            <div
              className="tab-content course__tab-content"
              id="course-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="nav-all"
                role="tabpanel"
                aria-labelledby="nav-all-tab"
              >
                <div className="course__tab-wrapper">
                  <div className="row  justify-content-start">
                    {loading ? (
                      Array.from({ length: 6 }).map((_, index) => (
                        <div
                          className="col-xxl-4 col-xl-4 col-lg-4 col-md-6"
                          key={index}
                        >
                          <div className="course__item-2 transition-3 white-bg mb-30 fix">
                            <Skeleton
                              variant="rectangular"
                              width={"100%"}
                              height={160}
                            />
                            <div className="course__content-2">
                              <h3 className="course__title-2">
                                <Skeleton height={30} width={"100%"} />
                                <Skeleton height={30} width={"50%"} />
                              </h3>
                              <Skeleton height={20} width={"100%"} />
                              <Skeleton height={20} width={"100%"} />
                              <Skeleton height={20} width={"40%"} />
                              <div className="course__top-2 d-flex align-items-center justify-content-between">
                                <div className="course__tag-2">
                                  <Skeleton height={30} width={90} />
                                </div>
                                <div className="course__price-2">
                                  <Skeleton height={20} width={40} />
                                </div>
                              </div>
                              <div className="course__bottom-2 d-flex align-items-center justify-content-between">
                                <div className="course__action">
                                  <ul>
                                    <li>
                                      <Skeleton height={20} width={40} />
                                    </li>
                                    <li>
                                      <Skeleton height={20} width={40} />
                                    </li>
                                  </ul>
                                </div>
                                <div className="course__tutor-2">
                                  <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : course?.length > 0 ? (
                      course?.slice(0 , 6)?.map((item, index) => (
                        <div
                          className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 d-flex"
                          key={index}
                        >
                          <div
                            className="course__item-2 transition-3 white-bg mb-30 fix d-flex flex-column w-100"
                            style={{ position: "relative" }}
                          >
                            <div className="course__thumb-2 w-img ">
                              <NavLink
                                to={`/CourseDetail/${encrypt(item?._id)}`}
                                className="shine__animate-link"
                                style={{
                                  minHeight: "30vh",
                                  maxHeight: "30vh",
                                  overflow: "hidden",
                                  position: "relative",
                                }}
                              >
                                {item?.coverPage?.length ? (
                                  <img
                                    src={item?.coverPage[0]}
                                    alt="img"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "contain",
                                      position: "absolute",
                                      top: 0,
                                      left: 0,
                                    }}
                                  />
                                ) : (
                                  <img src={defaultImage} alt="img" />
                                )}
                              </NavLink>
                            </div>
                            <div className="px-2 pb-4 pt-2 d-flex flex-column h-100">
                              <div>
                                <span
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#272727",
                                  }}
                                >
                                  <NavLink
                                    to={`/CourseDetail/${encrypt(item?._id)}`}
                                    style={{ textTransform: "capitalize" }}
                                  >
                                    {item?.courseName?.length > 40
                                      ? `${item?.courseName?.slice(0, 40)}...`
                                      : item?.courseName}
                                  </NavLink>
                                </span>
                                {/* <p
                                  style={{
                                    fontSize: "12px",
                                  }}
                                >
                                  {item?.courseDescription?.length > 100
                                    ? `${item?.courseDescription?.slice(
                                        0,
                                        100
                                      )}...`
                                    : item?.courseDescription}
                                </p> */}
                                <div className="d-flex justify-content-between">
                                  <span className="course__tag-2">
                                    <NavLink
                                      to={`/CourseDetail/${encrypt(item?._id)}`}
                                      style={{ fontSize: "10px" }}
                                    >
                                      {item?.categories}
                                    </NavLink>
                                  </span>
                                  <span
                                    style={{
                                      position: "absolute",
                                      left: 0,
                                      top: 10,
                                      zIndex: 10,
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                      textTransform: "uppercase",
                                      color:
                                        item?.paymentType === "free"
                                          ? "#D7A022"
                                          : "#345433",
                                      backgroundColor:
                                        item?.paymentType === "free"
                                          ? "#345433"
                                          : "#D7A022",
                                      padding: "5px 10px",
                                      borderRadius: " 0 5px 0 0",
                                    }}
                                  >
                                    {item?.paymentType}
                                  </span>
                                </div>
                              </div>
                              <div style={{ flexGrow: 1 }}></div>
                              <div className="course__bottom-2 d-flex align-items-center justify-content-between">
                                <div className="course__action">
                                  <ul>
                                    <li>
                                      <div className="course__action-item d-flex align-items-center">
                                        <div className="course__action-icon mr-5">
                                          <span
                                            style={{
                                              width: "20px",
                                              height: "20px",
                                            }}
                                            className="d-flex align-items-center justify-content-center"
                                          >
                                            <svg
                                              width={10}
                                              height={12}
                                              viewBox="0 0 10 12"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M5.00004 5.5833C6.28592 5.5833 7.32833 4.5573 7.32833 3.29165C7.32833 2.02601 6.28592 1 5.00004 1C3.71416 1 2.67175 2.02601 2.67175 3.29165C2.67175 4.5573 3.71416 5.5833 5.00004 5.5833Z"
                                                stroke="#5F6160"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                d="M9 11.0001C9 9.22632 7.20722 7.79175 5 7.79175C2.79278 7.79175 1 9.22632 1 11.0001"
                                                stroke="#5F6160"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                          </span>
                                        </div>
                                        <div className="course__action-content">
                                          <span
                                            style={{
                                              fontSize: "11px",
                                              marginLeft: "5px",
                                            }}
                                          >
                                            {item?.userWhoHasBought?.length}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="course__action-item d-flex align-items-center">
                                        <div className="course__action-icon mr-5">
                                          <span
                                            style={{
                                              width: "20px",
                                              height: "20px",
                                            }}
                                            className="d-flex align-items-center justify-content-center"
                                          >
                                            <svg
                                              width={12}
                                              height={12}
                                              viewBox="0 0 12 12"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M6.86447 1.72209L7.74447 3.49644C7.86447 3.74343 8.18447 3.98035 8.45447 4.02572L10.0495 4.29288C11.0695 4.46426 11.3095 5.2103 10.5745 5.94625L9.33447 7.19636C9.12447 7.40807 9.00947 7.81637 9.07447 8.10873L9.42947 9.65625C9.70947 10.8812 9.06447 11.355 7.98947 10.7148L6.49447 9.82259C6.22447 9.66129 5.77947 9.66129 5.50447 9.82259L4.00947 10.7148C2.93947 11.355 2.28947 10.8761 2.56947 9.65625L2.92447 8.10873C2.98947 7.81637 2.87447 7.40807 2.66447 7.19636L1.42447 5.94625C0.694466 5.2103 0.929466 4.46426 1.94947 4.29288L3.54447 4.02572C3.80947 3.98035 4.12947 3.74343 4.24947 3.49644L5.12947 1.72209C5.60947 0.759304 6.38947 0.759304 6.86447 1.72209Z"
                                                stroke="#5F6160"
                                                strokeWidth="1.3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                          </span>
                                        </div>
                                        <div className="course__action-content">
                                          <span
                                            style={{
                                              fontSize: "11px",
                                              marginLeft: "5px",
                                            }}
                                          >
                                            {item?.averageRating}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="course__tutor-2 d-flex align-items-center gap-2">
                                  <span style={{ fontSize: "11px" }}>
                                    {item?.createUser?.fullname}
                                  </span>
                                  <Avatar
                                    sx={{ width: "20px", height: "20px" }}
                                    src={item?.createUser?.idCard}
                                    alt="img"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          padding: "1rem",
                          textAlign: "center",
                          minWidth: "100%",
                          gridColumn: "1 / -1",
                        }}
                      >
                        <p style={{ fontWeight: "bold" }}>No Data Recorded</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
