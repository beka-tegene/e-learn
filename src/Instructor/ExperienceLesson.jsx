import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import axios from "axios";
import { back_base_url } from "../util/config";

const ExperienceLesson = ({ LessonData }) => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [viewCourse, setViewCourse] = useState({
    file: "",
    name: "",
    text: "",
  });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/course/${id}`
      );
      setCourse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (course) {
      const chapter = course.chapter?.find((chapter) =>
        chapter.LessonFile.some((lesson) => lesson._id === LessonData.lessonId)
      );
      if (chapter) {
        const lesson = chapter.LessonFile.find(
          (lesson) => lesson._id === LessonData.lessonId
        );
        if (lesson) {
          setViewCourse({
            file: lesson.LessonUrl,
            name: lesson.LessonType,
            text: lesson.LesssonText,
          });
        }
      }
    }
  }, [course, LessonData.lessonId]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "0 auto",
        background: "#FFFFFF",
        maxHeight: "87vh",
        overflow: "hidden",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          borderBottom: "solid 2px #27272727",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: "23px" }}>Lesson Review </span>
        <span>{viewCourse.name}</span>
      </div>
      <div
        style={{ height: "74vh", overflowY: "scroll", padding: "1rem 2rem" }}
      >
        <div className="d-flex align-items-center justify-content-center">
          <video
            src={viewCourse.file}
            controls
            muted={false}
            style={{
              width: "100%",
              maxWidth: "700px",
              height: "auto",
              backgroundColor: "#000",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              outline: "none",
            }}
          ></video>
        </div>
        <div style={{ textAlign: "justify", marginBottom: "20px" }}>
          {typeof viewCourse.text === "string" && (
            <section
              style={{
                maxWidth: "1000px",
                overflow: "hidden",
                margin: "0 auto",
              }}
            >
              {parse(viewCourse.text)}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceLesson;
