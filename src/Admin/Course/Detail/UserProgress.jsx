import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserProgress = ({ filterCourse }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Filter users who have bought the course with the given ID
  const filteredUsers = filterCourse?.userWhoHasBought?.filter((user) =>
    user?.enrolledCourses?.some((course) => course.course === id)
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>Users Progress</div>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Progress</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user, index) => {
            const userCourse = user.enrolledCourses.find(
              (course) => course.course === id
            );
            return (
              <tr
                key={index}
                style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                onClick={()=>navigate(`/admin/student_detail/${user?._id}`)}
              >
                <td style={styles.td}>{user.fullname}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{userCourse?.progress}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserProgress;

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  header: {
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
    marginBottom: "20px",
    fontSize: "16px",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thead: {
    backgroundColor: "#f1f1f1",
  },
  th: {
    padding: "10px",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
    color: "#333",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    color: "#555",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
    cursor:"pointer",
  },
  oddRow: {
    backgroundColor: "#fff",
    cursor:"pointer",
  },
};
