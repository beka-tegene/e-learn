import React, { useEffect, useState } from "react";
import image1 from "/assets/img/counter__1.png";
import image2 from "/assets/img/counter__2.png";
import image3 from "/assets/img/counter__3.png";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCourseData, getUserData } from "../../../Store/Hooks/UserHook";
import { LinearProgress } from "@mui/material";
import { GiDuration } from "react-icons/gi";
import { MdBook } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import html2pdf from "html2pdf.js";
import Certificate from "./Certificate";
import { back_base_url } from "../../../util/config";
function encrypt(text) {
  return btoa(text);
}
const ProfileContent = ({ dataUsed }) => {
  return (
    <div style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
      <div className="col-xl-9 col-lg-9 col-md-12">
        <div className="dashboard__content__wraper">
          <div className="dashboard__section__title">
            <h4>My Profile</h4>
          </div>
          <div
            className="row"
            style={{
              border: "none",
              borderTop: "1px solid #ccc",
              margin: "10px 0",
            }}
          >
            <div className="col-lg-4 col-md-4">
              <div className="dashboard__form dashboard__form__margin">
                Full Name
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="dashboard__form dashboard__form__margin">
                {dataUsed.fullname}
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="dashboard__form dashboard__form__margin">
                Email
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="dashboard__form dashboard__form__margin">
                {dataUsed.email}
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="dashboard__form dashboard__form__margin">
                Phone Number
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="dashboard__form dashboard__form__margin">
                {dataUsed.phoneNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseContent = ({ dataHandler }) => {
  const [instructorTutor, setInstructorTutor] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserHook.OutputUsers);
  const usersCourse = useSelector((state) => state.UserHook.OutputUserCourses);
  
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken?.userId;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          dispatch(getUserData({ data: { userId } }));

          dispatch(getUserCourseData({ data: { userId } }));
          const res = await axios.get(
            `${back_base_url}api/v1/users/getEnrolledClassesByUserId/${userId}`
          );
          setInstructorTutor(res.data.enrolledClasses);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };
    fetchData();
  }, [token]);
  dataHandler(user);
  const filterCourse = usersCourse?.data?.enrolledCourses?.filter(
    (item) => item.progress >= 100.0
  );
  const ActiveFilterCourse = usersCourse?.data?.enrolledCourses?.filter(
    (item) => item.progress < 100.0
  );

  return (
    <div style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
      <div className="dashboard__content__wraper">
        <div className="dashboard__section__title">
          <h4>Summery</h4>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-12 col-12">
            <div
              className="dashboard__single__counter"
              style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="counterarea__text__wraper">
                <div className="counter__img">
                  <img loading="lazy" src={image1} alt="counter" />
                </div>
                <div className="counter__content__wraper">
                  <div className="counter__number">
                    <span className="counter">
                      {usersCourse?.data?.enrolledCourses?.length}
                    </span>
                    +
                  </div>
                  <p>Enrolled Courses</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-12 col-12">
            <div
              className="dashboard__single__counter"
              style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="counterarea__text__wraper">
                <div className="counter__img">
                  <img loading="lazy" src={image2} alt="counter" />
                </div>
                <div className="counter__content__wraper">
                  <div className="counter__number">
                    <span className="counter">
                      {ActiveFilterCourse?.length}
                    </span>
                    +
                  </div>
                  <p>Active Courses</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-12 col-12">
            <div
              className="dashboard__single__counter"
              style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="counterarea__text__wraper">
                <div className="">
                  <img loading="lazy" src={image3} alt="counter" />
                </div>
                <div className="counter__content__wraper">
                  <div className="counter__number">
                    <span className="counter">{filterCourse?.length}</span>
                  </div>
                  <p>Complete Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          border: "none",
          borderTop: "1px solid #ccc",
          margin: "5px 0",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      ></div>
      <div className="col-xl-9 col-lg-9 col-md-12" style={{ width: "100%" }}>
        <div className="dashboard__content__wraper">
          <div className="dashboard__section__title">
            <h4>My Courses</h4>
          </div>
          <div className="row">
            <div
              className="col-xl-12 aos-init aos-animate"
              data-aos="fade-up"
              style={{ width: "100%" }}
            >
              <ul
                className=" about__button__wrap dashboard__button__wrap"
                id="myTab"
                role="tablist"
                style={{ display: "flex", width: "100%", listStyle: "none" }}
              >
                <li
                  className="col-lg-4 col-md-6 col-sm-12 nav-item"
                  role="presentation"
                >
                  <button
                    className="single__tab__link active"
                    data-bs-toggle="tab"
                    data-bs-target="#projects__one"
                    type="button"
                    aria-selected="true"
                    role="tab"
                    style={{
                      width: "100%",
                      height: "6rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Enrolled Courses
                  </button>
                </li>
                <li
                  className="col-lg-4 col-md-6 col-sm-12 nav-item"
                  role="presentation"
                >
                  <button
                    className="single__tab__link"
                    data-bs-toggle="tab"
                    data-bs-target="#projects__two"
                    type="button"
                    aria-selected="false"
                    role="tab"
                    tabIndex={-1}
                    style={{
                      width: "100%",
                      height: "6rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Active Courses
                  </button>
                </li>
                <li
                  className="col-lg-4 col-md-6 col-sm-12 nav-item"
                  role="presentation"
                >
                  <button
                    className="single__tab__link"
                    data-bs-toggle="tab"
                    data-bs-target="#projects__three"
                    type="button"
                    aria-selected="false"
                    role="tab"
                    tabIndex={-1}
                    style={{
                      width: "100%",
                      height: "6rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Completed Courses
                  </button>
                </li>
              </ul>
            </div>
            <div
              className="tab-content tab__content__wrapper aos-init aos-animate"
              id="myTabContent"
              data-aos="fade-up"
            >
              <div
                className="tab-pane fade active show"
                id="projects__one"
                role="tabpanel"
                aria-labelledby="projects__one"
              >
                <div className="row">
                  {usersCourse?.data?.enrolledCourses?.map((item, index) => (
                    <div
                      className="col-xl-4 col-lg-6 col-md-6 col-12"
                      key={index}
                    >
                      <div className="gridarea__wraper">
                        <div className="gridarea__img">
                          <NavLink to={`/lesson/${encrypt(item?.course?._id)}`}>
                            <img
                              loading="lazy"
                              src={item?.course?.coverPage[0]}
                              alt="grid"
                              style={{ maxHeight: "30vh", minHeight: "30vh" }}
                            />
                          </NavLink>
                        </div>
                        <div className="gridarea__content">
                          <div className="gridarea__list">
                            <ul>
                              <li style={{ listStyle: "none" }}>
                                <MdBook />
                                {item?.course?.chapter.length} Chapters
                              </li>
                              <li style={{ listStyle: "none" }}>
                                <GiDuration />
                                {item?.course?.courseDuration}
                              </li>
                            </ul>
                          </div>
                          <div className="gridarea__heading">
                            <h3>
                              <a style={{ fontSize: "18px" }}>
                                {item?.course?.courseName?.length > 40
                                  ? `${item?.course?.courseName?.slice(
                                      0,
                                      40
                                    )}...`
                                  : item?.course?.courseName}
                              </a>
                            </h3>
                            <p
                              style={{
                                fontSize: "12px",
                                textAlign: "justify",
                              }}
                            >
                              {item?.course?.courseDescription?.length > 100
                                ? `${item?.course?.courseDescription?.slice(
                                    0,
                                    100
                                  )}...`
                                : item?.course?.courseDescription}
                            </p>
                          </div>
                          <div className="gridarea__price">
                            {item?.course?.price} ETB
                            <span>
                              {" "}
                              <del className="del__2">
                                {item?.course?.paymentType}
                              </del>
                            </span>
                          </div>
                        </div>
                        <div className=" populerarea__button">
                          <h6>
                            {Math.floor(item.progress)} %{" "}
                            {Math.floor(item.progress) >= 100
                              ? "Complete"
                              : "Progress"}
                          </h6>
                          <LinearProgress
                            variant="determinate"
                            value={Math.floor(item.progress)}
                            sx={{ padding: 1, borderRadius: 1 }}
                          />
                          {Math.floor(item.progress) >= 100 && (
                            <Certificate
                              user={user?.fullname}
                              courseName={item?.course?.courseName}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="projects__two"
                role="tabpanel"
                aria-labelledby="projects__two"
              >
                <div className="row">
                  {ActiveFilterCourse?.map((item, index) => (
                    <div
                      className="col-xl-4 col-lg-6 col-md-6 col-12"
                      key={index}
                    >
                      <div className="gridarea__wraper">
                        <div className="gridarea__img">
                          <NavLink to={`/lesson/${encrypt(item?.course?._id)}`}>
                            <img
                              loading="lazy"
                              src={item?.course?.coverPage[0]}
                              alt="grid"
                              style={{ maxHeight: "30vh", minHeight: "30vh" }}
                            />
                          </NavLink>
                        </div>
                        <div className="gridarea__content">
                          <div className="gridarea__list">
                            <ul>
                              <li style={{ listStyle: "none" }}>
                                <MdBook />
                                {item?.course?.chapter.length} Chapters
                              </li>
                              <li style={{ listStyle: "none" }}>
                                <GiDuration />
                                {item?.course?.courseDuration}
                              </li>
                            </ul>
                          </div>
                          <div className="gridarea__heading">
                            <h3>
                              <a style={{ fontSize: "18px" }}>
                                {item?.course?.courseName?.length > 40
                                  ? `${item?.course?.courseName?.slice(
                                      0,
                                      40
                                    )}...`
                                  : item?.course?.courseName}
                              </a>
                            </h3>
                            <p
                              style={{
                                fontSize: "12px",
                                textAlign: "justify",
                              }}
                            >
                              {item?.course?.courseDescription?.length > 100
                                ? `${item?.course?.courseDescription?.slice(
                                    0,
                                    100
                                  )}...`
                                : item?.course?.courseDescription}
                            </p>
                          </div>
                          <div className="gridarea__price">
                            {item?.course?.price} ETB
                            <span>
                              {" "}
                              <del className="del__2">
                                {item?.course?.paymentType}
                              </del>
                            </span>
                          </div>
                        </div>
                        <div className=" populerarea__button">
                          <h6>
                            {Math.floor(item.progress)} %{" "}
                            {Math.floor(item.progress) >= 100
                              ? "Complete"
                              : "Progress"}
                          </h6>
                          <LinearProgress
                            variant="determinate"
                            value={Math.floor(item.progress)}
                            sx={{ padding: 1, borderRadius: 1 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="projects__three"
                role="tabpanel"
                aria-labelledby="projects__three"
              >
                <div className="row">
                  {filterCourse?.map((item, index) => (
                    <div
                      className="col-xl-4 col-lg-6 col-md-6 col-12"
                      key={index}
                    >
                      <div className="gridarea__wraper">
                        <div className="gridarea__img">
                          <NavLink to={`/lesson/${encrypt(item?.course?._id)}`}>
                            <img
                              loading="lazy"
                              src={item?.course?.coverPage[0]}
                              alt="grid"
                              style={{ maxHeight: "30vh", minHeight: "30vh" }}
                            />
                          </NavLink>
                        </div>
                        <div className="gridarea__content">
                          <div className="gridarea__list">
                            <ul>
                              <li style={{ listStyle: "none" }}>
                                <MdBook />
                                {item?.course?.chapter.length} Chapters
                              </li>
                              <li style={{ listStyle: "none" }}>
                                <GiDuration />
                                {item?.course?.courseDuration}
                              </li>
                            </ul>
                          </div>
                          <div className="gridarea__heading">
                            <h3>
                              <a style={{ fontSize: "18px" }}>
                                {item?.course?.courseName?.length > 40
                                  ? `${item?.course?.courseName?.slice(
                                      0,
                                      40
                                    )}...`
                                  : item?.course?.courseName}
                              </a>
                            </h3>
                            <p
                              style={{
                                fontSize: "12px",
                                textAlign: "justify",
                              }}
                            >
                              {item?.course?.courseDescription?.length > 100
                                ? `${item?.course?.courseDescription?.slice(
                                    0,
                                    100
                                  )}...`
                                : item?.course?.courseDescription}
                            </p>
                          </div>
                          <div className="gridarea__price">
                            {item?.course?.price} ETB
                            <span>
                              {" "}
                              <del className="del__2">
                                {item?.course?.paymentType}
                              </del>
                            </span>
                          </div>
                        </div>
                        <div className=" populerarea__button">
                          <h6>
                            {Math.floor(item.progress)} %{" "}
                            {Math.floor(item.progress) >= 100
                              ? "Complete"
                              : "Progress"}
                          </h6>
                          <LinearProgress
                            variant="determinate"
                            value={Math.floor(item.progress)}
                            sx={{ padding: 1, borderRadius: 1 }}
                          />
                          {Math.floor(item.progress) >= 100 && (
                            <Certificate
                              user={user?.fullname}
                              courseName={item?.course?.courseName}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingContent = ({ dataUsed }) => {
  const [fullname, setFullName] = useState(dataUsed.fullname || "");
  const [email, setEmail] = useState(dataUsed.email || "");
  const [phoneNumber, setPhoneNumber] = useState(dataUsed.phoneNumber || "");
  const [oldPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    // Add your update info logic here
  };

  const handlePasswordSubmit = async (e) => {
    // e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (!window.confirm("Are you sure you want to update your password?")) {
      return;
    }
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.patch(
        `${back_base_url}api/v1/users/updateUserPassword`,
        {
          oldPassword,
          newPassword,
          userId: dataUsed._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating your password");
    }
  };
  return (
    <div style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
      <div className="col-xl-9 col-lg-9 col-md-12" style={{ width: "100%" }}>
        <div className="dashboard__content__wraper">
          <div className="dashboard__section__title">
            <h4>My Profile</h4>
          </div>
          <div className="row">
            <div
              className="col-xl-12 aos-init aos-animate"
              data-aos="fade-up"
              style={{ width: "100%" }}
            >
              <ul
                className=" about__button__wrap dashboard__button__wrap"
                id="myTab"
                role="tablist"
                style={{ display: "flex", width: "100%", listStyle: "none" }}
              >
                <li
                  className="col-lg-4 col-md-6 col-sm-12 nav-item"
                  role="presentation"
                >
                  <button
                    className="single__tab__link active"
                    data-bs-toggle="tab"
                    data-bs-target="#projects__one"
                    type="button"
                    aria-selected="true"
                    role="tab"
                    style={{
                      width: "100%",
                      height: "6rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Profile
                  </button>
                </li>
                <li
                  className="col-lg-4 col-md-6 col-sm-12 nav-item"
                  role="presentation"
                >
                  <button
                    className="single__tab__link"
                    data-bs-toggle="tab"
                    data-bs-target="#projects__two"
                    type="button"
                    aria-selected="false"
                    role="tab"
                    tabIndex={-1}
                    style={{
                      width: "100%",
                      height: "6rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Password
                  </button>
                </li>
              </ul>
            </div>
            <div className="tab-content tab__content__wrapper aos-init aos-animate">
              <div
                className="tab-pane fade active show"
                id="projects__one"
                role="tabpanel"
                aria-labelledby="projects__one"
              >
                <div className="row">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="dashboard__form__wraper">
                          <div className="dashboard__form__input">
                            <label htmlFor="#">Full Name</label>
                            <input
                              type="text"
                              value={fullname}
                              onChange={handleFullNameChange}
                              style={{
                                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="dashboard__form__wraper">
                          <div className="dashboard__form__input">
                            <label htmlFor="#">Phone Number</label>
                            <input
                              type="text"
                              value={phoneNumber}
                              onChange={handlePhoneNumberChange}
                              style={{
                                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="dashboard__form__wraper">
                          <div className="dashboard__form__input">
                            <label htmlFor="#">Email</label>
                            <input
                              type="text"
                              value={email}
                              onChange={handleEmailChange}
                              style={{
                                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12">
                        <div className="dashboard__form__button">
                          <button className="btn" onClick={handleInfoSubmit}>
                            <span className="text">Update Info</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="projects__two"
                role="tabpanel"
                aria-labelledby="projects__two"
              >
                <div className="row">
                  <div className="col-xl-12">
                    <div className="dashboard__form__wraper">
                      <div className="dashboard__form__input">
                        <label htmlFor="#">Current Password</label>
                        <input
                          type="password"
                          value={oldPassword}
                          onChange={handleCurrentPasswordChange}
                          style={{
                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="dashboard__form__wraper">
                      <div className="dashboard__form__input">
                        <label htmlFor="#">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={handleNewPasswordChange}
                          style={{
                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="dashboard__form__wraper">
                      <div className="dashboard__form__input">
                        <label htmlFor="#">Re-Type New Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          style={{
                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <div className="dashboard__form__button">
                      <button className="btn" onClick={handlePasswordSubmit}>
                        <span className="text">Update Password</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileDetail = () => {
  const [activeTab, setActiveTab] = useState("course");
  const navigate = useNavigate()
  const [dataUsed, setDataUsed] = useState();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const LogoutHandler = async () => {
    Cookies.remove("token");
    window.location.href =("/accounts/login");
  };

  let contentComponent;

  if (activeTab === "course") {
    contentComponent = <CourseContent dataHandler={setDataUsed} />;
  } else if (activeTab === "profile") {
    contentComponent = <ProfileContent dataUsed={dataUsed} />;
  } else if (activeTab === "setting") {
    contentComponent = <SettingContent dataUsed={dataUsed} />;
  }
  return (
    <div className="dashboard">
      <ToastContainer />
      <div className="container-fluid full__width__padding">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-12" style={{}}>
            <div className="dashboard__inner ">
              <div className="dashboard__nav__title">
                <h6>Welcome, {dataUsed?.fullname} </h6>
              </div>
              <div className="dashboard__nav">
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <a
                      className={activeTab === "course" ? "active" : ""}
                      href="#"
                      onClick={() => handleTabClick("course")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-bookmark"
                      >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                      Enrolled Courses
                    </a>
                  </li>
                  <li>
                    <a
                      className={activeTab === "profile" ? "active" : ""}
                      href="#"
                      onClick={() => handleTabClick("profile")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-user"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx={12} cy={7} r={4} />
                      </svg>
                      My Profile
                    </a>
                  </li>

                  <li>
                    <a
                      className={activeTab === "setting" ? "active" : ""}
                      href="#"
                      onClick={() => handleTabClick("setting")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-settings"
                      >
                        <circle cx={12} cy={12} r={3} />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        LogoutHandler();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-volume-1"
                      >
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12">{contentComponent}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
