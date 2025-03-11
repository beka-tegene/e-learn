import { MdFilterList, MdSearch, MdBook } from "react-icons/md";
import { GrMore } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { getCourseByIdData } from "../../../Store/Hooks/CourseHook";
import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { back_base_url } from "../../../util/config";
import { useNavigate } from "react-router-dom";

const BusinessCreate = () => {
  const navigate = useNavigate()
  const [data, setData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const open = Boolean(anchorEl);

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
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token, dispatch, data]);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentId(null);
  };

  const publishHandler = async (id) => {
    try {
      const res = await axios.put(
        `${back_base_url}api/v1/course/pending/${id}`
      );
      toast.success("Courses Public Successfully");
      setInterval(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const PrivateHandler = async (id) => {
    try {
      const res = await axios.put(
        `${back_base_url}api/v1/course/draft/${id}`
      );
      toast.success("Courses Private Successfully");
      setInterval(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

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
      <ToastContainer />
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
              overflow: "hidden",
              padding: "0 10px",
            }}
          >
            <input
              type="text"
              style={{ outline: "none", padding: "4px 8px", border: "none" }}
            />
            <MdSearch style={{ fontSize: "20px", cursor: "pointer" }} />
          </form>
          <button
            onClick={() => navigate( "/lms-business/add_course")}
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
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
              padding: "1rem",
              alignItems: "start",
              width: "100%",
            }}
          >
            {instructorCourse[0]?.data?.map((item, index) => (
              <div
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  backgroundColor: "#FEFBFA",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  position: "relative",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                key={index}
              >
                <div
                  style={{ height: "28vh", width: "100%", overflow: "hidden" }}
                  onClick={() =>
                    navigate( `/lms-business/detail_courses/${item._id}`)
                  }
                >
                  <img
                    src={item.coverPage}
                    alt="img1"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div
                  style={{ padding: "10px 5px" }}
                  onClick={() =>
                    navigate( `/lms-business/detail_courses/${item._id}`)
                  }
                >
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
                    <span style={{ borderBottom: "3px solid #008000" }}>
                      {item?.status === "draft" ? "Private" : "Public"}
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    position: "absolute",
                    backgroundColor: "#27272790",
                    right: "10px",
                    color: "white",
                    width: "25px",
                    height: "25px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={(e) => handleClick(e, item?._id)}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <GrMore />
                </span>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open && currentId === item?._id} // Only open for the current item
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={() => publishHandler(item?._id)}
                    sx={{ fontSize: "14px" }}
                  >
                    Public
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    onClick={() => PrivateHandler(item?._id)}
                  >
                    Private
                  </MenuItem>
                </Menu>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCreate;
