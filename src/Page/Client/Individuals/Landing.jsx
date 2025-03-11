import React from "react";
import Navbar from "../../../Client/Individuals/Layout/Navbar";
import Hero from "../../../Client/Individuals/Landing/Hero";
import Highlight from "../../../Client/Individuals/Landing/Highlight";
import PopularCourses from "../../../Client/Individuals/Landing/PopularCourses";
import LetUsHelpOne from "../../../Client/Individuals/Landing/LetUsHelpOne";
import AboutSection from "../../../Client/Individuals/Landing/AboutSection";
import NewsletterArea from "../../../Client/Individuals/Landing/NewsletterArea";
import CategoriesArea from "../../../Client/Individuals/Landing/CategoriesArea";
import Footer from "../../../Client/Individuals/Layout/Footer";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <Highlight /> */}
      <PopularCourses />
      <LetUsHelpOne />
      <AboutSection />
      <NewsletterArea />
      <CategoriesArea />
      <div className=" d-none d-lg-block">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
