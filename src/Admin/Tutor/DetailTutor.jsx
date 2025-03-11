import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { back_base_url } from "../../util/config";
import { Modal, Box } from "@mui/material";
import { MdArrowBack } from "react-icons/md";

const DetailTutor = () => {
  const { id } = useParams();
  const [Tutor, setTutor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [AllClassName, setAllClassName] = useState();
  useEffect(() => {
    fetchTutor();
  }, [id]);

  const fetchTutor = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/users/getuserById/${id}`
      );
      setTutor(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };
  useEffect(() => {
    fetchAllClass();
  }, []);
  const fetchAllClass = async () => {
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/class/getClassesByTutorInstructorId/${id}`
      );
      setAllClassName(response.data.classes);
    } catch (error) {
      console.log(error);
    }
  };
  if (!Tutor) return <div>Loading...</div>;

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
          {Tutor.images?.[0] && (
            <div style={{ marginBottom: "10px" }}>
              <img
                src={Tutor.images[0]}
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
              <strong>Name: </strong>
              {Tutor.fullname || "N/A"}
            </span>
            <span style={{ marginBottom: "10px" }}>
              <strong>Email: </strong>
              {Tutor.email || "N/A"}
            </span>
            <span style={{ marginBottom: "10px" }}>
              <strong>Phone: </strong> {Tutor.phoneNumber || "N/A"}
            </span>
            <span style={{ marginBottom: "10px" }}>
              <strong>Gender: </strong>
              {Tutor.Gender || "N/A"}
            </span>
          </div>
        </div>
        <div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Location:</strong> {Tutor.Location || "N/A"}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Experience:</strong> {Tutor.Exprience || "N/A"}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Production Studio:</strong>{" "}
            {Tutor.productionstudio || "N/A"}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Total Earned:</strong>{" "}
            {Tutor.calculatedTotalAmountEarned || "N/A"}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Total Amount Earned:</strong>{" "}
            {Tutor.totalAmountEarned || "N/A"}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Status:</strong> {Tutor.status || "N/A"}
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
            {Tutor.idCard?.length > 0 ? (
              Tutor.idCard.map((item, index) => (
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
              ))
            ) : (
              <div>N/A</div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Tutor.instructorLicense?.length > 0 ? (
          Tutor.instructorLicense.map((item, index) => (
            <video
              src={item}
              key={index}
              controls
              muted={false}
              style={{
                width: "50%",
                height: "300px",
                borderRadius: "8px",
              }}
              poster={Tutor?.images[0]}
            ></video>
          ))
        ) : (
          <div>N/A</div>
        )}
      </div>

      <h3>Created classes by {Tutor.fullname || "N/A"}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
          padding: "2rem 0 ",
          alignItems: "start",
          width: "100%",
        }}
      >
        {AllClassName?.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              background: "#FFFFFF",
              borderRadius: "5px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
            // onClick={() => navigate(`/tutor/class-detail/${item._id}`)}
          >
            <h4>{item.className}</h4>
            <span>{item.availableTime[0].timeSlots[0]}</span>
            <span>Grade {item.grade}</span>
            <span>Capacity {item.howManyStudents} Students</span>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {item?.availableTime[0]?.day?.map((name) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      background: "#F87F98",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <span>{name.slice(0, 3)}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {item.price}{" "}
                <span style={{ fontSize: "11px" }}>ETB</span>
              </span>
              <span>{item?.userWhoHasEnrolled?.length} Student</span>
            </div>
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
            p: 4,
          }}
        >
          <img
            src={selectedImage}
            alt="Selected License"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default DetailTutor;
