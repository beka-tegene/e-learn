import image2 from "/assets/img/lock.svg";
import defaultImage from "/assets/img/default-course-thumbnail.png";
import { Avatar, Rating, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setEnrollCourse } from "../../../Store/Hooks/CourseHook";
import { MdBook, MdOndemandVideo, MdQuiz, MdStar } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import { PiStudentFill } from "react-icons/pi";
import { GiDuration } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import axios from "axios";
import ReactPlayer from "react-player"; 
import { back_base_url } from "../../../util/config";

function decrypt(text) {
  return atob(text);
}
function encrypt(text) {
  return btoa(text);
}

const CourseDetail = () => {
  useEffect(() => {
    localStorage.setItem("attemptedUrl", location.pathname);
  }, []);
  const { pathname } = useLocation();
  const { slug } = useParams();
  const decryptedId = decrypt(slug);
  const token = Cookies.get("token");
  let userId;

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [filterCourse, setFilterCourse] = useState([]);
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/course/${decryptedId}`
      );
      setFilterCourse(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(filterCourse);
  
  const FilterUsers = filterCourse?.userWhoHasBought?.filter(
    (item) => item?._id === userId
  );

  const EnrollHandler = async () => {
    if (token) {
      if (filterCourse?.paymentType === "free" && !FilterUsers?.length > 0) {
        dispatch(setEnrollCourse({ data: { decryptedId, userId } }));
      } else if (FilterUsers?.length > 0) {
        navigate(`/lesson/${encrypt(decryptedId)}`);
      } else {
        try {
          const res = await axios.post(`${back_base_url}api/v1/orders`, {
            items: [
              {
                product: decryptedId,
              },
            ],
            userId,
          });
          console.log(res);
          toast.success("Enroll Successfully please wait for approval");
          // navigate(`/checkout/${encrypt(decryptedId)}/${res.data.order._id}`);
        } catch (error) {
          toast.error("something went wrong");
        }
        // dispatch(setOrder({ data: decryptedId }));
      }
    } else {
      window.location.href =("/accounts/login");
    }
  };
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const SubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post(
        `${back_base_url}api/v1/reviews`,
        {
          course: decryptedId,
          title,
          comment,
          rating,
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Appreciate your review.");
        setInterval(() => {
          navigate(0)
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const [review, setReviews] = useState();
  useEffect(() => {
    const response = async () => {
      axios.defaults.withCredentials = true;
      await axios.get(`${back_base_url}api/v1/reviews`).then((data) => {
        setReviews(data.data);
      });
    };
    response();
  }, []);
  const reviewFiltered = review?.reviews?.filter(
    (review) => review?.course?._id === decryptedId
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Fancy Catering Academy | Detail Course";
  }, [pathname]);
  const countLesson = filterCourse?.chapter?.reduce(
    (total, item) => total + (item?.LessonFile?.length || 0),
    0
  );
  if (!filterCourse) {
    return "loading..."
  }

  return (
    <>
      {/* breadcrumb-area */}
      <section className="courses__breadcrumb-area">
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="courses__breadcrumb-content">
                <a className="category">
                  {filterCourse ? (
                    filterCourse?.categories?.[0]
                  ) : (
                    <Skeleton width={100} height={15} />
                  )}
                </a>
                <h3 className="title">
                  {filterCourse ? (
                    filterCourse?.courseName
                  ) : (
                    <>
                      <Skeleton
                        width={"100%"}
                        height={60}
                        sx={{ background: "#FFF3" }}
                      />
                      <Skeleton
                        width={"33%"}
                        height={60}
                        sx={{ background: "#FFF3" }}
                      />
                    </>
                  )}
                </h3>
                <p>{filterCourse?.courseDescription}</p>
                <ul className="courses__item-meta list-wrap">
                  <li>
                    <div className="author">
                      <Avatar
                        src={filterCourse?.createUser?.idCard}
                        alt="avatar"
                      />
                      <a>{filterCourse?.createUser?.fullname}</a>
                    </div>
                  </li>
                  <li>
                    <PiStudentFill style={{ marginRight: ".5rem" }} />{" "}
                    {filterCourse?.userWhoHasBought?.length}
                  </li>
                  <li>
                    <GiDuration style={{ marginRight: ".5rem" }} />{" "}
                    {filterCourse?.courseDuration}
                  </li>
                  <li>
                    <GrMoney style={{ marginRight: ".5rem" }} />{" "}
                    {filterCourse?.price} ETB
                  </li>
                  <li>
                    <MdStar style={{ marginRight: ".5rem" }} />{" "}
                    {filterCourse?.averageRating}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* breadcrumb-area-end */}
      <section className="courses-details-area section-pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8 order-2 order-lg-1">
              <div className="courses__details-wrapper">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="info-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#info"
                      type="button"
                      role="tab"
                      aria-controls="info"
                      aria-selected="true"
                    >
                      Course Information
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="review-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#review"
                      type="button"
                      role="tab"
                      aria-controls="review"
                      aria-selected="false"
                    >
                      Reviews
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="info"
                    role="tabpanel"
                    aria-labelledby="info-tab"
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        padding: "2rem 0",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                        }}
                      >
                        <h5
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                          }}
                        >
                          {
                            filterCourse?.chapter?.[0]?.LessonFile?.[0]
                              ?.LessonType
                          }
                        </h5>
                        <ReactPlayer
                          url={
                            filterCourse?.chapter?.[0]?.LessonFile?.[0]
                              ?.LessonUrl
                          }
                          controls
                          config={{
                            file: {
                              attributes: {
                                poster: filterCourse?.coverPage?.[0],
                                controlsList: "nodownload",
                              },
                            },
                          }}
                          width={"100%"}
                          height={450}
                        />
                      </div>
                    </div>
                    <div className="courses__details-content">
                      {filterCourse &&
                      typeof filterCourse?.aboutCourse === "string" ? (
                        parse(filterCourse?.aboutCourse)
                      ) : (
                        <>
                          <Skeleton width={"100%"} height={15} />
                          <Skeleton width={"100%"} height={15} />
                          <Skeleton width={"100%"} height={15} />
                          <Skeleton width={"100%"} height={15} />
                          <Skeleton width={"100%"} height={15} />
                          <Skeleton width={"100%"} height={15} />
                          <Skeleton width={"100%"} height={15} />
                          <Skeleton width={"100%"} height={15} />
                          <Skeleton width={"100%"} height={15} />
                          <Skeleton width={"40%"} height={15} />
                        </>
                      )}
                    </div>

                    <div className="courses__details-curriculum">
                      <h4 className="title">Curriculum</h4>
                      <div className="accordion" id="accordionExample">
                        {filterCourse?.chapter?.map((item, index) => (
                          <div className="accordion-item" key={index}>
                            <h2
                              className="accordion-header"
                              id={`heading${index}`}
                            >
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded="true"
                                aria-controls={`collapse${index}`}
                              >
                                {item?.LessonName}
                              </button>
                            </h2>
                            <div
                              id={`collapse${index}`}
                              className={`accordion-collapse collapse ${
                                index === 0 ? "show" : ""
                              }`}
                              aria-labelledby={`heading${index}`}
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ul className="list-wrap">
                                  {item ? (
                                    <>
                                      {item?.LessonFile?.map((_item, i) => (
                                        <li className="course-item" key={i}>
                                          <a className="course-item-link">
                                            <span className="item-meta course-item-status">
                                              <MdOndemandVideo />
                                            </span>
                                            <span className="item-name">
                                              {_item?.LessonType}
                                            </span>
                                            <div className="course-item-meta">
                                              <span className="item-meta course-item-status">
                                                <img src={image2} alt="icon" />
                                              </span>
                                            </div>
                                          </a>
                                        </li>
                                      ))}
                                      {item?.questionsGroup?.questions?.length >
                                        0 && (
                                        <li className="course-item">
                                          <a className="course-item-link">
                                            <span className="item-meta course-item-status">
                                              <MdQuiz />
                                            </span>
                                            <span className="item-name">
                                              Quiz
                                            </span>
                                            <div className="course-item-meta">
                                              <span className="item-meta course-item-status">
                                                <img src={image2} alt="icon" />
                                              </span>
                                            </div>
                                          </a>
                                        </li>
                                      )}
                                    </>
                                  ) : (
                                    Array.from({ length: 3 }).map((_, i) => (
                                      <li className="course-item" key={i}>
                                        <a className="course-item-link">
                                          <span className="item-name">
                                            <Skeleton width={100} height={20} />
                                          </span>
                                          <div className="course-item-meta">
                                            <span className="item-meta course-item-status">
                                              <img src={image2} alt="icon" />
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                    ))
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="review"
                    role="tabpanel"
                    aria-labelledby="review-tab"
                  >
                    <div className="courses__details-reviews">
                      <h4 className="title">Student Ratings &amp; Reviews</h4>
                      <div className="course-rate">
                        <div className="course-rate__summary">
                          <div className="course-rate__summary-value">
                            {filterCourse?.averageRating}
                          </div>
                          <Rating
                            name="read-only"
                            value={
                              filterCourse?.averageRating
                                ? filterCourse?.averageRating
                                : 0
                            }
                            readOnly
                          />
                          <div className="course-rate__summary-text">
                            Total {filterCourse?.numOfReviews} Rating
                          </div>
                        </div>
                      </div>
                      {reviewFiltered?.length > 0 && (
                        <div id="course-reviews">
                          <h4 className="course-review-head">
                            Reviews ({reviewFiltered?.length})
                          </h4>
                          <ul className="list-wrap">
                            {reviewFiltered?.map((item, index) => (
                              <li key={index}>
                                <div className="review-author-info">
                                  <Rating
                                    name="read-only"
                                    value={item?.rating}
                                    readOnly
                                  />
                                  <h5 className="user-name">
                                    {item?.title}
                                    <span className="date">
                                      {new Date(
                                        item?.createdAt
                                      ).toLocaleDateString("en-US")}
                                    </span>
                                  </h5>
                                  <p>{item?.comment}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="course-review-form">
                        <h4 className="course-review-head">Write a review</h4>
                        <form onSubmit={SubmitHandler}>
                          <input
                            type="text"
                            placeholder="Review Title"
                            onChange={(e) => setTitle(e.target.value)}
                          />

                          <textarea
                            placeholder="Type Comments"
                            defaultValue={""}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <div
                            className="course-form-rating"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              alignItems: "start",
                              gap: "15px",
                            }}
                          >
                            <span>Select Rating:</span>
                            <Rating
                              name="simple-controlled"
                              onChange={(event, newValue) =>
                                setRating(newValue)
                              }
                              size="large"
                            />
                          </div>
                          <button className="btn" type="submit">
                            Submit your Review
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 order-1 order-lg-2">
              <aside className="courses__details-sidebar">
                <div className="event-widget">
                  <div className="thumb">
                    {filterCourse?.coverPage?.length ? (
                      <img src={filterCourse?.coverPage?.[0]} alt="img" />
                    ) : (
                      <img src={defaultImage} alt="img" />
                    )}
                  </div>
                  <div className="event-cost-wrap">
                    <h4
                      className="price"
                      style={{ textTransform: "uppercase" }}
                    >
                      <strong style={{ textTransform: "none" }}>Costs:</strong>
                      {filterCourse ? (
                        filterCourse?.paymentType
                      ) : (
                        <Skeleton width={70} height={35} />
                      )}
                    </h4>

                    {filterCourse?.paymentType && (
                      <button
                        className="tg-button-wrap btn"
                        style={{ backgroundColor: "#D7A022", color: "#FFFFFF" }}
                        onClick={EnrollHandler}
                      >
                        {token
                          ? !FilterUsers?.length > 0
                            ? filterCourse?.paymentType === "free"
                              ? "Enroll"
                              : "Buy"
                            : "Enrolled"
                          : "Login to Enroll"}
                      </button>
                    )}

                    <div className="event-information-wrap">
                      <h6 className="title">Include This Course</h6>
                      <ul className="list-wrap">
                        <li>
                          <GiDuration style={{ marginRight: "1rem" }} />
                          Duration
                          <span>{filterCourse?.courseDuration}</span>
                        </li>
                        <li>
                          <MdBook style={{ marginRight: "1rem" }} />
                          Courses
                          <span>{countLesson} Lessons</span>
                        </li>
                        <li>
                          <GrMoney style={{ marginRight: "1rem" }} />
                          Price
                          <span>{filterCourse?.price} ETB</span>
                        </li>
                        <li>
                          <PiStudentFill style={{ marginRight: "1rem" }} />
                          Students
                          <span>{filterCourse?.userWhoHasBought?.length}</span>
                        </li>
                        <li>
                          <IoLanguage style={{ marginRight: "1rem" }} />
                          Laguage <span>English</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetail;
