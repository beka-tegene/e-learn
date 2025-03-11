import React, { useEffect, useState } from "react";
import { SiGitbook } from "react-icons/si";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { back_base_url } from "../../../util/config";

const BrowserCoursesDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [filterCourse, setFilterCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/course/${id}`
      );
      setFilterCourse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const videoUrl = filterCourse?.chapter?.[0]?.LessonFile?.[0]?.LessonUrl || "";

  return (
    <div
      style={{
        height: "87vh",
        overflowY: "scroll",
        background: "#F9FAFB",
        padding: "1.5rem",
      }}
    >
      {filterCourse ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.2fr",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                muted={false}
                style={{
                  width: "100%",
                  height: "auto",
                  backgroundColor: "#FFF",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  outline: "none",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "28vh",
                  backgroundColor: "#FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  borderRadius: "7px",
                }}
              >
                <p>No video available</p>
              </div>
            )}
            <div
              style={{
                background: "#FFFFFF",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
                borderRadius: "7px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
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
                  <SiGitbook />
                  {filterCourse?.chapter?.length} Chapters
                </span>
                <span>{filterCourse?.price} ETB</span>
              </div>
              <h4>{filterCourse?.courseName}</h4>
              <p>{filterCourse?.courseDescription}</p>
              <div
                style={{
                  height: "8px",
                  width: "100%",
                  background: "#CFEDFB",
                  borderRadius: "5px",
                }}
              ></div>
              <span>0% Complete</span>
            </div>
          </div>
          <div
            style={{
              background: "#D9A128",
              padding: "1.5rem 1rem",
              borderRadius: "7px",
            }}
          >
            <h4>Ready to start building?</h4>
            <p>
              Track your progress, watch with subtitles, change quality & speed,
              and more.
            </p>
            <button
              style={{
                background: "#F9FAFB",
                padding: "6px 0",
                borderRadius: "5px",
                fontWeight: "bold",
                width: "100%",
              }}
              onClick={() =>
                navigate( `/lms-business/course-detail/${id}/enroll-employee`)
              }
            >
              Enroll For Employee
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default BrowserCoursesDetail;
