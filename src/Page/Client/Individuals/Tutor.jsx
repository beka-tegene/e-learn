import React from "react";
import AllTutor from "../../../Client/Individuals/Tutor/AllTutor";
import Navbar from "../../../Client/Individuals/Layout/Navbar";
import Footer from "../../../Client/Individuals/Layout/Footer";

const Tutor = () => {
  return (
    <div>
      <Navbar />
      <AllTutor />
      <div className=" d-none d-lg-block">
        <Footer />
      </div>
    </div>
  );
};

export default Tutor;
