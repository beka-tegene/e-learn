import React, { useEffect, useState } from "react";
import image1 from "/assets/img/breadcrumb_bg1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getUserInstructorData } from "../../../Store/Hooks/UserHook";
import { MdLocationOn } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Pagination } from "@mui/material";
import { back_base_url } from "../../../util/config";
import svgImage from "/assets/no-data-animate.svg";
const AllInstructor = () => {
  const divStyle = {
    backgroundImage: `url(${image1})`,
  };
  const getInstructor = useSelector(
    (state) => state.UserHook.OutputUsersInstructor
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInstructorData());
  }, []);
  const [students, setStudents] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTeacher();
  }, [currentPage]);

  const fetchTeacher = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/users/getallusers?page=${currentPage}&limit=12&role=instructor&status=Approved`
      );
      setStudents(response.data.users);
      setTotalRows(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [selectedGenders, setSelectedGenders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleGenderChange = (gender) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter((g) => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };
  const filteredInstructors =
    selectedGenders.length === 0 && searchQuery.trim() === ""
      ? students
      : students
          ?.filter((instructor) =>
            selectedGenders.length === 0
              ? true
              : selectedGenders.includes(instructor.Gender)
          )
          .filter(
            (instructor) =>
              searchQuery.trim() === "" ||
              instructor.fullname
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <section className="breadcrumb-area breadcrumb-bg" style={divStyle}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <h3 className="title">Our Instructors</h3>
                <nav className="breadcrumb">
                  <span property="itemListElement" typeof="ListItem">
                    <a href="/">Home</a>
                  </span>
                  <span className="breadcrumb-separator">
                    <RiArrowRightSLine />
                  </span>
                  <span property="itemListElement" typeof="ListItem">
                    All Instructors
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="events-area section-pt-120 section-pb-90">
        <div className="container">
          <div className="row">
            {filteredInstructors?.length > 0 && (
              <div className="col-xl-3 col-lg-4 order-2 order-lg-0">
                <aside className="courses__sidebar">
                  <div className="course__sidebar-widget shop-widget">
                    <div className="course__sidebar-search">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          type="text"
                          placeholder="Search for instructors..."
                          onChange={handleSearch}
                        />
                        <button type="submit">
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 584.4 584.4"
                            xmlSpace="preserve"
                          >
                            <g>
                              <g>
                                <path
                                  className="st0"
                                  d="M565.7,474.9l-61.1-61.1c-3.8-3.8-8.8-5.9-13.9-5.9c-6.3,0-12.1,3-15.9,8.3c-16.3,22.4-36,42.1-58.4,58.4    c-4.8,3.5-7.8,8.8-8.3,14.5c-0.4,5.6,1.7,11.3,5.8,15.4l61.1,61.1c12.1,12.1,28.2,18.8,45.4,18.8c17.1,0,33.3-6.7,45.4-18.8    C590.7,540.6,590.7,499.9,565.7,474.9z"
                                />
                                <path
                                  className="st1"
                                  d="M254.6,509.1c140.4,0,254.5-114.2,254.5-254.5C509.1,114.2,394.9,0,254.6,0C114.2,0,0,114.2,0,254.5    C0,394.9,114.2,509.1,254.6,509.1z M254.6,76.4c98.2,0,178.1,79.9,178.1,178.1s-79.9,178.1-178.1,178.1S76.4,352.8,76.4,254.5    S156.3,76.4,254.6,76.4z"
                                />
                              </g>
                            </g>
                          </svg>
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="shop-widget">
                    <h4 className="widget-title">Instructors</h4>
                    <div className="shop-cat-list">
                      <ul className="list-wrap">
                        <li>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="gender_male"
                              checked={selectedGenders.includes("male")}
                              onChange={() => handleGenderChange("male")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gender_male"
                            >
                              Male ({getInstructor?.maleCount})
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="gender_female"
                              checked={selectedGenders.includes("female")}
                              onChange={() => handleGenderChange("female")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gender_female"
                            >
                              Female ({getInstructor?.femaleCount})
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            )}
            {filteredInstructors?.length > 0 ? (
              <div className="col-xl-9 col-lg-8">
                <div className="row events__wrapper">
                  {filteredInstructors?.map((instructor, index) => (
                    <div className="col-xl-4 col-md-6" key={index}>
                      <div className="events__item shine__animate-item mentors__item">
                        <div className="events__item-thumb">
                          <NavLink
                            to={`/find/instructor/${instructor?._id}`}
                            className="shine__animate-link"
                          >
                            <img
                              src={instructor.idCard}
                              alt="Instructor"
                              style={{
                                maxHeight: "22vh",
                                minHeight: "22vh",
                              }}
                            />
                          </NavLink>
                        </div>
                        <div className="events__item-content">
                          <h4 className="title">
                            <NavLink to={`/find/instructor/${instructor?._id}`}>
                              {instructor.fullname}
                            </NavLink>
                          </h4>
                          <span
                            className="location"
                            style={{ textTransform: "capitalize" }}
                          >
                            <MdLocationOn /> {instructor.Location}
                          </span>
                          <div
                            className="mentors__content-bottom"
                            style={{ marginTop: "1rem" }}
                          >
                            <ul className="list-wrap">
                              <li className="students">
                                {instructor.Exprience}
                              </li>
                              <li className="rating">{instructor.Gender}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
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
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={svgImage} alt="svgImage" style={{ width: "50%" }} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllInstructor;
