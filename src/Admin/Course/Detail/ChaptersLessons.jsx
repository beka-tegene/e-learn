import React, { useEffect, useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { Modal } from "@mui/material";
import parse from "html-react-parser";
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
  },
  chapter: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  chapterHeader: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "10px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lessonList: {
    marginTop: "10px",
  },
  lessonFile: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "10px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  lessonType: {
    fontSize: "14px",
    color: "#555",
  },
  quizzes: {
    backgroundColor: "#e6f7ff",
    padding: "10px",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    fontSize: "16px",
    color: "#007bff",
    textAlign: "center",
    marginTop: "10px",
  },
};

const ChaptersLessons = ({ filterCourse }) => {
  const [viewCourse, setViewCourse] = useState({
    file: "",
    name: "",
    text: "",
  })
  const [expandedChapter, setExpandedChapter] = useState(null);

  const toggleChapter = (index) => {
    setExpandedChapter(expandedChapter === index ? null : index);
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
  useEffect(() => {
    if (filterCourse) {
      const chapter = filterCourse?.chapter?.find((chapter) =>
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
  }, [filterCourse, LessonData.lessonId]);
  return (
    <div style={styles.container}>
      {filterCourse?.chapter?.map((item, index) => (
        <div key={index} style={styles.chapter}>
          <div
            style={styles.chapterHeader}
            onClick={() => toggleChapter(index)}
          >
            <span>{item?.LessonName}</span>
            <span>
              {expandedChapter === index ? (
                <IoMdArrowDropdown />
              ) : (
                <IoMdArrowDropup />
              )}
            </span>
          </div>
          {expandedChapter === index && (
            <div style={styles.lessonList}>
              {item?.LessonFile?.map((i, e) => (
                <div
                  key={e}
                  style={styles.lessonFile}
                  onClick={() => handleOpen5(item._id, i?._id)}
                >
                  <h6 style={styles.lessonType}>{i?.LessonType}</h6>
                </div>
              ))}
              {item?.questions?.length > 0 && (
                <p style={styles.quizzes}>Quizzes</p>
              )}
            </div>
          )}
        </div>
      ))}
      <Modal
        open={open5}
        onClose={handleClose5}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
            style={{
              height: "74vh",
              overflowY: "scroll",
              padding: "1rem 2rem",
            }}
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
      </Modal>
    </div>
  );
};

export default ChaptersLessons;
