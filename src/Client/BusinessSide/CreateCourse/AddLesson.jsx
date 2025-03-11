import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { back_base_url } from "../../../util/config";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const AddLesson = ({ handleClose4, chapterId, id }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [LessonTitle, setLessonTitle] = useState();
  const [LessonText, setLessonText] = useState();
  const [LessonFile, setLessonFile] = useState();
  const handleLessonTitleChange = (e) => {
    setLessonTitle(e.target.value);
  };
  const handleLessonTextChange = (text) => {
    setLessonText(text);
  };
  const handleLessonFileChange = (e) => {
    setLessonFile(e.target.files[0]);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("lessonType", LessonTitle);
    formData.append("lessonText", LessonText);
    formData.append("lessonFile", LessonFile);
    formData.append("chapterId", chapterId);
    try {
      const response = await axios.post(
        `${back_base_url}api/v1/course/${id}/lessons`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Add Lesson successfully");
      setInterval(() => {
        navigate(0);
        setLoading(false);
      }, 2000);
    } catch (error) {
      toast.error("something went wrong");
      setLoading(false);
    }
  };
  return (
    <Box sx={style}>
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h4>Add Lesson</h4>
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
            onChange={(e) => handleLessonTitleChange(e)}
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
            onChange={(html) => handleLessonTextChange(html)}
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
          <label htmlFor={`lesson-attachment-`}>Lesson File Attachment</label>
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
            onChange={(e) => handleLessonFileChange(e)}
          />
        </div>
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
              padding: "8px 20px",
              color: "#166534",
              border: "1px solid #166534",
              fontWeight: "bold",
              width: "25%",
            }}
            type="reset"
            onClick={handleClose4}
          >
            Cancel
          </button>
          <button
            style={{
              backgroundColor: "#166534",
              borderRadius: "8px",
              padding: "8px 20px",
              color: "#FFFFFF",
              border: "1px solid #166534",
              fontWeight: "bold",
              width: "25%",
            }}
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? <CircularProgress size={18} sx={{ color: '#FFFFFF' }} />:"Add"}
          </button>
        </div>
      </form>
    </Box>
  );
};

export default AddLesson;
