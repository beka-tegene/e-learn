import React from "react";
import UserProgress from "./UserProgress";

const EnrollmentInfo = ({ filterCourse }) => {
  return (
    <div style={styles.container}>
      <p style={styles.infoText}>
        Total Enrolled: {filterCourse?.userWhoHasBought?.length || 0} Users
      </p>
      {/* <div style={styles.details}>
        <p style={styles.detailItem}>
          <strong>Enrollment Period:</strong> {filterCourse?.enrollmentPeriod || "Not specified"}
        </p>
        <p style={styles.detailItem}>
          <strong>Start Date:</strong> {filterCourse?.startDate || "Not specified"}
        </p>
        <p style={styles.detailItem}>
          <strong>End Date:</strong> {filterCourse?.endDate || "Not specified"}
        </p>
      </div> */}
      <UserProgress filterCourse={filterCourse}/>
    </div>
  );
};

export default EnrollmentInfo;

const styles = {
  container: {
    padding: "20px",
    borderRadius: "8px",
  },
  header: {
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  infoText: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "20px",
  },
  details: {
    marginBottom: "20px",
  },
  detailItem: {
    fontSize: "16px",
    color: "#333",
    margin: "10px 0",
  },
  manageButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
