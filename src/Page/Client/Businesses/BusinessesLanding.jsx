import React from "react";
import Navbar from "../../../Client/Businesses/Layout/Navbar";
import Hero from "../../../Client/Businesses/Landing/Hero";
import Companies from "../../../Client/Businesses/Landing/Companies";
import Content from "../../../Client/Businesses/Landing/Content";
import Information from "../../../Client/Businesses/Landing/Information";
import Footer from "../../../Client/Individuals/Layout/Footer";

const BusinessesLanding = () => {
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

export default BusinessesLanding;
