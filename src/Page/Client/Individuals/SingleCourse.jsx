import React from "react";
import Navbar from "../../../Client/Individuals/Layout/Navbar";
import Footer from "../../../Client/Individuals/Layout/Footer";
import CourseDetail from "../../../Client/Individuals/Course/CourseDetail";

const SingleCourse = () => {
  return (
    <div>
      <Navbar />
      <CourseDetail />
      <div className=" d-none d-lg-block">
        <Footer />
      </div>
    </div>
  );
};

export default SingleCourse;
