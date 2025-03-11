import { MdFilterList, MdSearch, MdBook, MdTimer, MdAdd } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCourseByIdData } from "../Store/Hooks/CourseHook";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const List = () => {
  const [loading, setLoading] = useState(true);
  const instructorCourse = useSelector(
    (state) => state.CourseHook.outputCoursesById
  );
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const decodedUserId = decodedToken?.userId;
        dispatch(getCourseByIdData({ data: { decodedUserId } }));
        setLoading(false);
      } catch (error) {
        console.error("Error decoding token:");
        setLoading(false);
      }
    }
  }, [token, dispatch]);
  const navigate = useNavigate()
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#F7F7F7",
        padding: "4px 20px",
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
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: "8px",
          }}
        >
          <div>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              CATEGORY FILTER <MdFilterList style={{ cursor: "pointer" }} />
            </p>
          </div>
          <div style={{ flexGrow: 1 }}></div>

          <form
            action=""
            style={{
              border: "1px solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "0 10px",
              overflow: "hidden",
            }}
          >
            <input
              type="text"
              style={{ outline: "none", padding: "4px 8px", border: "none" }}
            />
            <MdSearch style={{ fontSize: "20px", cursor: "pointer" }} />
          </form>
          <button
            onClick={() => navigate("/instructor/add_course")}
            style={{
              padding: "5px 25px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            Add Course
          </button>
        </div>
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
              padding: "2rem 1rem ",
              alignItems: "start",
              width: "100%",
            }}
          >
            {loading ? (
              Array.from({ length: 12 }).map((_, index) => (
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
              instructorCourse[0]?.data?.map((item, index) => (
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
                    navigate( `/instructor/detail_courses/${item._id}`)
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
                      src={item.coverPage}
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

export default List;
