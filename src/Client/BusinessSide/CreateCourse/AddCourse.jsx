import { MdAdd, MdDelete } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCourse } from "../../../Store/Hooks/CourseHook";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { CircularProgress } from "@mui/material";

const names = ["Individual", "Government", "Business"];

const AddCourse = () => {
  const [coverPhoto, setCoverPhoto] = useState();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [aboutCourse, setAboutCourse] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwt_decode(token);

      setUserId(decodedToken.userId);
    }
  }, []);

  const handleChangeCoverPhoto = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handleChangeCourseTitle = (e) => {
    setCourseTitle(e.target.value);
  };

  const handleChangeCourseDescription = (e) => {
    setCourseDescription(e.target.value);
  };

  const handleChangeCourseCategory = (e) => {
    setCourseCategory(e.target.value);
  };

  const handleChangeCourseDuration = (e) => {
    setCourseDuration(e.target.value);
  };

  // const handleChangePriceType = (e) => {
  //   setPriceType(e.target.value);
  // };

  // const handleChangePayment = (e) => {
  //   setPayment(e.target.value);
  // };

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handlerSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("coverPage", coverPhoto);
    formData.append("courseName", courseTitle);
    formData.append("courseDescription", courseDescription);
    formData.append("categories[0]", courseCategory);
    formData.append("courseDuration", courseDuration);
    formData.append("paymentType", "free");
    formData.append("price", 0);
    formData.append("aboutCourse", aboutCourse);
    formData.append("createCourseas", "Buisness");
    formData.append("userId", userId);
    try {
      dispatch(setCourse(formData));
    } catch (error) {
      toast.error("something went wrong");
    }finally{
      setInterval(()=>{
        setLoading(false);
      },2000)
    }
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#F7F7F7",
        padding: "10px 20px",
        height: "87vh",
        overflowY: "scroll",
      }}
    >
      <ToastContainer />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "7fr 3fr",
          gap: "8px",
          justifyContent: "flex-start",
          alignItems: "start",
          width: "100%",
        }}
      >
        <form
          onSubmit={handlerSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingTop: "10px",
            width: "90%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label htmlFor="Cover-Photo">Cover Photo</label>
            <input
              type="file"
              id="Cover-Photo"
              onChange={handleChangeCoverPhoto}
              style={{
                padding: "4px 8px",
                border: "1px solid",
                outline: "none",
                borderRadius: "8px",
              }}
              accept="image/*"
              hidden
              required
            />
            <div
              style={{
                height: "40vh",
                width: "100%",
                background: "#FFFFFF",
                padding: "15px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                border: `2px dotted ${coverPhoto ? "#90CDF4" : "#E2E8F0"}`,
              }}
            >
              {coverPhoto ? (
                <img
                  src={URL.createObjectURL(coverPhoto)}
                  alt="Cover Photo Preview"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    borderRadius: "6px",
                  }}
                />
              ) : (
                <label
                  htmlFor="Cover-Photo"
                  style={{
                    background: "#90CDF4",
                    padding: "6px 25px",
                    borderRadius: "4px",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Upload Cover Photo
                </label>
              )}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label htmlFor="course-title">Course Title</label>
            <input
              type="text"
              id="course-title"
              onChange={handleChangeCourseTitle}
              style={{
                padding: "4px 8px",
                border: "1px solid",
                outline: "none",
                borderRadius: "8px",
              }}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label htmlFor="course-description">Course Description</label>
            <input
              type="text"
              id="course-description"
              onChange={handleChangeCourseDescription}
              style={{
                padding: "4px 8px",
                border: "1px solid",
                outline: "none",
                borderRadius: "8px",
              }}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label htmlFor="course-category">Course Category</label>
            <select
              id="course-category"
              onChange={handleChangeCourseCategory}
              style={{
                padding: "8px",
                border: "1px solid",
                outline: "none",
                borderRadius: "8px",
              }}
              required
            >
              <option selected disabled></option>
              <option value="Accounting & Finance">Accounting & Finance</option>
              <option value="Arts & Crafts">Arts & Crafts</option>
              <option value="Beauty & Makeup">Beauty & Makeup</option>
              <option value="Business & Marketing">Business & Marketing</option>
              <option value="Creatives & Design">Creatives & Design</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="IT & Development">IT & Development</option>
              <option value="Language & Literature">
                Language & Literature
              </option>
              <option value="Music & Theatre">Music & Theatre</option>
              <option value="Office Productivity">Office Productivity</option>
              <option value="Personal Development">Personal Development</option>
              <option value="Photography & Videography">
                Photography & Videography
              </option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                width: "100%",
              }}
            >
              <label htmlFor="course-duration">Course Duration</label>
              <input
                type="text"
                id="course-duration"
                onChange={handleChangeCourseDuration}
                style={{
                  padding: "4px 8px",
                  border: "1px solid",
                  outline: "none",
                  borderRadius: "8px",
                }}
                required
              />
            </div>
          </div>
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                width: "100%",
              }}
            >
              <label htmlFor="price-type">Price Type</label>
              <select
                id="price-type"
                onChange={handleChangePriceType}
                style={{
                  padding: "8px",
                  border: "1px solid",
                  outline: "none",
                  borderRadius: "8px",
                }}
              >
                <option selected disabled></option>
                <option value="paid">paid</option>
                <option value="free">Free</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                width: "100%",
              }}
            >
              <label htmlFor="payment">Payment</label>
              <input
                type="number"
                id="payment"
                onChange={handleChangePayment}
                style={{
                  padding: "4px 8px",
                  border: "1px solid",
                  outline: "none",
                  borderRadius: "8px",
                }}
                placeholder="0"
                min="0"
                pattern="[0-2000]"
              />
            </div>
          </div> */}

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label htmlFor="">
              Requirement , objectives and Target Audience
            </label>
            <ReactQuill
              style={{ height: "30vh", marginBottom: "2.5rem" }}
              theme="snow"
              onChange={(html) => setAboutCourse(html)}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "4px 0",
            }}
          >
            <button
              style={{
                backgroundColor: "#defeeb",
                borderRadius: "8px",
                padding: "8px 20px",
                color: "#166534",
                border: "1px solid #166534",
                fontWeight: "bold",
              }}
              type="reset"
            >
              Cancel
            </button>
            <div style={{ flexGrow: 1 }}></div>
            <button
              style={{
                backgroundColor: "#166534",
                borderRadius: "8px",
                padding: "8px 20px",
                color: "#FFFFFF",
                border: "1px solid #166534",
                fontWeight: "bold",
              }}
              type="submit"
            >
              {loading ? (
                <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
              ) : (
                "Next"
              )}
            </button>
          </div>
        </form>
        <div
          style={{
            backgroundColor: "white",
            padding: "8px",
            borderRadius: "8px",
            position: "sticky",
            top: "20px",
          }}
        >
          <h1
            style={{ fontWeight: "bold", fontSize: "24px", color: "#DFA035" }}
          >
            Course Upload Tips
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
