import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { back_base_url } from "../../util/config";
import axios from "axios";
import { MdArrowBack, MdBook, MdTimer } from "react-icons/md";

const DetailStudent = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  useEffect(() => {
    if (student) {
      fetchCourses();
    }
  }, [student]);

  const fetchStudent = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/users/getuserById/${id}`
      );
      setStudent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourses = async () => {
    try {
      if (!student?.enrolledCourses) {
        return;
      }

      const coursePromises = student.enrolledCourses.map((item) =>
        axios.get(`${back_base_url}api/v1/course/${item?.course}`)
      );

      const courseResponses = await Promise.all(coursePromises);
      const validCourses = courseResponses
        .filter((response) => response.status === 200)
        .map((response) => response.data);

      setCourses(validCourses);
    } catch (error) {
      console.error("Error fetching courses:");
    }
  };

  return (
    <div style={{ padding: "20px", height: "87vh", overflowY: "scroll" }}>
      <div>
        <button onClick={() => window.history.back()}>
          <MdArrowBack size={16} /> Back
        </button>
        <div style={{padding:"10px 20px"}}>
          <h4>Student Details</h4>
          {student ? (
            <ul style={{padding:"5px 15px" ,display:"flex",flexDirection:"column",gap:".5rem"}}>
              <li style={{ listStyleType: "none" }}>
                <strong>Name:</strong> {student.fullname}
              </li>
              <li style={{ listStyleType: "none" }}>
                <strong>Email:</strong> {student.email}
              </li>
              <li style={{ listStyleType: "none" }}>
                <strong>Phone:</strong> {student.phoneNumber}
              </li>
            </ul>
          ) : (
            <p>Loading student details...</p>
          )}
          <h4>{student?.fullname} enrolled Courses</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
              padding: "2rem 1rem ",
              alignItems: "start",
              width: "100%",
            }}
          >
            {courses.length > 0 ? (
              <>
                {courses.map((item, index) => (
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
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        height: "28vh",
                        width: "100%",
                        overflow: "hidden",
                      }}
                      onClick={() =>
                        navigate( `/admin/course_list/${item?._id}`)
                      }
                    >
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
                        style={{
                          color: "gray",
                          display: "flex",
                          alignItems: "center",
                        }}
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
                        className="text-gray-500 flex gap-8 items-start"
                        style={{
                          color: "#E64E4E",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "start",
                          gap: "28px",
                        }}
                      >
                        {student.enrolledCourses?.[index]?.progress} Progress
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
              </>
            ) : (
              <p>No courses found or loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailStudent;
