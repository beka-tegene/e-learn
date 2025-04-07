import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { back_base_url } from "../../util/config";

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "14px",
  width: "100%",
};

const labelStyle = {
  fontWeight: "600",
  marginBottom: "6px",
  fontSize: "14px",
};

const sectionStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "25px",
};

const PageUpdate = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    heroTitle: "",
    heroSubtitle: "",
    aboutName: "",
    aboutDescription: "",
    aboutYears: "",
    serviceTitle: "",
    serviceDescription: "",
    location: "",
    phone: "",
    email: "",
    logo: null,
    aboutImage: null,
    heroImage: null, // ✅ NEW FIELD
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    let hasData = false;

    const appendIfFilled = (key, value) => {
      if (value !== null && value !== "" && value !== undefined) {
        data.append(key, value);
        hasData = true;
      }
    };

    appendIfFilled("heroSection[title]", form.heroTitle);
    appendIfFilled("heroSection[subtitle]", form.heroSubtitle);
    appendIfFilled("about[0][name]", form.aboutName);
    appendIfFilled("about[0][description]", form.aboutDescription);
    appendIfFilled("about[0][yearsExperience]", form.aboutYears);
    appendIfFilled("services[0][title]", form.serviceTitle);
    appendIfFilled("services[0][description]", form.serviceDescription);
    appendIfFilled("contactUs[location]", form.location);
    appendIfFilled("contactUs[phone]", form.phone);
    appendIfFilled("contactUs[email]", form.email);
    appendIfFilled("logo", form.logo);
    appendIfFilled("aboutImage0", form.aboutImage);
    appendIfFilled("heroImage", form.heroImage); // ✅ NEW APPEND

    if (!hasData) {
      toast.warning("Please fill in at least one field before submitting.");
      return;
    }

    try {
      const response = await axios.put(
        `${back_base_url}api/v1/page/update`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          maxBodyLength: Infinity,
        }
      );
      toast.success("Page updated successfully!");
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to update page!");
      console.error(error);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <ToastContainer />
      <h2 style={{ marginBottom: "30px", fontSize: "24px" }}>Update Page Content</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {step === 1 && (
          <>
            <h4>Hero Section</h4>
            <div style={sectionStyle}>
              <div>
                <label style={labelStyle}>Hero Title</label>
                <input type="text" name="heroTitle" onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Hero Subtitle</label>
                <input type="text" name="heroSubtitle" onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <h4>About</h4>
            <div style={sectionStyle}>
              <div>
                <label style={labelStyle}>About Name</label>
                <input type="text" name="aboutName" onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Years of Experience</label>
                <input type="text" name="aboutYears" onChange={handleChange} style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: "25px" }}>
              <label style={labelStyle}>About Description</label>
              <textarea name="aboutDescription" onChange={handleChange} style={{ ...inputStyle, height: "80px" }} />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h4>Service</h4>
            <div style={{ marginBottom: "25px" }}>
              <label style={labelStyle}>Service Title</label>
              <input type="text" name="serviceTitle" onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ marginBottom: "25px" }}>
              <label style={labelStyle}>Service Description</label>
              <textarea name="serviceDescription" onChange={handleChange} style={{ ...inputStyle, height: "80px" }} />
            </div>

            <h4>Contact Us</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "20px",
                marginBottom: "25px",
              }}
            >
              <div>
                <label style={labelStyle}>Location</label>
                <input type="text" name="location" onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input type="text" name="phone" onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" name="email" onChange={handleChange} style={inputStyle} />
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h4>Images</h4>
            <div style={sectionStyle}>
              <div>
                <label style={labelStyle}>Logo Image</label>
                <input type="file" name="logo" accept="image/*" onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>About Image</label>
                <input type="file" name="aboutImage" accept="image/*" onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Hero Image</label>
                <input type="file" name="heroImage" accept="image/*" onChange={handleChange} style={inputStyle} />
              </div>
            </div>
          </>
        )}

        <div style={{ marginTop: "40px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              style={{
                padding: "10px 25px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          )}

          {step < 3 && (
            <button
              type="button"
              onClick={nextStep}
              style={{
                padding: "10px 25px",
                borderRadius: "8px",
                backgroundColor: "#B38000",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
              }}
            >
              Next
            </button>
          )}

          <button
            type="submit"
            style={{
              padding: "10px 25px",
              borderRadius: "8px",
              backgroundColor: "#614500",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Update Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageUpdate;
