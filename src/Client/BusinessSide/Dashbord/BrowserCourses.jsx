import React, { useEffect, useState } from "react";
import { SiGitbook } from "react-icons/si";
import axios from "axios";
import { Pagination } from "@mui/material";
import { back_base_url } from "../../../util/config";
import { useNavigate } from "react-router-dom";

const BrowserCourses = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [course, setCourse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(1);
  useEffect(() => {
    fetchCourse();
  }, [currentPage, selectedCategory]);
  const fetchCourse = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${back_base_url}api/v1/course`, {
        params: {
          page: currentPage,
          limit: 9,
          status: "Approved",
          categories: selectedCategory === "All" ? "" : selectedCategory,
        },
      });
      setCategories(response.data.categories);
      setCourse(response.data.courses);
      setTotalRows(response.data.totalPages);
      setTotalCourses(response.data.totalCourses);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const uniqueCategories = ["All", ...new Set(categories)];

  return (
    <div style={{ height: "87vh", overflowY: "scroll", background: "#F9FAFB" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "10px 0",
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            maxWidth: "97%",
            width: "97%",
            gap: ".5rem",
          }}
        >
          {uniqueCategories.map((category, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(category)}
              style={{
                background:
                  selectedCategory === category ? "#EBCC8B" : "#CFEDFB",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                padding: "0 10px",
                borderRadius: "5px",
                flexShrink: 0,
                cursor: "pointer",
              }}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          padding: "2rem 1rem ",
          alignItems: "start",
          width: "100%",
        }}
      >
        {course?.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#FFFFFF",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate( `/lms-business/course-detail/${item._id}`)
            }
          >
            <div style={{ height: "28vh", width: "100%", overflow: "hidden" }}>
              <img
                src={item?.coverPage[0]}
                alt="Course Cover"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div style={{ padding: "10px 20px" }}>
              <h5>
                {item?.courseName?.length > 45
                  ? `${item?.courseName?.slice(0, 45)}...`
                  : item?.courseName}
              </h5>
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
                {item?.chapter?.length} Chapters
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0",
        }}
      >
        <Pagination
          count={totalRows}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default BrowserCourses;
