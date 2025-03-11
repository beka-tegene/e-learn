import React, { useEffect, useState } from "react";
import { MdBook, MdPaid } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { getCourseByIdData } from "../Store/Hooks/CourseHook";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { FaUserGraduate, FaUsers } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { back_base_url } from "../util/config";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [instructorData, setInstructorData] = useState();
  const [coursesStatus, setCoursesStatus] = useState();
  const [loading, setLoading] = useState(true);
  const instructorCourse = useSelector(
    (state) => state.CourseHook.outputCoursesById
  );
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (token) {
        try {
          const decodedToken = jwt_decode(token);
          const decodedUserId = decodedToken?.userId;
          dispatch(getCourseByIdData({ data: { decodedUserId } }));
          const res = await axios.get(
            `${back_base_url}api/v1/auth/instructors/${decodedUserId}`
          );
          const response = await axios.get(
            `${back_base_url}api/v1/course/courses/stats/${decodedUserId}`
          );
          setCoursesStatus(response.data);

          setInstructorData(res.data.instructor);
          setLoading(false);
        } catch (error) {
          console.error("Error decoding token or fetching data:");
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [token, dispatch]);

  const filterPaidCourse = instructorCourse[0]?.data?.filter(
    (item) => item.paymentType === "paid"
  );
  const filterStudent = filterPaidCourse?.map(
    (item) => item.userWhoHasBought.length
  );

  const barData = {
    labels: ["Total Course", "Paid Course", "Enrolled Users", "Total Earned"],
    datasets: [
      {
        label: `Count`,
        data: [
          coursesStatus?.totalCourseCount,
          coursesStatus?.paidCourseCount,
          coursesStatus?.enrolledUsersCount,
          coursesStatus?.totalAmountEarned,
        ],
        backgroundColor: ["#0a5f59", "#252b42", "#D9A128", "#0a5f9e"],
      },
    ],
  };

  const pieData = {
    labels: ["Total Course", "Paid Course", "Enrolled Users", "Total Earned"],
    datasets: [
      {
        data: [
          coursesStatus?.totalCourseCount,
          coursesStatus?.paidCourseCount,
          coursesStatus?.enrolledUsersCount,
          coursesStatus?.totalAmountEarned,
        ],
        backgroundColor: ["#0a5f59", "#252b42", "#D9A128", "#0a5f9e"],
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#F7F7F7",
        padding: "0 20px",
        height: "87vh",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "start",
          width: "100%",
          gap: "4px",
          padding:"20px 0"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            width: "100%",
            padding: "5px",
            gap: "10px",
          }}
        >
          <div
            style={{
              padding: ".8rem",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px #0002",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "100%",
                  color: "white",
                  background: "#0a5f59",
                }}
              >
                <FaUserGraduate size={17}/>
              </div>
              <div style={{ marginLeft: "12px",display:"flex",flexDirection:"column" }}>
                <span
                  style={{ fontSize: "16px", fontWeight: "500", color: "gray" }}
                >
                  Total Course
                </span>
                <span style={{ fontWeight: "900", fontSize: "24px" }}>
                  {coursesStatus?.totalCourseCount}
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: ".8rem",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px #0002",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "100%",
                  color: "white",
                  background: "#252b42",
                }}
              >
                <MdBook size={17}/>
              </div>
              <div style={{ marginLeft: "12px",display:"flex",flexDirection:"column" }}>
                <span
                  style={{ fontSize: "16px", fontWeight: "500", color: "gray"}}
                >
                  Paid Course
                </span>
                <span style={{ fontWeight: "900", fontSize: "24px" }}>
                  {coursesStatus?.paidCourseCount}
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: ".8rem",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px #0002",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "100%",
                  color: "white",
                  background: "#D9A128",
                }}
              >
                <FaUsers size={17}/>
              </div>
              <div style={{ marginLeft: "12px",display:"flex",flexDirection:"column" }}>
                <span
                  style={{ fontSize: "16px", fontWeight: "500", color: "gray" }}
                >
                  Enrolled Users
                </span>
                <span style={{ fontWeight: "900", fontSize: "24px" }}>
                  {coursesStatus?.enrolledUsersCount}
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: ".8rem",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px #0002",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "100%",
                  color: "white",
                  background: "#0a5f9e",
                }}
              >
                <MdPaid size={17}/>
              </div>
              <div style={{ marginLeft: "12px",display:"flex",flexDirection:"column" }}>
                <span
                  style={{ fontSize: "16px", fontWeight: "500", color: "gray" }}
                >
                  Total Earned
                </span>
                <span style={{ fontWeight: "900", fontSize: "24px" }}>
                  {coursesStatus?.totalAmountEarned} <span style={{fontSize:"13px"}}>ETB</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: !isMobile ? "2fr 1fr" : "",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "45vh",
              }}
            >
              <h5>Report Summary</h5>
              <Bar data={barData} />
            </div>
            <div>
              <h5>Report Summary</h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                  height: "45vh",
                }}
              >
                <Pie data={pieData} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <p>Recent Courses</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
              padding: ".2rem 1rem 2rem",
              alignItems: "start",
              width: "100%",
            }}
          >
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  key={index}
                >
                  <div
                    style={{
                      height: "28vh",
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <Skeleton
                      variant="rounded"
                      width={"100%"}
                      height={"100%"}
                    />
                  </div>
                  <div style={{ padding: "10px 5px" }}>
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={"10%"}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      style={{
                        background: "#EBCC8B",
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        // width: "fit-content",
                        padding: "0 10px",
                        borderRadius: "5px",
                        width: "40%",
                      }}
                    >
                      <MdBook />
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                        width={"100%"}
                      />
                    </span>
                    <span
                      style={{
                        borderBottom: "3px solid yellow",
                        width: "40%",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                        width={"100%"}
                      />
                    </span>
                  </div>
                </div>
              ))
            ) : instructorCourse?.[0]?.data?.length > 0 ? (
              instructorCourse[0]?.data?.slice(0, 3)?.map((item, index) => (
                <div
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  key={index}
                  onClick={() =>
                    navigate(`/instructor/detail_courses/${item._id}`)
                  }
                >
                  <div
                    style={{
                      height: "28vh",
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.coverPage[0]}
                      alt="img1"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <div style={{ padding: "10px 5px" }}>
                    <h5>
                      {item?.courseName?.length > 50
                        ? `${item.courseName?.slice(0, 50)}...`
                        : item?.courseName}
                    </h5>
                    <div className="d-flex justify-content-between align-items-center">
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
                        <MdBook /> {item.chapter.length} Chapters
                      </span>
                      <span
                        style={{
                          borderBottom:
                            item?.status === "Rejected"
                              ? "3px solid red"
                              : item?.status === "Approved"
                              ? "3px solid #008000"
                              : "3px solid yellow",
                        }}
                      >
                        {item?.status}
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      position: "absolute",
                      backgroundColor:
                        item.paymentType === "free" ? "green" : "goldenrod",
                      left: "0",
                      color: "white",
                      padding: "0 10px",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      borderRadius: "0 10px 0 0",
                    }}
                  >
                    {item.paymentType}
                  </span>
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
  );
};

export default Dashboard;
