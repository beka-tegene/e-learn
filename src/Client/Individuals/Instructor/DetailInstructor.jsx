import React, { useEffect, useState } from "react";
import image1 from "/assets/img/breadcrumb_bg1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getUserInstructorData } from "../../../Store/Hooks/UserHook";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MdBook, MdEmail, MdLocationOn } from "react-icons/md";
import { Avatar, Pagination, Skeleton } from "@mui/material";
import axios from "axios";
import { back_base_url } from "../../../util/config";
function encrypt(text) {
  return btoa(text);
}
const DetailInstructor = () => {
  const navigate = useNavigate()
  const divStyle = {
    backgroundImage: `url(${image1})`,
  };
  const { id } = useParams();
  const getInstructor = useSelector(
    (state) => state.UserHook.OutputUsersInstructor
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInstructorData());
  }, []);
  const filterInstructor = getInstructor?.instructors?.filter(
    (item) => item?._id === id
  )?.[0];

  const [course, setCourse] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(1);
  useEffect(() => {
    fetchCourse();
  }, [currentPage]);
  const fetchCourse = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${back_base_url}api/v1/course`, {
        params: {
          page: currentPage,
          limit: 12,
          status: "Approved",
        },
      });
      setCourse(response.data.courses);
      setTotalRows(response.data.totalPages);
      setTotalCourses(response.data.totalCourses);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };
  const FilterCourse = course?.filter((item) => item?.createUser?._id === id);
  return (
    <div>
      <section className="instructor-details-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="instructor-details-wrap">
                <div
                  className="instructor-details-img"
                  style={{
                    height: "50vh",
                    overflowY: "hidden",
                    borderRadius: "inherit",
                  }}
                >
                  <img src={filterInstructor?.idCard[0]} alt="img" />
                </div>
                <div className="instructor-details-content">
                  <div className="content-top">
                    <div className="left-side-content">
                      <h2 className="title">{filterInstructor?.fullname}</h2>
                      {/* <span>{filterInstructor?.categories[0]}</span> */}
                    </div>
                    <div>
                      <MdLocationOn />
                      {filterInstructor?.Location}
                    </div>
                  </div>
                  <div className="instructor-info-wrap">
                    <ul className="list-wrap">
                      <li>
                        <div className="rating">
                          {filterInstructor?.Exprience}
                        </div>
                        Experience
                      </li>
                      <li>
                        <MdEmail />
                        <a href={`mailto:${filterInstructor?.email}`}>
                          {filterInstructor?.email}
                        </a>
                      </li>
                      <li>
                        <MdBook />
                        {FilterCourse?.length} Course
                      </li>
                    </ul>
                  </div>
                  <div className="bio-content">
                    <h4 className="title">Short Bio:</h4>
                    <p>
                      suada faci lisis Lorem ipsum dolarorit more ametion
                      consectetur elit. Vesti bulum a nec odio aea theawr dumm
                      ipsumm ipsum that dolocons rsus suada and fadolorit
                      consectetur elit. All the Lorem Ipsum generators on their
                      the Internet tend repeat predefined chunks dumme lisis
                      Lorem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3>Teacher Course</h3>
          {/* <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
              padding: "1rem",
            }}
          >
            {FilterCourse?.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#F7F7F7",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate( `/CourseDetail/${encrypt(item._id)}`)
                }
              >
                <div
                  style={{ height: "28vh", width: "100%", overflow: "hidden" }}
                >
                  <img
                    src={item?.coverPage[0]}
                    alt="Course Cover"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div style={{ padding: "10px 20px" }}>
                  <h5>
                    {item?.courseName?.length > 45
                      ? `${item?.courseName?.slice(0, 45)}...`
                      : item?.courseName}
                  </h5>
                  <span
                    style={{
                      background: "#EBCC8B",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      width: "fit-content",
                      padding: "0 10px",
                      borderRadius: "5px",
                    }}
                  >
                    <SiGitbook />
                    {item?.chapter?.length} Chapters
                  </span>
                </div>
              </div>
            ))}
          </div> */}
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
                      {FilterCourse?.length
                        ? FilterCourse?.map((item, index) => (
                            <div
                              className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 d-flex"
                              key={index}
                            >
                              <div className="course__item-2 transition-3 white-bg mb-30 fix d-flex flex-column w-100">
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
                                          objectFit: "cover",
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
                                        to={`/CourseDetail/${encrypt(
                                          item?._id
                                        )}`}
                                        style={{ textTransform: "capitalize" }}
                                      >
                                        {item?.courseName?.length > 40
                                          ? `${item?.courseName?.slice(
                                              0,
                                              40
                                            )}...`
                                          : item?.courseName}
                                      </NavLink>
                                    </span>
                                    <p
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
                                    </p>
                                    <div className="d-flex justify-content-between">
                                      <span className="course__tag-2">
                                        <NavLink
                                          to={`/CourseDetail/${encrypt(
                                            item?._id
                                          )}`}
                                          style={{ fontSize: "10px" }}
                                        >
                                          {item?.categories}
                                        </NavLink>
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "18px",
                                          fontWeight: "bold",
                                          textTransform: "uppercase",
                                          color:
                                            item?.paymentType === "free"
                                              ? "#345433"
                                              : "#D7A022",
                                        }}
                                      >
                                        {item?.paymentType}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : Array.from({ length: 8 }).map((_, index) => (
                            <div
                              className="col-xxl-3 col-xl-3 col-lg-3 col-md-6"
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
                          ))}
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Pagination
                          count={totalRows}
                          page={currentPage}
                          onChange={handlePageChange}
                          showFirstButton
                          showLastButton
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailInstructor;
