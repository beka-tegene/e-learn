import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { back_base_url } from "../../util/config";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const [tutor, setTutor] = useState();
  const [AllClassName, setAllClassName] = useState();
  useEffect(() => {
    fetchAllClass();
  }, []);
  const fetchAllClass = async () => {
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/class/getClassesByTutorInstructorId/${decodedToken?.userId}`
      );
      setAllClassName(response.data.classes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${back_base_url}api/v1/users/getuserById/${decodedToken?.userId}`
        );
        setTutor(res.data);
      } catch (error) {
        // toast.error("something went wrong");
      }
    };
    fetchData();
  }, []);
  return (
    <div style={{ background: "#F7F7F7", height: "87vh", overflowX: "scroll" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            padding: "1rem",
            borderRadius: "6px",
          }}
        >
          <h1>{AllClassName?.length}+</h1>
          <span>Classes</span>
        </div>
        <div
          style={{
            background: "#FFFFFF",
            padding: "1rem",
            borderRadius: "6px",
          }}
        >
          <h1>
            {Math.floor(tutor?.totalAmountEarned)}
            <span style={{ fontSize: "12px" }}>ETB</span>
          </h1>
          <span>Balance</span>
        </div>
        <div></div>
        <div></div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
          padding: "2rem 1rem ",
          alignItems: "start",
          width: "100%",
        }}
      >
        {AllClassName?.slice(0, 4)?.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              background: "#FFFFFF",
              cursor: "pointer",
              borderRadius: "5px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
            onClick={() => navigate(`/tutor/class-detail/${item._id}`)}
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
                {item.price} <span style={{ fontSize: "11px" }}>ETB</span>
              </span>
              <span>{item?.userWhoHasEnrolled?.length} Student</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
