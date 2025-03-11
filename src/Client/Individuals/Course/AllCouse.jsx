import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Skeleton, Pagination, Avatar } from "@mui/material";
import axios from "axios";
import { back_base_url } from "../../../util/config";
function encrypt(text) {
  return btoa(text);
}

const AllCourses = () => {
  const [filterPriceType, setFilterPriceType] = useState([]);
  const [filterCourse, setFilterCourse] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [course, setCourse] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(1);
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCourse();
  }, [currentPage, filterPriceType, filterCourse]);
  const fetchCourse = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${back_base_url}api/v1/course`, {
        params: {
          page: currentPage,
          limit: 12,
          status: "Approved",
          paymentType: filterPriceType.join(","),
          categories: filterCourse.join(","),
        },
      });
      setCourse(response.data.courses);
      setTotalRows(response.data.totalPages);
      setTotalCourses(response.data.totalCourses);
      setCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const PriceType = course?.reduce((acc, currentItem) => {
    const existingItem = acc.find(
      (item) => item.paymentType === currentItem.paymentType
    );
    if (existingItem) {
      existingItem.count++;
    } else {
      acc.push({ ...currentItem, count: 1 });
    }
    return acc;
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "All Course";
  }, [pathname]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      {/* main-area */}
      <main className="main-area fix">
        {/* all-courses */}
        <section className="all-courses-area section-py-120">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 order-2 order-lg-0 d-none d-lg-block">
                <aside className="courses__sidebar">
                  <div className="course__sidebar-widget shop-widget">
                    <div className="course__sidebar-search">
                      <form>
                        <input
                          type="text"
                          placeholder="Search for courses..."
                          onChange={(e) => setSearchFilter(e.target.value)}
                        />
                        <button type="button">
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
                    <h4 className="widget-title">Filter by Category</h4>
                    <div className="shop-cat-list">
                      {categories?.length ? (
                        <ul className="list-wrap">
                          {categories.map((item, index) => (
                            <li key={index}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`cat_${index}`}
                                  onChange={(e) => {
                                    setFilterCourse((prevFilterCourse) => {
                                      if (e.target.checked) {
                                        return [...prevFilterCourse, item];
                                      } else {
                                        return prevFilterCourse.filter(
                                          (item) => item !== item
                                        );
                                      }
                                    });
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`cat_${index}`}
                                  style={{ fontSize: "13px" }}
                                >
                                  {item}
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        Array.from({ length: 3 }).map((_, index) => (
                          <li
                            key={index}
                            style={{
                              listStyleType: "none",
                              marginBottom: "15px",
                            }}
                          >
                            <div
                              className="form-check"
                              style={{ display: "flex" }}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                disabled
                              />
                              <label
                                className="form-check-label"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Skeleton width={60} height={30} /> (
                                <Skeleton width={10} />)
                              </label>
                            </div>
                          </li>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="shop-widget">
                    <h4 className="widget-title">Price Type</h4>
                    <div className="shop-cat-list">
                      {PriceType?.length ? (
                        <ul className="list-wrap">
                          {PriceType.map((item, index) => (
                            <li key={index}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`cat_${item._id}`}
                                  checked={filterPriceType.includes(
                                    item.paymentType
                                  )}
                                  onChange={(e) => {
                                    setFilterPriceType(
                                      (prevFilterPriceType) => {
                                        if (e.target.checked) {
                                          if (
                                            !prevFilterPriceType.includes(
                                              item.paymentType
                                            )
                                          ) {
                                            return [
                                              ...prevFilterPriceType,
                                              item.paymentType,
                                            ];
                                          }
                                        } else {
                                          return prevFilterPriceType.filter(
                                            (price_type) =>
                                              price_type !== item?.paymentType
                                          );
                                        }
                                        return prevFilterPriceType;
                                      }
                                    );
                                  }}
                                />

                                <label
                                  className="form-check-label"
                                  htmlFor={`cat_${item._id}`}
                                  style={{ fontSize: "14px" }}
                                >
                                  {item?.paymentType} ({item?.count})
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        Array.from({ length: 3 }).map((_, index) => (
                          <li
                            key={index}
                            style={{
                              listStyleType: "none",
                              marginBottom: "15px",
                            }}
                          >
                            <div
                              className="form-check"
                              style={{ display: "flex" }}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue=""
                                disabled
                              />
                              <label
                                className="form-check-label"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Skeleton width={60} height={30} /> (
                                <Skeleton width={10} />)
                              </label>
                            </div>
                          </li>
                        ))
                      )}
                    </div>
                  </div>
                </aside>
              </div>
              <div className="col-xl-9 col-lg-8">
                <div className="shop-top-wrap courses-top-wrap d-none d-lg-block">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="shop-top-left">
                        <p>We found {totalCourses} courses for you</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex justify-content-center justify-content-md-end align-items-center">
                        <ul
                          className="nav nav-tabs courses__nav-tabs"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link active"
                              id="grid-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#grid"
                              type="button"
                              role="tab"
                              aria-controls="grid"
                              aria-selected="true"
                            >
                              <svg
                                width={18}
                                height={18}
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 1H2C1.44772 1 1 1.44772 1 2V6C1 6.55228 1.44772 7 2 7H6C6.55228 7 7 6.55228 7 6V2C7 1.44772 6.55228 1 6 1Z"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 1H12C11.4477 1 11 1.44772 11 2V6C11 6.55228 11.4477 7 12 7H16C16.5523 7 17 6.55228 17 6V2C17 1.44772 16.5523 1 16 1Z"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 11H2C1.44772 11 1 11.4477 1 12V16C1 16.5523 1.44772 17 2 17H6C6.55228 17 7 16.5523 7 16V12C7 11.4477 6.55228 11 6 11Z"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 11H12C11.4477 11 11 11.4477 11 12V16C11 16.5523 11.4477 17 12 17H16C16.5523 17 17 16.5523 17 16V12C17 11.4477 16.5523 11 16 11Z"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="list-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#list"
                              type="button"
                              role="tab"
                              aria-controls="list"
                              aria-selected="false"
                            >
                              <svg
                                width={19}
                                height={15}
                                viewBox="0 0 19 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1.5 6C0.67 6 0 6.67 0 7.5C0 8.33 0.67 9 1.5 9C2.33 9 3 8.33 3 7.5C3 6.67 2.33 6 1.5 6ZM1.5 0C0.67 0 0 0.67 0 1.5C0 2.33 0.67 3 1.5 3C2.33 3 3 2.33 3 1.5C3 0.67 2.33 0 1.5 0ZM1.5 12C0.67 12 0 12.68 0 13.5C0 14.32 0.68 15 1.5 15C2.32 15 3 14.32 3 13.5C3 12.68 2.33 12 1.5 12ZM5.5 14.5H17.5C18.05 14.5 18.5 14.05 18.5 13.5C18.5 12.95 18.05 12.5 17.5 12.5H5.5C4.95 12.5 4.5 12.95 4.5 13.5C4.5 14.05 4.95 14.5 5.5 14.5ZM5.5 8.5H17.5C18.05 8.5 18.5 8.05 18.5 7.5C18.5 6.95 18.05 6.5 17.5 6.5H5.5C4.95 6.5 4.5 6.95 4.5 7.5C4.5 8.05 4.95 8.5 5.5 8.5ZM4.5 1.5C4.5 2.05 4.95 2.5 5.5 2.5H17.5C18.05 2.5 18.5 2.05 18.5 1.5C18.5 0.95 18.05 0.5 17.5 0.5H5.5C4.95 0.5 4.5 0.95 4.5 1.5Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-content " id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="grid"
                    role="tabpanel"
                    aria-labelledby="grid-tab"
                  >
                    <div className="row courses__grid-wrap row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
                      {loading ? (
                        Array.from({ length: 12 }).map((_, index) => (
                          <div className="col" key={index}>
                            <div className="courses__item-two shine__animate-item">
                              <div
                                className="courses__item-two-thumb"
                                style={{ marginBottom: "10px" }}
                              >
                                <Skeleton
                                  variant="rectangular"
                                  width={"100%"}
                                  height={160}
                                />
                                <div className="author">
                                  <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                    animation={false}
                                  />
                                </div>
                              </div>
                              <div className="courses__item-two-content">
                                <Skeleton width="40%" />
                                <h5 className="title">
                                  <Skeleton height={40} />
                                </h5>
                                <div className="courses__item-bottom">
                                  <div
                                    className="course__price"
                                    style={{ width: "50%" }}
                                  >
                                    <Skeleton width="40%" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : course?.length > 0 ? (
                        course.map((course) => renderCourseItem(course))
                      ) : (
                        <div
                          style={{
                            padding: "1rem",
                            textAlign: "center",
                            minWidth: "100%",
                            gridColumn: "1 / -1",
                          }}
                        >
                          <p style={{ fontWeight: "bold" }}>No Data Recorded</p>
                        </div>
                      )}
                    </div>
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
                  <div
                    className="tab-pane fade"
                    id="list"
                    role="tabpanel"
                    aria-labelledby="list-tab"
                  >
                    <div className="row courses__list-wrap row-cols-1">
                      {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <div className="col" key={index}>
                            <div className="courses__item-two shine__animate-item">
                              <div
                                className="courses__item-two-thumb"
                                style={{ width: "32%" }}
                              >
                                <NavLink
                                  to=""
                                  className="shine__animate-link"
                                  style={{ width: "100%" }}
                                >
                                  <Skeleton
                                    variant="rectangular"
                                    width={"100%"}
                                    height={180}
                                  />
                                </NavLink>
                              </div>
                              <div
                                className="courses__item-two-content"
                                style={{ width: "100%" }}
                              >
                                <a
                                  className="courses__item-tag"
                                  style={{
                                    backgroundColor: "#E8F9EF",
                                    color: "#04BC53",
                                  }}
                                >
                                  <Skeleton width={90} height={20} />
                                </a>
                                <h5 className="title">
                                  <NavLink to="">
                                    <Skeleton width={"40%"} height={20} />
                                  </NavLink>
                                </h5>
                                <p>
                                  <Skeleton width={"100%"} height={20} />
                                  <Skeleton width={"70%"} height={20} />
                                </p>
                                <div className="courses__item-bottom">
                                  <div className="author">
                                    <NavLink>
                                      <Skeleton
                                        variant="circular"
                                        width={40}
                                        height={40}
                                      />
                                    </NavLink>
                                    <NavLink>
                                      <Skeleton width={30} />
                                    </NavLink>
                                  </div>
                                  <div className="course__price">
                                    <h3 className="price">
                                      <Skeleton width={50} height={30} />
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : course?.length > 0 ? (
                        course.map((course) => renderCourseItemList(course))
                      ) : (
                        <div
                          style={{
                            padding: "1rem",
                            textAlign: "center",
                            minWidth: "100%",
                            gridColumn: "1 / -1",
                          }}
                        >
                          <p style={{ fontWeight: "bold" }}>No Data Recorded</p>
                        </div>
                      )}
                    </div>
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
              </div>
            </div>
          </div>
        </section>
        {/* all-courses-end */}
      </main>
      {/* main-area-end */}
    </>
  );
};

export default AllCourses;

const renderCourseItem = (course) => {
  const routeHandler = (id) => {
    const encryptedId = encrypt(id);
    window.location.href = `/CourseDetail/${encryptedId}`;
  };
  return (
    <div key={course?._id} className="col d-flex">
      <div
        className="courses__item-two shine__animate-item fix d-flex flex-column w-100"
        style={{ position: "relative" }}
      >
        <div className="courses__item-two-thumb">
          <NavLink
            to={""}
            onClick={() => {
              routeHandler(course?._id);
            }}
            className="shine__animate-link"
            style={{
              minHeight: "30vh",
              maxHeight: "30vh",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={course?.coverPage?.[0]}
              alt="img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </NavLink>
          <div className="author">
            <Avatar src={course?.createUser?.idCard} alt="img" />
          </div>
        </div>
        <div className="courses__item-two-content d-flex flex-column h-100">
          <NavLink
            className="courses__item-tag"
            style={{
              backgroundColor: "#E8F9EF",
              color: "#04BC53",
              fontSize: "11px",
              width: "fit-content",
            }}
          >
            {course?.categories}
          </NavLink>
          <h5 className="title">
            <NavLink
              to={``}
              onClick={() => {
                routeHandler(course?._id);
              }}
              style={{ textTransform: "capitalize" }}
            >
              {course?.courseName?.length > 40
                ? `${course?.courseName?.slice(0, 40)}...`
                : course?.courseName}
            </NavLink>
            {/* <p
              style={{
                fontSize: "12px",
                textAlign: "justify",
              }}
            >
              {course?.courseDescription?.length > 100
                ? `${course?.courseDescription?.slice(0, 100)}...`
                : course?.courseDescription}
            </p> */}
          </h5>
          <div style={{ flexGrow: 1 }}></div>
          <div className="courses__item-bottom">
            {course?.paymentType !== "free" && (
              <div className="course__price">
                <h3 className="price">{course?.price} <span style={{fontSize:"11px"}}>ETB</span></h3>
              </div>
            )}
            <div
              className="courses__item-rating"
              style={{
                position: "absolute",
                left: 0,
                top: 10,
                zIndex: 10,
                backgroundColor:
                  course?.paymentType === "free" ? "#345433" : "#D7A022",
                padding: "5px 10px",
                borderRadius: " 0 5px 0 0",
              }}
            >
              <span
                className="rating-count"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {course?.paymentType}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderCourseItemList = (course) => {
  const routeHandler = (id) => {
    const encryptedId = encrypt(id);
    window.location.href = `/CourseDetail/${encryptedId}`;
  };
  return (
    <div className="col" key={course?.course?.id}>
      <div className="courses__item-two shine__animate-item align-items-stretch">
        <div className="courses__item-two-thumb">
          <NavLink
            to={``}
            onClick={() => {
              routeHandler(course?._id);
            }}
            className="shine__animate-link "
            style={{ height: "30vh", overflow: "hidden" }}
          >
            <img src={course?.coverPage?.[0]} alt="img" />
          </NavLink>
        </div>
        <div className="courses__item-two-content" style={{ width: "100%" }}>
          <NavLink
            to={``}
            onClick={() => {
              routeHandler(course?._id);
            }}
            className="courses__item-tag"
            style={{
              backgroundColor: "#E8F9EF",
              color: "#04BC53",
            }}
          >
            {course?.categories}
          </NavLink>
          <h5 className="title">
            <NavLink
              to={``}
              onClick={() => {
                routeHandler(course?._id);
              }}
              style={{ textTransform: "capitalize" }}
            >
              {course?.courseName}
            </NavLink>
          </h5>
          <p>
            {course?.courseDescription?.length > 150
              ? `${course?.courseDescription?.slice(0, 150)}...`
              : course?.courseDescription}
          </p>
          <div className="courses__item-bottom">
            <div className="author">
              <Avatar src={course?.createUser?.idCard} alt="img" />
              <NavLink>Fancy Catering Academy</NavLink>
            </div>
            <div className="course__price">
              <h3 className="price">{course?.price} <span style={{fontSize:"11px"}}>ETB</span></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
