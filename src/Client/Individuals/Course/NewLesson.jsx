import React, { useEffect, useState } from "react";
import { Divider, Drawer, Typography } from "@mui/material";
import { MdLock, MdOndemandVideo, MdQuiz } from "react-icons/md";
import { NavLink, useLocation, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateLessonProgress } from "../../../Store/Hooks/CourseHook";
import { getUserCourseByIdData } from "../../../Store/Hooks/UserHook";
import SidebarLesson from "./SidebarLesson";
import Navbar from "./Navbar";
import ContentBar from "./Contentbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function decrypt(text) {
  return atob(text);
}

const NewLesson = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quizData, setQuizData] = useState();
  const [lessonId, setLesson] = useState();
  const [durations, setDuration] = useState(0);

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

  const { pathname } = useLocation();
  const { slug } = useParams();
  const decryptedId = decrypt(slug);

  const dispatch = useDispatch();
  const usersById = useSelector(
    (state) => state.UserHook.OutputUserCoursesById
  );
  const currentLessons = usersById?.lesson?.filter(
    (item) => item?.lessonId && item?.progress < 99
  );

  const lessoned = usersById?.course?.chapter?.flatMap((item) =>
    item?.LessonFile?.filter((i) =>
      currentLessons?.some((lesson) => lesson.lessonId === i?._id)
    )
  );

  const [viewCourse, setViewCourse] = useState({
    file: "",
    name: "",
    text: "",
  });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted && lessoned?.length > 0) {
      setViewCourse({
        file: lessoned[0]?.LessonUrl || "",
        name: lessoned[0]?.LessonType || "",
        text: lessoned[0]?.LesssonText || "",
      });
      setLesson(lessoned[0]._id);
      setHasMounted(true);
    }
  }, [lessoned, hasMounted]);
  const [current, setCurrentTime] = useState(0);

  let per = Math.floor((current / durations) * 100 + 1) || 0;
  useEffect(() => {
    dispatch(
      getUserCourseByIdData({ data: { courseId: decryptedId, userId } })
    );
  }, [per, quizData]);

  useEffect(() => {
    if (per > 0) {
      dispatch(
        setUpdateLessonProgress({
          data: {
            lessonId,
            courseId: decryptedId,
            progress: per,
            lessonTime: current,
            userId,
          },
        })
      );
    }
  }, [per]);
  const [dataStore, setDataStore] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const handleLessonClick = (lessons) => {
    setDataStore("");
    setIsClicked(false);
    const lessonIndex = usersById?.lesson.findIndex(
      (lesson) =>
        lesson.lessonId === lessons._id ||
        lesson.groupquestionid === lessons._id
    );

    if (
      lessonIndex === 0 ||
      usersById?.lesson[lessonIndex]?.progress >= 100 ||
      (usersById?.lesson[lessonIndex - 1]?.progress >= 100 &&
        usersById?.lesson[lessonIndex]?.progress < 100) ||
      (usersById?.lesson[lessonIndex - 1]?.averagescoreprogress >= 50 &&
        usersById?.lesson[lessonIndex]?.progress < 100)
    ) {
      setViewCourse({
        file: lessons.LessonUrl,
        name: lessons.LessonType,
        text: lessons.LesssonText,
      });
      setLesson(lessons._id);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Course | " + usersById?.course?.courseName;
  }, [pathname]);

  const quizQuestionHandler = (item, id) => {
    const lessonIndex = usersById?.lesson.findIndex(
      (lesson) => lesson.groupquestionid === id
    );

    if (
      lessonIndex === 0 ||
      usersById?.lesson[lessonIndex]?.averagescoreprogress >= 50 ||
      (usersById?.lesson[lessonIndex - 1]?.progress >= 100 &&
        usersById?.lesson[lessonIndex]?.averagescoreprogress < 50)
    ) {
      setDataStore(item);
      setIsClicked(true);
      setViewCourse({
        file: "",
        name: "",
        text: "",
      });
      setLesson(id);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: isMobile ? "" : ".5fr 11.5fr",
          gap: "1rem",
        }}
      >
        {/* sidebar */}
        <SidebarLesson />
        <div className="d-flex flex-column">
          {/* Navigation */}
          <Navbar
            usersById={usersById}
            setDrawerOpen={setDrawerOpen}
            drawerOpen={drawerOpen}
          />
          <Divider sx={{ border: ".5px solid #E1E1E1" }} />
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: isMobile ? "" : "2.5fr 9fr",
              gap: "1rem",
            }}
          >
            {!isMobile ? (
              <div
                style={{
                  padding: "1rem .7rem 1rem 0",
                  overflowY: "scroll",
                  maxHeight: "90vh",
                }}
              >
                <div>
                  {usersById?.course?.chapter?.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                        paddingLeft: "5px",
                      }}
                    >
                      <div sx={{ backgroundColor: "#E7EFFC" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          {item?.LessonName}
                        </Typography>
                      </div>
                      <div
                        style={{
                          border: "0px solid #FFF",
                          borderRadius: "4px",
                          boxShadow: "0px 0px 2px 1px #0003",
                          marginBottom: "10px",
                        }}
                      >
                        {item?.LessonFile?.map((lessons, i) => (
                          <NavLink
                            key={i}
                            onClick={() => handleLessonClick(lessons)}
                            style={{
                              background: "transparent",
                              textDecoration: "none",
                              display: "block",
                            }}
                          >
                            <div
                              style={{
                                padding: "18px 20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                cursor: "pointer",
                                opacity: (() => {
                                  const lessonIndex =
                                    usersById?.lesson.findIndex(
                                      (lesson) =>
                                        lesson.lessonId === lessons._id
                                    );
                                  return lessonIndex !== -1 &&
                                    usersById?.lesson[lessonIndex]?.progress >=
                                      100
                                    ? 0.5
                                    : 1;
                                })(),
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <MdOndemandVideo />
                                <Typography variant="body2" sx={{ flex: 1 }}>
                                  {lessons?.LessonType?.slice(0, 20)}...
                                </Typography>
                              </div>
                              {usersById?.lesson?.find(
                                (lesson) => lesson.lessonId === lessons._id
                              )?.progress >= 1 ? (
                                <input
                                  type="radio"
                                  checked={
                                    usersById?.lesson?.find(
                                      (lesson) =>
                                        lesson.lessonId === lessons._id
                                    )?.progress >= 100
                                  }
                                  style={{
                                    backgroundColor: "#342378",
                                    borderColor: "red",
                                    marginLeft: "10px",
                                  }}
                                />
                              ) : (
                                <MdLock />
                              )}
                            </div>
                            <Divider sx={{ border: ".5px solid #E1E1E1" }} />
                          </NavLink>
                        ))}
                        {item?.questionsGroup?.questions?.length > 0 && (
                          <NavLink
                            onClick={() => {
                              quizQuestionHandler(
                                item?.questionsGroup?.questions,
                                item?.questionsGroup?._id
                              );
                            }}
                            style={{
                              background: "transparent",
                              textDecoration: "none",
                              display: "block",
                            }}
                          >
                            <div
                              style={{
                                padding: "18px 20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                cursor: "pointer",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <MdQuiz />
                                <Typography variant="body2" sx={{ flex: 1 }}>
                                  Quiz
                                </Typography>
                              </div>
                              {usersById?.lesson?.find(
                                (lesson) =>
                                  lesson?.groupquestionid ===
                                  item?.questionsGroup?._id
                              )?.averagescoreprogress >= 1 ? (
                                <input
                                  type="radio"
                                  checked={
                                    usersById?.lesson?.find(
                                      (lesson) =>
                                        lesson?.groupquestionid ===
                                        item?.questionsGroup?._id
                                    )?.averagescoreprogress >= 50
                                  }
                                  style={{
                                    backgroundColor: "#342378",
                                    borderColor: "red",
                                    marginLeft: "10px",
                                  }}
                                />
                              ) : (
                                <MdLock />
                              )}
                            </div>
                          </NavLink>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(!drawerOpen)}
              >
                <div
                  style={{
                    padding: "1rem .7rem 1rem 0",
                    overflowY: "scroll",
                    maxHeight: "100vh",
                  }}
                >
                  <div>
                    {usersById?.course?.chapter?.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "7px",
                          paddingLeft: "5px",
                        }}
                      >
                        <div sx={{ backgroundColor: "#E7EFFC" }}>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {item?.LessonName}
                          </Typography>
                        </div>
                        <div
                          style={{
                            border: "0px solid #FFF",
                            borderRadius: "4px",
                            boxShadow: "0px 0px 2px 1px #0003",
                            marginBottom: "10px",
                          }}
                        >
                          {item?.LessonFile?.map((lessons, i) => (
                            <NavLink
                              key={i}
                              onClick={() => handleLessonClick(lessons)}
                              style={{
                                background: "transparent",
                                textDecoration: "none",
                                display: "block",
                              }}
                            >
                              <div
                                style={{
                                  padding: "18px 20px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  cursor: "pointer",
                                  opacity: (() => {
                                    const lessonIndex =
                                      usersById?.lesson.findIndex(
                                        (lesson) =>
                                          lesson.lessonId === lessons._id
                                      );
                                    return lessonIndex !== -1 &&
                                      usersById?.lesson[lessonIndex]
                                        ?.progress >= 100
                                      ? 0.5
                                      : 1;
                                  })(),
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <MdOndemandVideo />
                                  <Typography variant="body2" sx={{ flex: 1 }}>
                                    {lessons?.LessonType?.slice(0, 20)}...
                                  </Typography>
                                </div>
                                {usersById?.lesson?.find(
                                  (lesson) => lesson.lessonId === lessons._id
                                )?.progress >= 1 ? (
                                  <input
                                    type="radio"
                                    checked={
                                      usersById?.lesson?.find(
                                        (lesson) =>
                                          lesson.lessonId === lessons._id
                                      )?.progress >= 100
                                    }
                                    style={{
                                      backgroundColor: "#342378",
                                      borderColor: "red",
                                      marginLeft: "10px",
                                    }}
                                  />
                                ) : (
                                  <MdLock />
                                )}
                              </div>
                              <Divider sx={{ border: ".5px solid #E1E1E1" }} />
                            </NavLink>
                          ))}
                          {item?.questionsGroup?.questions?.length > 0 && (
                            <NavLink
                              onClick={() => {
                                quizQuestionHandler(
                                  item?.questionsGroup?.questions,
                                  item?.questionsGroup?._id
                                );
                              }}
                              style={{
                                background: "transparent",
                                textDecoration: "none",
                                display: "block",
                              }}
                            >
                              <div
                                style={{
                                  padding: "18px 20px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  cursor: "pointer",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <MdQuiz />
                                  <Typography variant="body2" sx={{ flex: 1 }}>
                                    Quiz
                                  </Typography>
                                </div>
                                {usersById?.lesson?.find(
                                  (lesson) =>
                                    lesson?.groupquestionid ===
                                    item?.questionsGroup?._id
                                )?.averagescoreprogress >= 1 ? (
                                  <input
                                    type="radio"
                                    checked={
                                      usersById?.lesson?.find(
                                        (lesson) =>
                                          lesson?.groupquestionid ===
                                          item?.questionsGroup?._id
                                      )?.averagescoreprogress >= 50
                                    }
                                    style={{
                                      backgroundColor: "#342378",
                                      borderColor: "red",
                                      marginLeft: "10px",
                                    }}
                                  />
                                ) : (
                                  <MdLock />
                                )}
                              </div>
                            </NavLink>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Drawer>
            )}
            {/* content */}
            <ContentBar
              usersById={usersById}
              viewCourse={viewCourse}
              setViewCourse={setViewCourse}
              setLesson={setLesson}
              isClicked={isClicked}
              per={per}
              dataStore={dataStore}
              setIsClicked={setIsClicked}
              setDuration={setDuration}
              current={current}
              setCurrentTime={setCurrentTime}
              lessonId={lessonId}
              decryptedId={decryptedId}
              userId={userId}
              setQuizData={setQuizData}
              setDataStore={setDataStore}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewLesson;
