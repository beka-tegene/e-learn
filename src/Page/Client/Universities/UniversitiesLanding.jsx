import React from "react";
import Navbar from "../../../Client/Universities/Layout/Navbar";
import Hero from "../../../Client/Universities/Landing/Hero";
import Companies from "../../../Client/Universities/Landing/Companies";
import Information from "../../../Client/Universities/Landing/Information";
import Content from "../../../Client/Universities/Landing/Content";
import Footer from "../../../Client/Individuals/Layout/Footer";

const UniversitiesLanding = () => {
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

export default UniversitiesLanding;
