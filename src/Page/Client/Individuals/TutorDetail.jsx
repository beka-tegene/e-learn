import React from "react";
import Navbar from "../../../Client/Individuals/Layout/Navbar";
import Footer from "../../../Client/Individuals/Layout/Footer";
import DetailTutor from "../../../Client/Individuals/Tutor/DetailTutor";

const TutorDetail = () => {
  return (
    <div>
      <Navbar />
      <DetailTutor />
      <div className=" d-none d-lg-block">
        <Footer />
      </div>
    </div>
  );
};

export default TutorDetail;
