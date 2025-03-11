import React from "react";
import Navbar from "../../../Client/Individuals/Layout/Navbar";
import Footer from "../../../Client/Individuals/Layout/Footer";
import AboutDetail from "../../../Client/Individuals/About/AboutDetail";

const About = () => {
  return (
    <div>
      <Navbar />
      <AboutDetail />
      <div className=" d-none d-lg-block">
        <Footer />
      </div>
    </div>
  );
};

export default About;
