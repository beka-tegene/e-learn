import React, { useEffect, useState } from "react";
import { NavLink, useMatch, useParams } from "react-router-dom";
import Overview from "./Detail/Overview";
import ChaptersLessons from "./Detail/ChaptersLessons";
import EnrollmentInfo from "./Detail/EnrollmentInfo";
import ReviewsRatings from "./Detail/ReviewsRatings";
import axios from "axios";
import { back_base_url } from "../../util/config";
import { MdArrowBack } from "react-icons/md";

const CourseDetails = () => {
  const { id } = useParams();
  const overviewLink = useMatch("/admin/course_list/:id");
  const ChaptersLessonsLink = useMatch(
    "/admin/course_list/:id/chapters-lessons"
  );
  const EnrollmentInfoLink = useMatch("/admin/course_list/:id/enrollment-info");
  const ReviewsRatingsLink = useMatch("/admin/course_list/:id/reviews-ratings");

  const [filterCourse, setFilterCourse] = useState([]);
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${back_base_url}api/v1/course/${id}`);
      setFilterCourse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "10px", height: "87vh", overflowY: "scroll" }}>
      <button onClick={() => window.history.back()}>
        <MdArrowBack size={16} /> Back
      </button>
      <div style={{ padding: "15px" }}>
        <header>
          <h4>{filterCourse?.courseName}</h4>
          <p>Instructor {filterCourse?.createUser?.fullname}</p>
        </header>
        <nav
          className="d-flex gap-3 align-items-center"
          style={{ borderBottom: "2px solid #eee" }}
        >
          <NavLink
            to={`/admin/course_list/${filterCourse?._id}`}
            style={{
              color: overviewLink ? "#DFA035" : "",
              fontWeight: overviewLink ? "bold" : "",
              border: overviewLink ? "1px solid #DFA035" : "",
              padding: "0 4px",
            }}
          >
            Overview
          </NavLink>
          <NavLink
            to={`/admin/course_list/${filterCourse?._id}/chapters-lessons`}
            style={{
              color: ChaptersLessonsLink ? "#DFA035" : "",
              fontWeight: ChaptersLessonsLink ? "bold" : "",
              border: ChaptersLessonsLink ? "1px solid #DFA035" : "",
              padding: "0 4px",
            }}
          >
            Chapters & Lessons
          </NavLink>
          <NavLink
            to={`/admin/course_list/${filterCourse?._id}/enrollment-info`}
            style={{
              color: EnrollmentInfoLink ? "#DFA035" : "",
              fontWeight: EnrollmentInfoLink ? "bold" : "",
              border: EnrollmentInfoLink ? "1px solid #DFA035" : "",
              padding: "0 4px",
            }}
          >
            Enrollment Info
          </NavLink>
          <NavLink
            to={`/admin/course_list/${filterCourse?._id}/reviews-ratings`}
            style={{
              color: ReviewsRatingsLink ? "#DFA035" : "",
              fontWeight: ReviewsRatingsLink ? "bold" : "",
              border: ReviewsRatingsLink ? "1px solid #DFA035" : "",
              padding: "0 4px",
            }}
          >
            Reviews & Ratings
          </NavLink>
        </nav>
        {overviewLink && <Overview filterCourse={filterCourse} />}
        {ChaptersLessonsLink && <ChaptersLessons filterCourse={filterCourse} />}
        {EnrollmentInfoLink && <EnrollmentInfo filterCourse={filterCourse} />}
        {ReviewsRatingsLink && <ReviewsRatings filterCourse={filterCourse} />}
      </div>
    </div>
  );
};

export default CourseDetails;
