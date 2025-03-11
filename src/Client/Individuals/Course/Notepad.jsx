import React, { useState, useEffect } from "react";
import { TfiNotepad } from "react-icons/tfi";
import { LuClipboardEdit } from "react-icons/lu";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import { back_base_url } from "../../../util/config";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
function decrypt(text) {
  return atob(text);
}
const Notepad = ({ text, lessonId, userId }) => {
  const [notes, setNotes] = useState("");
  const [isNotepadVisible, setIsNotepadVisible] = useState(true);
  const { slug } = useParams();
  const courseId = decrypt(slug);
  const toggleView1 = () => {
    setIsNotepadVisible(true);
  };
  const toggleView2 = () => {
    setIsNotepadVisible(false);
  };
  useEffect(() => {
    if (!isNotepadVisible) {
      const fetchNote = async () => {
        try {
          const response = await axios.get(
            `${back_base_url}api/v1/note/notes/${userId}/${courseId}/${lessonId}`
          );
          setNotes(response.data?.notes[0]?.content);
        } catch (error) {
          console.error("Error fetching note:", error);
          toast.error("Failed to fetch note!");
        }
      };
      fetchNote();
    }
  }, [isNotepadVisible, userId, courseId, lessonId]);
  const [loading, setLoading] = useState(false);
  const handleChange = (content) => {
    setNotes(content);
  };
  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(`${back_base_url}api/v1/note`, {
        userId,
        courseId,
        lessonId,
        content: notes,
      });
      toast.success("Notes saved!");
      setInterval(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note!");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNotes("");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "5px",
      backgroundColor: "#fff",
      boxSizing: "border-box",
      width: "100%",
    },
    nav: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      width: "100%",
      padding: "10px 0",
      marginBottom: "20px",
      borderBottom: "1px solid #272727",
    },
    icon: {
      fontSize: "1.2rem",
      cursor: "pointer",
    },

    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      marginTop: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <nav style={styles.nav}>
        <TfiNotepad
          style={{ ...styles.icon, color: isNotepadVisible ? "#007bff" : "" }}
          onClick={toggleView1}
        />
        <LuClipboardEdit
          style={{ ...styles.icon, color: !isNotepadVisible ? "#007bff" : "" }}
          onClick={toggleView2}
        />
      </nav>
      {!isNotepadVisible && (
        <>
          <ReactQuill
            style={{ height: "30vh", marginBottom: "2.5rem" }}
            value={notes}
            onChange={handleChange}
            placeholder="Write your notes here..."
          />

          <div style={styles.buttonContainer}>
            <button
              style={{
                padding: "5px 20px",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                borderRadius: "5px",
                border: "1px solid #DAA63C",
                backgroundColor: "transparent",
                color: "#DAA63C",
                cursor: "pointer",
              }}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              style={{
                padding: "5px 20px",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#DAA63C",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={handleSave}
            >
              {loading ? (
                <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
              ) : (
                "Save Notes"
              )}
            </button>
          </div>
        </>
      )}
      {typeof text === "string" && isNotepadVisible && (
        <section
          style={{
            maxWidth: "1000px",
            overflow: "clip",
            width: "90%",
          }}
        >
          {parse(text)}
        </section>
      )}
    </div>
  );
};

export default Notepad;
