import React from "react";
import Navbar from "../../../Client/School/Layout/Navbar";
import Hero from "../../../Client/School/Landing/Hero";
import Companies from "../../../Client/School/Landing/Companies";
import Information from "../../../Client/School/Landing/Information";
import Content from "../../../Client/School/Landing/Content";
import Footer from "../../../Client/Individuals/Layout/Footer";

const SchoolLanding = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Companies />
      <Information />
      <Content />
      <Footer />
    </div>
  );
};

export default SchoolLanding;
