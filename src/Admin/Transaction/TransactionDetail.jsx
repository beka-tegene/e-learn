import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";
import { back_base_url } from "../../util/config";
import { FaStar } from "react-icons/fa";

const TransactionDetail = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(courses);
  useEffect(() => {
    const fetchTransactionData = async () => {
      axios.defaults.withCredentials = true;
      try {
        const transactionResponse = await axios.get(
          `${back_base_url}payment/${id}`
        );
        const transactionData = transactionResponse.data.payment;
        setTransaction(transactionData);

        const orderResponse = await axios.get(
          `${back_base_url}api/v1/orders/${transactionData.orderID}`
        );
        const courseID = orderResponse.data.order.orderItems[0].product;
        const courseResponse = await axios.get(
          `${back_base_url}api/v1/course/${courseID}`
        );

        setCourses(courseResponse.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", height: "87vh", overflowY: "scroll" }}>
      <button onClick={() => window.history.back()}>
        <MdArrowBack size={16} /> Back
      </button>
      <div style={{padding:"5px 20px"}}>
        <div>
          <h4>Transaction Details</h4>
          <div style={{ padding: "10px 20px" }}>
            <p>
              <strong>Transaction ID:</strong> {transaction.transactionID}
            </p>
            <p>
              <strong>Transaction Date:</strong>{" "}
              {new Date(transaction.transactionDateTime).toString()}
            </p>
            <p>
              <strong>Payment Method:</strong> {transaction.paymentMethod}
            </p>
            <p>
              <strong>Amount:</strong> {transaction.amount}{" "}
              {transaction.currency}
            </p>
            <p>
              <strong>Customer Name:</strong> {transaction.customerName}
            </p>
            <p>
              <strong>Email Address:</strong> {transaction.emailAddress}
            </p>
          </div>
        </div>
        <div>
          <h4>Course Details</h4>
          <div style={{ padding: "10px 20px" }}>
            <p>
              <strong>Course Name:</strong> {courses.courseName}
            </p>
            <p>
              <strong>Course Price:</strong> {courses.price} ETB
            </p>
            <p>
              <strong>Course Categories:</strong> {courses.categories[0]}
            </p>
            <p>
              <strong>Course Rating:</strong> {courses.averageRating} <FaStar />
            </p>
            <p>
              <strong>Course Description:</strong> {courses.courseDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
