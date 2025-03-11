import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEmail, MdLocationOn, MdPerson3 } from "react-icons/md";
import { back_base_url } from "../../../util/config";
import ReactPlayer from "react-player";
import { CircularProgress } from "@mui/material";
import svgImage from "/assets/no-data-animate.svg";
const DetailTutor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingClassId, setLoadingClassId] = useState(null);
  const [AllClassName, setAllClassName] = useState();

  const { id } = useParams();
  const [tutor, setTutor] = useState();
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

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axios.get(
          `${back_base_url}api/v1/users/getuserById/${id}`
        );
        setTutor(res.data);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchTutor();
  }, [id]);

  useEffect(() => {
    fetchAllClass();
  }, []);

  const fetchAllClass = async () => {
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/class/getClassesByTutorInstructorId/${id}`
      );
      setAllClassName(response.data.classes);
    } catch (error) {
      console.log(error);
    }
  };

  const JoinTutorHandler = async (classId) => {
    setLoading(true);
    setLoadingClassId(classId);
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${back_base_url}api/v1/tutorder`, {
        userId,
        items: [
          {
            tutorinstructorId: classId,
          },
        ],
      });
      const body = {
        order_id: res?.data?.order?._id,
      };
      await axios
        .post(`${back_base_url}payment/chapa/paytut`, body)
        .then((data) => {
          toast.success("Redirecting to Chapa checkout page");
          setTimeout(() => {
            window.open(data.data.url);
            setLoading(false);
            setLoadingClassId(null);
          }, 2000);
        })
        .catch((error) => {
          toast.error("Error while making a payment with Chapa");
          setLoading(false);
          setLoadingClassId(null);
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
      setLoadingClassId(null);
    }
  };

  const [tutorAll, setTutorAll] = useState([]);
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get(
          `${back_base_url}api/v1/Instruct?status=Approved&limit=3`
        );
        setTutorAll(res.data.instructors);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchTutors();
  }, []);

  const [tutors, setTutors] = useState();
  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axios.get(
          `${back_base_url}api/v1/users/getallusers?&role=tutorinstructor&limit=${4}&status=Approved`
        );
        setTutors(res.data.users);
      } catch (error) {
        toast.error("something went wrong");
      }
    };
    fetchTutor();
  }, []);

  return (
    <main className="main-area fix">
      <ToastContainer />
      <section className="instructor-details-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="instructor-details-wrap"
                style={{ background: "#F7F7F7" }}
              >
                <div
                  className="instructor-details-img"
                  style={{
                    height: "35vh",
                    overflowY: "hidden",
                    borderRadius: "inherit",
                  }}
                >
                  <img
                    src={tutor?.images[0]}
                    alt="img"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="instructor-details-content">
                  <div className="content-top">
                    <div className="left-side-content">
                      <h2 className="title">{tutor?.fullname}</h2>
                      <span>
                        I have more than {tutor?.Exprience} years of experience
                      </span>
                    </div>
                    <div>
                      <MdLocationOn />
                      {tutor?.Location}
                    </div>
                  </div>
                  <div className="instructor-info-wrap">
                    <ul className="list-wrap">
                      <li>
                        <div
                          className="rating"
                          style={{ textTransform: "capitalize" }}
                        >
                          {tutor?.Gender}
                        </div>
                      </li>
                      <li>
                        <MdEmail />
                        <a href={`mailto:${tutor?.email}`}>{tutor?.email}</a>
                      </li>
                      <li>
                        <MdPerson3 />
                        {AllClassName?.length} Classes
                      </li>
                    </ul>
                  </div>
                  <div className="bio-content">
                    <h4 className="title">Short Bio:</h4>
                    <p>{tutor?.userName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              padding: "2rem 0",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "60%",
              }}
            >
              <h5>Self Introduction Video</h5>
              <ReactPlayer
                url={tutor?.instructorLicense[0]}
                controls
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                    },
                  },
                }}
                width={"100%"}
                height={400}
              />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1rem",
              padding: "2rem 0 ",
              alignItems: "start",
              width: "100%",
            }}
          >
            {AllClassName?.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "20px",
                  background: "#FFFFFF",
                  borderRadius: "5px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <div className="d-flex align-items-center justify-content-end">
                  {token ? (
                    item?.userWhoHasEnrolled?.find((i) => i === userId) ? (
                      <div className="d-flex align-items-center gap-2">
                        <NavLink
                          to={`/kts/room/${item?.roomId}`}
                          style={{
                            fontSize: "12px",
                            background: "#DAA029",
                            padding: "5px 20px",
                            borderRadius: "4px",
                            color: "#FFFFFF",
                            textTransform: "uppercase",
                          }}
                        >
                          Start Tutor
                        </NavLink>
                      </div>
                    ) : (
                      <button
                        style={{
                          background: "#D9A128",
                          color: "#FFF",
                          padding: "6px 20px",
                          borderRadius: "5px",
                          fontWeight: "bold",
                        }}
                        disabled={loading && loadingClassId === item._id}
                        onClick={() => JoinTutorHandler(item._id)}
                      >
                        {loading && loadingClassId === item._id ? (
                          <CircularProgress
                            size={18}
                            sx={{ color: "#FFFFFF" }}
                          />
                        ) : (
                          "Join This Tutor"
                        )}
                      </button>
                    )
                  ) : (
                    <button
                      style={{
                        background: "#D9A128",
                        color: "#FFF",
                        padding: "6px 20px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                      }}
                      onClick={() => navigate("/accounts/login")}
                    >
                      Login to Join
                    </button>
                  )}
                </div>
                <h4>{item.className}</h4>
                <span>{item.availableTime[0].timeSlots[0]}</span>
                <span>Grade {item.grade}</span>
                <span>Capacity {item.howManyStudents} Students</span>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {item?.availableTime[0]?.day?.map((name) => (
                    <div
                      key={name}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          background: "#F87F98",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <span>{name.slice(0, 3)}</span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {item.price} <span style={{ fontSize: "11px" }}>ETB</span>
                  </span>
                  <span>{item?.userWhoHasEnrolled?.length} Student</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailTutor;
