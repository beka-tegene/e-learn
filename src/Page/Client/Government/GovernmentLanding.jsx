import React from "react";
import Navbar from "../../../Client/Government/Layout/Navbar";
import Hero from "../../../Client/Government/Landing/Hero";
import Companies from "../../../Client/Government/Landing/Companies";
import Information from "../../../Client/Government/Landing/Information";
import Content from "../../../Client/Government/Landing/Content";
import Footer from "../../../Client/Individuals/Layout/Footer";

const GovernmentLanding = () => {
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

export default GovernmentLanding;
