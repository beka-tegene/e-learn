import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseByIdData } from "../../Store/Hooks/CourseHook";
import {
  MdArrowBack,
  MdBook,
  MdOutlineDownloading,
  MdTimer,
} from "react-icons/md";
import { Modal, Box } from "@mui/material";
import { back_base_url } from "../../util/config";
import { toast } from "react-toastify";
import { background } from "@chakra-ui/react";

const DetailTeacher = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [students, setStudents] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const instructorCourse = useSelector(
    (state) => state.CourseHook.outputCoursesById
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseByIdData({ data: { decodedUserId: id } }));
  }, [id, dispatch]);

  useEffect(() => {
    const fetchTeacher = async () => {
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.get(
          `${back_base_url}api/v1/users/getuserById/${id}`
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchTeacher();
  }, [id]);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedImage;
    link.download = `license-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [percentage, setPercentage] = useState();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${back_base_url}api/v1/users/instructor/${id}/earnings`,
        {
          percentage,
        }
      );
      if (res.status === 201) {
        navigate(0);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  if (!students) {
    return <div>Loading...</div>;
  }
  return (
    <div
      style={{
        padding: "20px",
        height: "87vh",
        overflowY: "scroll",
        backgroundColor: "#f9f9f9",
      }}
    >
      <button onClick={() => window.history.back()}>
        <MdArrowBack size={16} /> Back
      </button>
      <div
        style={{
          marginBottom: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          padding: "2rem 1rem",
          alignItems: "start",
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#FeFeFe",
            padding: "20px",
            borderRadius: "5px",
            lineHeight: ".9",
          }}
        >
          {students.idCard?.[0] && (
            <div style={{ marginBottom: "10px" }}>
              <img
                src={students.idCard[0]}
                alt="ID Card"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ marginBottom: "10px" }}>
              <strong>Name : </strong>
              {students?.fullname || "N/A"}
            </span>
            <span style={{ marginBottom: "10px" }}>
              <strong>Email : </strong>
              {students?.email || "N/A"}
            </span>
            <span style={{ marginBottom: "10px" }}>
              <strong>Phone : </strong> {students?.phoneNumber || "N/A"}
            </span>
            <span style={{ marginBottom: "10px" }}>
              <strong>Gender : </strong>
              {students?.Gender || "N/A"}
            </span>
          </div>
        </div>
        <div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Location:</strong> {students?.Location || "N/A"}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Experience:</strong> {students?.Exprience || "N/A"}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Production Studio:</strong>{" "}
            {students?.productionstudio || "N/A"}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Total Earned:</strong>
            {students?.calculatedTotalAmountEarned || "N/A"}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Total Amount Earned:</strong> {students?.totalAmountEarned}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Production Studio :</strong> {students?.productionstudio}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Status:</strong> {students?.status || "N/A"}
          </div>
          <strong>Instructor Licenses:</strong>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
              alignItems: "start",
              width: "100%",
              position: "relative",
            }}
          >
            {students?.instructorLicense?.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                {students?.instructorLicense?.map((item, index) => (
                  <img
                    src={item}
                    alt={`License ${index + 1}`}
                    key={index}
                    onClick={() => handleOpen(item)}
                    style={{
                      width: "100%",
                      height: "100px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      margin: "5px",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <form
          onSubmit={submitHandler}
          style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}
        >
          <div style={{ width: "fit-content" }}>
            <label
              htmlFor="Agreement"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Instructor Agreement
            </label>
            <select
              name="Agreement"
              id="Agreement"
              style={{
                width: "fit-content",
                padding: "8px",
                borderRadius: "4px",
              }}
              onChange={(e) => setPercentage(e.target.value)}
            >
              <option selected disabled>
                Select an option
              </option>
              <option value="60">60%</option>
              <option value="40">40%</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              style={{
                padding: "5px 30px",
                borderRadius: "4px",
                backgroundColor: "#DFA035",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <h3>Created Course by {students?.fullname || "N/A"}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          padding: "2rem 1rem",
          alignItems: "start",
          width: "100%",
        }}
      >
        {instructorCourse?.[0]?.data?.map((item, index) => (
          <div
            style={{
              borderRadius: "8px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              backgroundColor: "#FEFBFA",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              position: "relative",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            key={index}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";
            }}
            onClick={() => navigate(`/admin/course_list/${item?._id}`)}
          >
            <div style={{ height: "28vh", width: "100%", overflow: "hidden" }}>
              <img
                src={item.coverPage[0]}
                alt="img1"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <MdBook /> {item?.chapter?.length} Chapters
              </span>
              <span
                style={{ color: "gray", display: "flex", alignItems: "center" }}
              >
                <MdTimer /> {item?.courseDuration}
              </span>
            </div>
            <h1 style={{ fontSize: "15px", fontWeight: "bold" }}>
              {item?.courseName?.length > 70
                ? `${item?.courseName?.slice(0, 70)}...`
                : item?.courseName}
            </h1>
            <h1 style={{ fontSize: "13px", fontWeight: "400" }}>
              {item?.courseDescription?.length > 80
                ? `${item?.courseDescription?.slice(0, 80)}...`
                : item?.courseDescription}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  color:
                    item?.status === "Approved"
                      ? "#008000"
                      : item?.status === "Pending"
                      ? "#DFA035"
                      : "#E64E4E",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "start",
                  gap: "28px",
                }}
              >
                {item?.status}
              </span>
              <span
                style={{
                  fontSize: "18px",
                  color: "#DFA035",
                  fontWeight: "bold",
                }}
              >
                {item?.price} ETB
              </span>
            </div>
            <span
              style={{
                position: "absolute",
                backgroundColor:
                  item.paymentType === "free" ? "green" : "goldenrod",
                left: "0",
                color: "white",
                padding: "0 10px",
                fontWeight: "bold",
                textTransform: "capitalize",
                borderRadius: "0 10px 0 0",
              }}
            >
              {item?.paymentType}
            </span>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            // p: 4,
            width: "50%",
          }}
        >
          <div
            style={{
              textAlign: "right",
              padding: "10px",
              cursor: "pointer",
              "&:hover": { background: "blue" },
            }}
          >
            <MdOutlineDownloading size={28} onClick={handleDownload}/>
          </div>

          <img
            src={selectedImage}
            alt="Selected License"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              padding: "28px",
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default DetailTeacher;
