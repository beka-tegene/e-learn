import { useEffect, useState } from "react";
import Navbar from "../../../Client/Individuals/Layout/Navbar";
import Hero from "../../../Client/Individuals/Landing/Hero";
import PopularCourses from "../../../Client/Individuals/Landing/PopularCourses";
import LetUsHelpOne from "../../../Client/Individuals/Landing/LetUsHelpOne";
import AboutSection from "../../../Client/Individuals/Landing/AboutSection";
import NewsletterArea from "../../../Client/Individuals/Landing/NewsletterArea";
import CategoriesArea from "../../../Client/Individuals/Landing/CategoriesArea";
import Footer from "../../../Client/Individuals/Layout/Footer";

const Landing = () => {
  const [pageData, setPageData] = useState({});
  useEffect(() => {
    pageDataFetch();
  }, []);
  const pageDataFetch = async () => {
    try {
      await fetch("https://update.fancypastryacademy.com/api/v1/page")
        .then((res) => res.json())
        .then((data) => {
          setPageData(data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(pageData);

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
