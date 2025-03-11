import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import {
  MdArrowBack,
  MdArrowDropDown,
  MdDelete,
  MdEdit,
  MdEditSquare,
  MdMoreVert,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import parse from "html-react-parser";
import axios from "axios";
import AddLesson from "./AddLesson";
import { ToastContainer, toast } from "react-toastify";
import ExperienceLesson from "./ExperienceLesson";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { back_base_url } from "../util/config";
const DetailCourese = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  //   const course = useSelector((state) => state.CourseHook.outputCourses);
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(getCourseData());
  //   }, []);
  const [course, setCourse] = useState();
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${back_base_url}api/v1/course/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isEdit, setIsEdit] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [chapterOpen, setChapterOpen] = useState([]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const toggleChapterAccordion = (index) => {
    setChapterOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const [open1, setOpen] = useState(false);
  const [name, setName] = useState(false);
  const [ChapterId, setChapter] = useState();
  const [LessonId, setLesson] = useState();

  const handleClickOpen = (e, n, chpId) => {
    setOpen(true);
    setName(n);
    setChapter(chpId);
  };

  const handleClose1 = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = useState(false);

  const handleClickOpen2 = (e, n, chpId, lessId) => {
    setOpen2(true);
    setName(n);
    setLesson(lessId);
    setChapter(chpId);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [open3, setOpen3] = useState(false);

  const handleClickOpen3 = (e, n) => {
    setOpen3(true);
    setName(n);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };
  const DeleteCourseHandler = (id) => {
    try {
      const res = axios.delete(`${back_base_url}api/v1/course/${id}`);
      setInterval(() => {
        navigate("/instructor/list_course");
      }, 1000);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const DeleteChapterHandler = () => {
    try {
      const res = axios.delete(
        `${back_base_url}api/v1/course/${course?._id}/chapter/${ChapterId}`
      );
      setInterval(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const DeleteLessonHandler = () => {
    try {
      const res = axios.delete(
        `${back_base_url}api/v1/course/${course?._id}/chapter/${ChapterId}/lesson/${LessonId}`
      );
      setInterval(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const [open4, setOpen4] = useState(false);
  const [chapterId, setChapterId] = useState(false);
  const handleOpen4 = (id) => {
    setOpen4(true);
    setChapterId(id);
  };
  const handleClose4 = () => setOpen4(false);
  const [profiles, setProfiles] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [priceType, setPriceType] = useState("");
  const [aboutCourse, setAboutCourse] = useState("");
  const [payment, setPayment] = useState("");

  const [initialized, setInitialized] = useState(true);
  useEffect(() => {
    if (course && initialized) {
      setProfiles(course?.coverPage || null);
      setCourseTitle(course?.courseName || "");
      setCourseDescription(course?.courseDescription);
      setCourseCategory(course?.categories);
      setCourseDuration(course?.courseDuration);
      setPriceType(course?.paymentType);
      setPayment(course?.price);
      setAboutCourse(course?.aboutCourse);
      setInitialized(false);
    }
  }, [course, initialized]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const UpdateCourse = async () => {
    setUpdateLoading(true);
    const formData = new FormData();
    formData.append("coverPage", profiles);
    formData.append("courseName", courseTitle);
    formData.append("courseDescription", courseDescription);
    formData.append("categories", courseCategory);
    formData.append("courseDuration", courseDuration);
    formData.append("paymentType", priceType);
    formData.append("price", payment);
    formData.append("aboutCourse", aboutCourse);
    formData.append("userId", userId);
    try {
      await axios
        .put(`${back_base_url}api/v1/course/${id}`, formData)
        .then((data) => {
          toast.success(data.data.message);
          setInterval(() => {
            navigate(0);
            setUpdateLoading(false);
          }, 1000);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const [editChapterIndex, setEditChapterIndex] = useState(null);
  const [lessonNameUpdate, setLessonNameUpdate] = useState();
  const [chapterIdUpdate, setChapterIdUpdate] = useState();
  const handleLessonName = (e, index, id) => {
    setLessonNameUpdate(e.target.value);
    setChapterIdUpdate(id);
    console.log(e, index, id);
  };
  const isEditHandle = () => {
    try {
      axios
        .put(
          `${back_base_url}api/v1/course/courses/${id}/chapters/${chapterIdUpdate}/lessonname`,
          { LessonName: lessonNameUpdate }
        )
        .then((res) => {
          toast.success(res.data.message);
          setInterval(() => {
            navigate(0);
          }, 2000);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const [open5, setOpen5] = useState(false);
  const [LessonData, setLessonData] = useState({
    chapterIds: "",
    lessonId: "",
  });
  const handleOpen5 = (id, lessonId) => {
    setOpen5(true);
    setLessonData({
      chapterIds: id,
      lessonId: lessonId,
    });
  };
  const handleClose5 = () => setOpen5(false);
  const [loading, setLoading] = useState(false);
  const publishHandler = () => {
    setLoading(true);
    try {
      axios.put(`${back_base_url}api/v1/course/pending/${id}`).then((res) => {
        toast.success("Courses Publish Successfully");
        setInterval(() => {
          navigate(0);
          setLoading(false);
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        height: "87vh",
        overflowY: "scroll",
        background: "#F7F7F7",
        padding: "1rem",
      }}
    >
      <ToastContainer />
      <button onClick={() => window.history.back()}>
        <MdArrowBack size={16} /> Back
      </button>
      <div style={{ padding: "10px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "6px 0",
          }}
        >
          <h5>Course Details</h5>
          <span style={{ color: "#d5d5d5" }}>
            {new Date(course?.createdAt).toLocaleDateString()}
          </span>
          <button
            disabled={!loading || course?.status === "draft" ? false : true}
            style={{
              background: course?.status === "draft" ? "#D9A127" : "",
              padding: "4px 25px",
              borderRadius: "5px",
              fontWeight: "bold",
              color: course?.status === "draft" ? "#F7F7F7" : "",
              border: "1px solid ",
            }}
            onClick={publishHandler}
          >
            {loading ? (
              <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
            ) : course?.status === "draft" ? (
              "Publish"
            ) : (
              "Published"
            )}
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: !isMobile ? "1.5fr 3fr" : "",
            boxShadow: "0 1px 2px 2px #0001",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <div
            style={{
              padding: "10px",
              overflow: "hidden",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <img
              src={
                profiles instanceof File
                  ? URL.createObjectURL(profiles)
                  : profiles
              }
              alt="Course Cover"
              style={{
                borderRadius: "10px",
                width: "100%",
                height: profiles instanceof File ? "auto" : "100%",
                objectFit: "cover",
              }}
            />
            {!isEdit && (
              <label htmlFor="profile">
                <MdEditSquare
                  style={{
                    fontSize: "18px",
                    padding: "4px",
                    position: "absolute",
                    bottom: "15px",
                    right: "15px",
                    zIndex: 12,
                    color: "#007BFF",
                    border: "1px solid #007BFF",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "#FFFFFF33",
                    cursor: "pointer",
                  }}
                />
              </label>
            )}
            <input
              type="file"
              name="profile"
              id="profile"
              hidden
              onChange={(e) => setProfiles(e.target.files[0])}
            />
          </div>
          <div
            style={{
              padding: "10px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>
              {isEdit ? (
                <span style={{ fontSize: "18px", fontWeight: 700 }}>
                  {course?.courseName}
                </span>
              ) : (
                <input
                  type="text"
                  style={{
                    padding: "4px 8px",
                    border: "1px solid",
                    outline: "none",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                />
              )}
            </div>
            <Divider />
            <div>
              {isEdit ? (
                <span>{courseDescription?.slice(0, 95)}... </span>
              ) : (
                <input
                  type="text"
                  value={courseDescription}
                  style={{
                    padding: "4px 8px",
                    border: "1px solid",
                    outline: "none",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
              )}
            </div>
            <Divider />
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                {isEdit ? (
                  <span>{courseCategory}</span>
                ) : (
                  <select
                    id="course-category"
                    style={{
                      padding: "8px",
                      border: "1px solid",
                      outline: "none",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                    onChange={(e) => setCourseCategory(e.target.value)}
                  >
                    <option selected disabled>
                      {courseCategory}
                    </option>
                    <option value="Accounting & Finance">
                      Accounting & Finance
                    </option>
                    <option value="Arts & Crafts">Arts & Crafts</option>
                    <option value="Beauty & Makeup">Beauty & Makeup</option>
                    <option value="Business & Marketing">
                      Business & Marketing
                    </option>
                    <option value="Creatives & Design">
                      Creatives & Design
                    </option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="IT & Development">IT & Development</option>
                    <option value="Language & Literature">
                      Language & Literature
                    </option>
                    <option value="Music & Theatre">Music & Theatre</option>
                    <option value="Office Productivity">
                      Office Productivity
                    </option>
                    <option value="Personal Development">
                      Personal Development
                    </option>
                    <option value="Photography & Videography">
                      Photography & Videography
                    </option>
                    <option value="Academy Course">
                      Academy Course
                    </option>
                  </select>
                )}
              </div>
              <div>
                {isEdit ? (
                  <span>{courseDuration}</span>
                ) : (
                  <input
                    type="text"
                    value={courseDuration}
                    style={{
                      padding: "4px 8px",
                      border: "1px solid",
                      outline: "none",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                    onChange={(e) => setCourseDuration(e.target.value)}
                  />
                )}
              </div>
              <div>
                {isEdit ? (
                  <span>{priceType}</span>
                ) : (
                  <select
                    id="price-type"
                    style={{
                      padding: "8px",
                      border: "1px solid",
                      outline: "none",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                    onChange={(e) => setPriceType(e.target.value)}
                  >
                    <option selected disabled>
                      {priceType}
                    </option>
                    <option value="paid">paid</option>
                    <option value="free">Free</option>
                  </select>
                )}
              </div>
              <div>
                {isEdit ? (
                  <span>{payment} <span style={{fontSize:"10px"}}>ETB</span></span>
                ) : (
                  <input
                    type="number"
                    value={payment}
                    style={{
                      padding: "4px 8px",
                      border: "1px solid",
                      outline: "none",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                )}
              </div>
            </div>
            <Divider />
            <div>
              {isEdit ? (
                <span>
                  {typeof course?.aboutCourse === "string" &&
                    parse(
                      course?.aboutCourse.length > 100
                        ? `${course?.aboutCourse.slice(0, 250)}...`
                        : course?.aboutCourse
                    )}
                </span>
              ) : (
                <ReactQuill
                  theme="snow"
                  style={{ height: "15vh", marginBottom: "2.5rem" }}
                  value={aboutCourse}
                  onChange={setAboutCourse}
                />
              )}
            </div>
            {!isEdit && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                    padding: "4px 20px",
                    color: "#166534",
                    border: "1px solid #166534",
                    fontWeight: "bold",
                    width: "25%",
                  }}
                  type="reset"
                  onClick={() => setIsEdit(true)}
                >
                  Cancel
                </button>
                <button
                  style={{
                    backgroundColor: "#166534",
                    borderRadius: "8px",
                    padding: "4px 20px",
                    color: "#FFFFFF",
                    border: "1px solid #166534",
                    fontWeight: "bold",
                    width: "25%",
                  }}
                  onClick={UpdateCourse}
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
                  ) : (
                    "save"
                  )}
                </button>
              </div>
            )}
          </div>
          {isEdit && (
            <div
              style={{
                position: "absolute",
                right: "0px",
              }}
            >
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MdMoreVert
                  style={{
                    color: "#000",
                    fontSize: "22px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </div>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={(e) => {
                setIsEdit(false);
                handleClose();
              }}
            >
              <ListItemIcon>
                <MdEdit fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" style={{ fontSize: "12px" }}>
                  Edit
                </Typography>
              </ListItemText>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                handleClickOpen3(e, course?.courseName);
                handleClose();
              }}
            >
              <ListItemIcon>
                <MdDelete fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" style={{ fontSize: "12px" }}>
                  Delete
                </Typography>
              </ListItemText>
            </MenuItem>
          </Menu>
          <Dialog
            open={open3}
            keepMounted
            onClose={handleClose3}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Course Delete </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete this course? This action cannot
                be undone. Deleting the course will permanently remove it from
                your account and all associated data, including enrolled
                students, assignments, and grades.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose3}>Disagree</Button>
              <Button onClick={() => DeleteCourseHandler(course?._id)}>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <div style={{ padding: "10px 20px" }}>
        <h5>Chapter Detail</h5>
        {course?.chapter?.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                padding: "10px",
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
              }}
            >
              {editChapterIndex === index ? (
                <input
                  type="text"
                  onChange={(e) => handleLessonName(e, index, item._id)}
                  style={{
                    padding: "4px 8px",
                    border: "1px solid",
                    outline: "none",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <span>{item?.LessonName}</span>
              )}

              <div style={{ flexGrow: 1 }}></div>
              {editChapterIndex === index ? (
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    onClick={() => setEditChapterIndex()}
                    style={{
                      backgroundColor: "#166534",
                      borderRadius: "8px",
                      padding: "3px 20px",
                      color: "#FFFFFF",
                      border: "1px solid #166534",
                      fontWeight: "bold",
                    }}
                  >
                    cancel
                  </button>
                  <button
                    style={{
                      backgroundColor: "#166534",
                      borderRadius: "8px",
                      padding: "3px 20px",
                      color: "#FFFFFF",
                      border: "1px solid #166534",
                      fontWeight: "bold",
                    }}
                    onClick={() => isEditHandle()}
                  >
                    save
                  </button>
                </div>
              ) : (
                <div>
                  <IconButton onClick={() => setEditChapterIndex(index)}>
                    <MdEdit fontSize={"small"} />
                  </IconButton>
                  <IconButton
                    onClick={(e) =>
                      handleClickOpen(e, item?.LessonName, item?._id)
                    }
                  >
                    <MdDelete fontSize={"small"} />
                  </IconButton>
                  <IconButton onClick={() => toggleChapterAccordion(index)}>
                    <MdArrowDropDown />
                  </IconButton>
                </div>
              )}
            </div>
            <Dialog
              open={open1}
              keepMounted
              onClose={handleClose1}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>Chapters Delete </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to Delete{" "}
                  <span style={{ fontWeight: "bolder" }}>{name}</span> chapter
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose1}>Disagree</Button>
                <Button onClick={() => DeleteChapterHandler()}>Agree</Button>
              </DialogActions>
            </Dialog>
            <div
              style={{
                padding: "10px 30px",
                display: chapterOpen[index] ? "flex" : "none",
                overflow: "hidden",
                transition: "display 0.3s ease",
                width: "100%",
                flexDirection: "column",
                gap: "10px",
                alignItems: "start",
              }}
            >
              {item?.LessonFile?.map((lesson, i) => (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "3px 10px",
                    boxShadow: "0 1px 2px 1px #0002",
                    cursor: "pointer",
                  }}
                  key={i}
                  onClick={() => handleOpen5(item._id, lesson?._id)}
                >
                  <span>{lesson?.LessonType}</span>
                  <div style={{ flexGrow: 1 }}></div>
                  <div>
                    <IconButton
                      onClick={(e) =>
                        handleClickOpen2(
                          e,
                          lesson?.LessonType,
                          item?._id,
                          lesson?._id
                        )
                      }
                    >
                      <MdDelete fontSize={"small"} />
                    </IconButton>
                  </div>
                </div>
              ))}
              <Dialog
                open={open2}
                keepMounted
                onClose={handleClose2}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>Lessons Delete </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to Delete{" "}
                    <span style={{ fontWeight: "bolder" }}>{name}</span> Lesson
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose2}>Disagree</Button>
                  <Button onClick={() => DeleteLessonHandler()}>Agree</Button>
                </DialogActions>
              </Dialog>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "transparent",
                    color: "#1976D2",
                    border: "1px solid #1976D2",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#1976D2",
                    },
                  }}
                  onClick={() => handleOpen4(item._id)}
                >
                  Add Lesson
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "transparent",
                    color: "#1976D2",
                    border: "1px solid #1976D2",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#1976D2",
                    },
                  }}
                  onClick={() =>
                    navigate(`/instructor/detail_quiz/${id}/${item?._id}`)
                  }
                >
                  quiz
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "transparent",
            color: "#1976D2",
            border: "1px solid #1976D2",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#1976D2",
            },
          }}
          onClick={() => navigate(`/instructor/add_detail/${id}`)}
        >
          Add Chapter
        </Button>
      </div>
      <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddLesson handleClose4={handleClose4} chapterId={chapterId} id={id} />
      </Modal>
      <Modal
        open={open5}
        onClose={handleClose5}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ExperienceLesson LessonData={LessonData} />
      </Modal>
    </div>
  );
};

export default DetailCourese;
