import axios from "axios";
import React, { useEffect, useState } from "react";
import { back_base_url } from "../../../util/config";

const ReviewsRatings = ({ filterCourse }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.get(`${back_base_url}api/v1/reviews`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const reviewFiltered = reviews.filter(
    (review) => review?.course?._id === filterCourse?._id
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <p style={styles.averageRating}>Average Rating: {filterCourse?.averageRating } stars</p>
      </div>
      <div style={styles.reviews}>
        {reviewFiltered.length > 0 ? (
          reviewFiltered.map((item, index) => (
            <div style={styles.review} key={index}>
              <p style={styles.comment}><strong>Review {index + 1}:</strong> {item?.comment}</p>
            </div>
          ))
        ) : (
          <p style={styles.noReviews}>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsRatings;

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    margin: "20px 0",
  },
  header: {
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  averageRating: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  reviews: {
    marginTop: "10px",
  },
  review: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  comment: {
    fontSize: "16px",
    color: "#555",
  },
  noReviews: {
    fontSize: "16px",
    color: "#888",
  },
};
