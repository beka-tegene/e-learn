import React, { useEffect, useState } from "react";
import image1 from "/assets/img/breadcrumb_bg1.jpg";
import axios from "axios";
import svgImage from "/assets/no-data-animate.svg";
import { MdLocationOn } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { back_base_url } from "../../../util/config";
import { toast } from "react-toastify";
const AllTutor = () => {
  const navigate = useNavigate();
  const divStyle = {
    backgroundImage: `url(${image1})`,
  };
  const [tutor, setTutor] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(1);
  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axios.get(
          `${back_base_url}api/v1/users/getallusers?&role=tutorinstructor&page=${currentPage}&limit=${12}&status=Approved`
        );
        setTutor(res.data.users);
        setTotalRows(res.data.totalPages);
        setTotalCourses(res.data.totalUsers);
      } catch (error) {
        toast.error("something went wrong");
      }
    };
    fetchTutor();
  }, [currentPage]);
  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };
  return (
    <div>
      <section className="breadcrumb-area breadcrumb-bg" style={divStyle}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <h3 className="title">Our Mentor</h3>
                <nav className="breadcrumb">
                  <span property="itemListElement" typeof="ListItem">
                    <a href="/">Home</a>
                  </span>
                  <span className="breadcrumb-separator">
                    <i className="fas fa-angle-right" />
                  </span>
                  <span property="itemListElement" typeof="ListItem">
                    All Mentor
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="events-area section-pt-120 section-pb-90">
        <div className="container">
          {tutor?.length > 0 && (
            <div className="col-md-6">
              <div className="shop-top-left">
                <p>We found {totalCourses} Mentors for you</p>
              </div>
            </div>
          )}
          {tutor?.length > 0 ? (
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
              {tutor?.map((item, index) => (
                <div
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    backgroundColor: "#FEFBFA",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  key={index}
                >
                  <div
                    style={{
                      height: "28vh",
                      width: "100%",
                      overflow: "hidden",
                    }}
                    onClick={() => navigate(`/find/tutor/${item._id}`)}
                  >
                    <img
                      src={item?.images[0]}
                      alt="img1"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="events__item-content">
                    <h4 className="title">
                      <NavLink to={`/find/tutor/${item._id}`}>
                        {item?.fullname}
                      </NavLink>
                    </h4>
                    <span className="location">
                      <MdLocationOn /> {item?.Location}
                    </span>
                    <div className="" style={{ marginTop: "1rem" }}>
                      <ul
                        className="d-flex justify-content-between"
                        style={{ listStyle: "none" }}
                      >
                        <li className="">{item?.Exprience} Experience</li>
                        <li className="">
                          <span
                            className="rating-count"
                            style={{ textTransform: "capitalize" }}
                          >
                            {item?.Gender}
                          </span>{" "}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
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
          {tutor?.length > 0 && (
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
          )}
        </div>
      </section>
    </div>
  );
};

export default AllTutor;
