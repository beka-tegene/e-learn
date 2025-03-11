import React, { useState } from "react";
import axios from "axios";
import { back_base_url } from "../../../util/config";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { CircularProgress } from "@mui/material";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [learner, setLearner] = useState("");
  const [nonprofit, setNonprofit] = useState(false); 
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); 

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await axios.post(
        `${back_base_url}api/v1/contact/contacts`,
        {
          firstName,
          lastName,
          companyName,
          companySize,
          phoneNumber,
          workEmail,
          jobTitle,
          expectedLearners: learner,
          nonprofit,
          country,
          description,
        }
      );
      toast.success("Form submitted successfully!"); 
    } catch (error) {
      toast.error("Something went wrong. Please try again." );
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div
      className="herobannerarea herobannerarea__2"
      style={{ padding: "3rem 0" }}
    >
      <ToastContainer />
      <div className="container">
        <div className="row align-items-center" style={{ minHeight: "80vh" }}>
          <div
            className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
            data-aos="fade-up"
          >
            <div
              className="herobannerarea__content__wraper"
              style={{ textAlign: "justify" }}
            >
              <div className="herobannerarea__title">
                <div className="herobannerarea__title__heading__2 herobannerarea__title__heading__3">
                  <h2>Empower Your Team's Growth with Fancy Catering Academy</h2>
                </div>
              </div>
              <div className="herobannerarea__text herobannerarea__text__2">
                <ul>
                  <li>
                    <strong>Streamlined Training:</strong> Enhance employee
                    skills efficiently through our intuitive learning platform.
                  </li>
                  <li>
                    <strong>Customizable Courses: </strong> Tailor learning
                    paths to fit your company's unique needs and goals.
                  </li>
                  <li>
                    <strong>Engaging Content:</strong> Keep your team motivated
                    with interactive and multimedia-rich learning materials.
                  </li>
                  <li>
                    <strong>Performance Tracking:</strong> Monitor progress and
                    assess learning outcomes effortlessly.
                  </li>
                  <li>
                    <strong>Scalable Solutions:</strong> Whether you have a team
                    of 10 or 10,000, our platform scales with your business.
                  </li>
                  <li>
                    <strong>24/7 Support:</strong> Our dedicated support team is
                    here to assist you at every step of the way.
                  </li>
                </ul>
              </div>
              <div className="hreobannerarea__button__2 mt-2">
                <p
                  style={{
                    width: "fit-content",
                    color: "#22B04A",
                    padding: "0 10px",
                    borderRadius: "5px",
                  }}
                >
                  Ready to Transform Your Team's Learning Experience? Contact Us
                  Today!
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
            data-aos="fade-up"
          >
            <div
              className="p-4"
              style={{
                background: "#FEFCFA",
                borderRadius: "7px",
                border: "1px solid",
              }}
            >
              <form
                action=""
                className="d-flex flex-column gap-2"
                onSubmit={submitHandler}
              >
                <div className="d-flex gap-2">
                  <div className="d-flex flex-column w-100">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <div className="d-flex flex-column w-100">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <div className="d-flex flex-column w-100">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                      type="text"
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <div className="d-flex flex-column w-100">
                    <label htmlFor="companySize">Company Size</label>
                    <input
                      type="text"
                      id="companySize"
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <div className="d-flex flex-column w-100">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <div className="d-flex flex-column w-100">
                    <label htmlFor="workEmail">Work Email Address</label>
                    <input
                      type="email"
                      id="workEmail"
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <div className="d-flex flex-column w-100">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input
                      type="text"
                      id="jobTitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <div className="d-flex flex-column w-100">
                    <label htmlFor="learner">Expected Number Of Learners</label>
                    <input
                      type="text"
                      id="learner"
                      value={learner}
                      onChange={(e) => setLearner(e.target.value)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="checkbox"
                    id="nonprofit"
                    checked={nonprofit}
                    onChange={(e) => setNonprofit(e.target.checked)}
                    style={{ width: "auto" }}
                  />
                  <label htmlFor="nonprofit">
                    Do you work for a government or nonprofit agency?
                  </label>
                </div>
                <div className="d-flex flex-column w-100">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                <div className="d-flex flex-column w-100">
                  <label htmlFor="description">
                    Which best describes your needs?
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                <div>
                  <button
                    className="w-100 p-2"
                    style={{
                      background: "#D9A128",
                      color: "white",
                      fontSize: "15px",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {loading ?  <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />: "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
