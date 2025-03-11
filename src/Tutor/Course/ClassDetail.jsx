import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { back_base_url } from "../../util/config";

const ClassDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [singleClassName, setSingleClassName] = useState();
  useEffect(() => {
    fetchAllClass();
  }, []);
  const fetchAllClass = async () => {
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/class/getClassById/${id}`
      );
      setSingleClassName(response.data.class);
    } catch (error) {
      console.log(error);
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
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "start",
      }}
    >
      <button onClick={() => window.history.back()}>
        <MdArrowBack size={16} /> Back
      </button>
      <div
        style={{
          background: "#ffffff",
          padding: "1rem",
          borderRadius: "6px",
          width: "100%",
        }}
      >
        <h4>{singleClassName?.className}</h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{singleClassName?.availableTime[0]?.timeSlots[0]}</span>
          <span>Grade {singleClassName?.grade}</span>
        </div>
        <span>Capacity {singleClassName?.howManyStudents} Students</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            {singleClassName?.price}
            <span style={{ fontSize: "11px" }}>ETB</span>
          </span>
          <span>{singleClassName?.userWhoHasEnrolled?.length} Student</span>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              padding: "5px 25px",
              border: "none",
              borderRadius: "5px", 
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={()=>navigate(`/kts/room/${singleClassName?.roomId}`)}
          >
            Join Class
          </button>
        </div>
      </div>
      {/* <table style={{ width: "100%" }}>
        <tr
          style={{ background: "#FEFEFE", borderBottom: "1px solid #AFAFAF" }}
        >
          <th style={{ padding: "10px 20px" }}>Name</th>
          <th style={{ padding: "10px 20px" }}>Name</th>
          <th style={{ padding: "10px 20px" }}>Name</th>
        </tr>
        <tr>
          <td style={{ padding: "10px 20px" }}>hello</td>
          <td style={{ padding: "10px 20px" }}>hello</td>
          <td style={{ padding: "10px 20px" }}>hello</td>
        </tr>
        <tr>
          <td style={{ padding: "10px 20px" }}>hello</td>
          <td style={{ padding: "10px 20px" }}>hello</td>
          <td style={{ padding: "10px 20px" }}>hello</td>
        </tr>
      </table> */}
    </div>
  );
};

export default ClassDetail;
