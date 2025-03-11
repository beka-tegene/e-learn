import axios from "axios";
import React, { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { back_base_url } from "../util/config";

const CourseCreateDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams();

  const [quizQuestions, setQuizQuestions] = useState(
    Array.from({ length: 5 }, () => "")
  );
  const [quizChoices, setQuizChoices] = useState(
    Array.from({ length: 5 }, () => ["", "", "", ""])
  );
  const [quizAnswers, setQuizAnswers] = useState(
    Array.from({ length: 5 }, () => "")
  );

  const [LessonName, setLessonName] = useState();
  const [lessons, setLessons] = useState([
    {
      id: 1,
      lessonTitle: "",
      lessonText: "",
      lessonFile: "",
    },
  ]);
  const [checkBox, setCheckBox] = useState(false);

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

  const AddLesson = () => {
    const newLessonId = lessons.length + 1;
    setLessons([
      ...lessons,
      {
        id: newLessonId,
        lessonTitle: "",
        lessonText: "",
        lessonFile: "",
      },
    ]);
  };

  const RemoveLesson = (lessonId) => {
    const remainingLessons = lessons.filter((lesson) => lesson.id !== lessonId);
    setLessons(remainingLessons);
  };

  const handleQuizQuestionChange = (e, index) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index] = e.target.value;
    setQuizQuestions(updatedQuestions);
  };

  const handleQuizChoiceChange = (e, questionIndex, choiceIndex) => {
    const updatedChoices = [...quizChoices];
    updatedChoices[questionIndex][choiceIndex] = e.target.value;
    setQuizChoices(updatedChoices);
  };

  const handleQuizAnswerChange = (e, index) => {
    const updatedAnswers = [...quizAnswers];
    updatedAnswers[index] = e.target.value;
    setQuizAnswers(updatedAnswers);
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
      console.log(response);
      if (redirect) {
        if (response.status === 200 && response.data.message) {
          toast.error(response.data.message);
        } else {
          toast.success("Course List was successfully");
          setInterval(() => {
            navigate("/instructor/list_course");
          }, 2000);
        }
      } else {
        if (response.status === 200 &&  response.data.message) {
          toast.error(response.data.message);
        } else {
          toast.success("Course List was successfully");
          setInterval(() => {
            navigate(0)
          }, 2000);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#F7F7F7",
        padding: "10px 20px",
        minHeight: "91vh",
      }}
    >
      <ToastContainer />
      <form
        style={{
          display: "grid",
          gridTemplateColumns: "7fr 3fr",
          gap: "8px",
          justifyContent: "flex-start",
          alignItems: "start",
          width: "100%",
        }}
        onSubmit={(e) => handleSubmit(e, false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingTop: "10px",
            width: "90%",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              style={{
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gap: "4px",
                  alignItems: "center",
                  gridTemplateColumns: "1fr 5fr",
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {lessons.map((lesson, lessonIndex) => (
                  <div
                    style={{
                      boxShadow: "0px 1px 2px rgba(0,0,0,0.3)",
                      padding: "8px",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                      key={lessonIndex}
                    >
                      <div
                        style={{
                          flexGrow: 1,
                        }}
                      ></div>
                      <button
                        style={{
                          backgroundColor: "#FFEAE7",
                          color: "#DF5D35",
                          borderRadius: "50%",
                          padding: "5px 10px",
                          fontSize: "18px",
                        }}
                        type="button"
                        onClick={() => RemoveLesson(1, lesson.id)}
                      >
                        <MdDelete />
                      </button>
                      <button
                        style={{
                          backgroundColor: "#def2ff",
                          color: "#359bdf",
                          borderRadius: "50%",
                          padding: "5px 10px",
                          fontSize: "18px",
                        }}
                        type="button"
                        onClick={() => AddLesson(lesson.id)}
                      >
                        <MdAdd />
                      </button>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gap: "4px",
                        alignItems: "center",
                        gridTemplateColumns: "1fr 5fr",
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
                      }}
                    >
                      <label htmlFor="">Lesson Reading</label>
                      <ReactQuill
                        style={{ height: "30vh", marginBottom: "2.5rem" }}
                        theme="snow"
                        onChange={(html) =>
                          handleLessonTextChange(html, lesson.id)
                        }
                      />
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gap: "4px",
                        alignItems: "center",
                        gridTemplateColumns: "2fr 5fr",
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
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
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
          >
            Add Chapter
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
          >
            Fished
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreateDetail;
