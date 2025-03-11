import React from "react";
import parse from "html-react-parser";

const styles = {
  container: {
    padding: "20px",
    lineHeight: "1.6",
  },
  metaInfo: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginBottom: "20px",
    fontSize: "14px",
    color: "#555",
  },
  metaInfoItem: {
    backgroundColor: "#f9f9f9",
    padding: "10px 15px",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    // margin: "5px",
    // flex: "1 1 auto",
    textAlign: "center",
  },
  description: {
    marginBottom: "20px",
    fontSize: "16px",
    color: "#333",
  },
  aboutCourse: {
    backgroundColor: "#f1f1f1",
    padding: "15px",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
};

const Overview = ({ filterCourse }) => {

  return (
    <div style={styles.container}>
      <div style={styles.metaInfo}>
        <span style={styles.metaInfoItem}><strong>Categories : </strong>{filterCourse?.categories?.[0]}</span>
        <span style={styles.metaInfoItem}><strong>Course Duration : </strong>{filterCourse?.courseDuration}</span>
        <span style={styles.metaInfoItem}><strong>Payment Type : </strong>{filterCourse?.paymentType}</span>
        <span style={styles.metaInfoItem}><strong>Price : </strong>{filterCourse?.price} ETB</span>
        <span
          style={{
            ...styles.metaInfoItem,
            background:
              filterCourse?.status === "Approved"
                ? "#008000"
                : filterCourse?.status === "Pending"
                ? "#DFA035"
                : "#E64E4E",
            color: "#FFFFFF",
          }}
        >
          <strong>Status : </strong>{filterCourse?.status}
        </span>
      </div>
      <p style={styles.description}><strong>Description : </strong>{filterCourse?.courseDescription}</p>
      <div style={styles.aboutCourse}>
        {typeof filterCourse?.aboutCourse === "string" &&
          parse(filterCourse?.aboutCourse)}
      </div>
    </div>
  );
};

export default Overview;
