import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdAdd, MdArrowBack, MdDelete } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { back_base_url } from "../util/config";

const CourseCreateDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [LessonName, setLessonName] = useState();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([
    {
      id: 1,
      lessonTitle: "",
      lessonText: "",
      lessonFile: null,
    },
  ]);

  const handleLessonTitleChange = (e, lessonId) => {
    const updatedLessons = lessons.map((lesson) =>
      lesson.id === lessonId
        ? { ...lesson, lessonTitle: e.target.value }
        : lesson
    );
    setLessons(updatedLessons);
  };

  const handleLessonTextChange = (text, lessonId) => {
    const updatedLessons = lessons.map((lesson) =>
      lesson.id === lessonId ? { ...lesson, lessonText: text } : lesson
    );
    setLessons(updatedLessons);
  };

  const handleLessonFileChange = (e, lessonId) => {
    const updatedLessons = lessons.map((lesson) =>
      lesson.id === lessonId
        ? { ...lesson, lessonFile: e.target.files[0] }
        : lesson
    );
    setLessons(updatedLessons);
  };

  const addLesson = () => {
    const newLessonId = lessons.length + 1;
    setLessons([
      ...lessons,
      {
        id: newLessonId,
        lessonTitle: "",
        lessonText: "",
        lessonFile: null,
      },
    ]);
  };

  const removeLesson = (lessonId) => {
    const remainingLessons = lessons.filter((lesson) => lesson.id !== lessonId);
    setLessons(remainingLessons);
  };

  const handleSubmit = async (e, redirect) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("LessonName", LessonName);
    formData.append("courseId", id);
    lessons.forEach((lesson, index) => {
      formData.append(`lessons[${index}][lessonTitle]`, lesson.lessonTitle);
      formData.append(`lessons[${index}][lessonText]`, lesson.lessonText);
      if (lesson.lessonFile) {
        formData.append(`files`, lesson.lessonFile);
      }
    });

    const submitRequest = async () => {
      try {
        const response = await axios.post(
          `${back_base_url}api/v1/course`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200 && response.data.message) {
          toast.error(response.data.message);
        } else {
          toast.success("Course List was successfully");
          if (redirect) {
            setTimeout(() => {
              navigate("/instructor/list_course");
            }, 2000);
          } else {
            setTimeout(() => {
              navigate(0)
            }, 2000);
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred.");
      } finally {
        // Reset the loading state
        if (redirect) {
          setLoading(false);
        } else {
          setLoadingLogin(false);
        }
      }
    };

    if (redirect) {
      setLoading(true);
    } else {
      setLoadingLogin(true);
    }

    await submitRequest();
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
        padding: "20px",
        backgroundColor: "#F7F7F7",
        height: "87vh",
        overflowY: "scroll",
        display: "grid",
        gridTemplateColumns: !isMobile ? "3fr 1fr" : "",
      }}
    >
      <div style={{ width: "100%" }}>
        <button onClick={() => window.history.back()}>
          <MdArrowBack size={16} /> Back
        </button>
        <ToastContainer />
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            alignItems: "flex-start",
            justifyContent: "start",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "4px",
              alignItems: "center",
              gridTemplateColumns: "1fr 5fr",
              width: "100%",
            }}
          >
            <label htmlFor={`chapter-name-`}>Chapter Name</label>
            <input
              type="text"
              id={`chapter-name-`}
              style={{
                padding: "4px 8px",
                border: "1px solid",
                outline: "none",
                borderRadius: "8px",
              }}
              onChange={(e) => setLessonName(e.target.value)}
            />
          </div>
          {lessons.map((lesson, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
                alignItems: "flex-start",
                justifyContent: "start",
                width: "100%",
                background: "#FFF",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span style={{ fontSize: "22px" }}>New Lesson</span>
                <button
                  type="button"
                  onClick={() => removeLesson(lesson.id)}
                  style={{
                    backgroundColor: "transparent",
                    color: "#DF5D35",
                    border: "none",
                    borderRadius: "50%",
                    padding: "5px 10px",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  <MdDelete />
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "4px",
                  alignItems: "center",
                  gridTemplateColumns: "1fr 5fr",
                  width: "100%",
                }}
              >
                <label htmlFor={`lesson-title-`}>Lesson Title</label>
                <input
                  type="text"
                  id={`lesson-title-`}
                  style={{
                    padding: "4px 8px",
                    border: "1px solid",
                    outline: "none",
                    borderRadius: "8px",
                  }}
                  onChange={(e) => handleLessonTitleChange(e, lesson.id)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  width: "100%",
                }}
              >
                <label htmlFor="">Lesson Summary</label>
                <ReactQuill
                  style={{ height: "30vh", marginBottom: "2.5rem" }}
                  theme="snow"
                  onChange={(html) => handleLessonTextChange(html, lesson.id)}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "4px",
                  alignItems: "center",
                  gridTemplateColumns: "2fr 5fr",
                  width: "100%",
                }}
              >
                <label htmlFor={`lesson-attachment-`}>
                  Lesson File Attachment
                </label>
                <input
                  type="file"
                  id={`lesson-attachment-`}
                  style={{
                    padding: "4px 8px",
                    border: "1px solid",
                    outline: "none",
                    borderRadius: "8px",
                  }}
                  accept="video/*"
                  onChange={(e) => handleLessonFileChange(e, lesson.id)}
                />
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <button type="button" onClick={addLesson}>
              <MdAdd /> Add Lesson
            </button>
            <div
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <button
                style={{
                  backgroundColor: "#166534",
                  borderRadius: "8px",
                  padding: "8px 20px",
                  color: "#FFFFFF",
                  border: "1px solid #166534",
                  fontWeight: "bold",
                }}
                type="submit"
                disabled={loadingLogin || loading}
              >
                {loadingLogin ? (
                  <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
                ) : (
                  "Add Chapter"
                )}
              </button>
              <button
                style={{
                  backgroundColor: "#D9A128",
                  borderRadius: "8px",
                  padding: "8px 20px",
                  color: "#FFFFFF",
                  border: "1px solid #D9A128",
                  fontWeight: "bold",
                }}
                onClick={(e) => handleSubmit(e, true)}
                disabled={loadingLogin || loading}
              >
                {loading ? (
                  <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
                ) : (
                  "Fished"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseCreateDetail;
