import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getCourseData, getPayment } from "../../../Store/Hooks/CourseHook";
import chapalogo from "/assets/img/chapa.png";
import { back_base_url } from "../../../util/config";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { id, oid } = useParams();
  const [orderProduct, setOrderProduct] = useState();
  const dispatch = useDispatch();
  const [filterCourse, setFilterCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/course/${id}`
      );
      setFilterCourse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchOrderProduct = async () => {
      try {
        const res = await axios.get(
          `${back_base_url}api/v1/orders/${oid}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setOrderProduct(res.data.order);
      } catch (error) {
        toast.error("something went wrong");
      }
    };
    if (oid) fetchOrderProduct();
  }, [oid]);
  const chapaHandle = async () => {
    try {
      dispatch(getPayment({ data: { order_id: oid } }));
    } catch (error) {
      console.error("Error while getting payment:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <div style={styles.col}>
          <div>
            <span style={styles.label}>Course Name:</span>
            <span style={styles.value}>
              {filterCourse?.courseName.slice(0, 30)}...
            </span>
          </div>
          <div>
            <span style={styles.label}>Enroll Employee:</span>
            <span style={styles.value}>
              {orderProduct?.emails?.length} Employee
            </span>
          </div>
        </div>
        <div style={styles.col}>
          <h3 style={styles.title}>Order Summary</h3>
          <div style={styles.summaryRow}>
            <span>
              {filterCourse?.courseName.slice(0, 15)}... x{" "}
              {orderProduct?.emails?.length}
            </span>
            <span>
              {filterCourse?.price * orderProduct?.emails?.length} ETB
            </span>
          </div>
          <div style={styles.summaryRow}>
            <span>Total</span>
            <span>{orderProduct?.total} ETB</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{orderProduct?.subtotal} ETB</span>
          </div>
          <NavLink
            className="tg-button-wrap btn"
            style={styles.payButton}
            onClick={chapaHandle}
          >
            <img src={chapalogo} alt="chapa logo" style={styles.logo} />
            <span style={styles.payButtonText}>Pay with CHAPA</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "87vh",
    overflowY: "scroll",
    background: "#F9FAFB",
    padding: "1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    flexWrap: "wrap",
  },
  col: {
    flex: 1,
    padding: "1rem",
    minWidth: "300px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    flexBasis: "40%",
  },
  value: {
    color: "#666",
    flexBasis: "60%",
    textAlign: "right",
  },
  title: {
    marginBottom: "1.5rem",
    fontWeight: "bold",
    color: "#0D1B34",
    borderBottom: "2px solid #EEE",
    paddingBottom: "0.5rem",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    color: "#555",
    fontSize: "1rem",
  },
  payButton: {
    backgroundColor: "#0D1B34",
    color: "#FFFFFF",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    borderRadius: "8px",
    textDecoration: "none",
    cursor: "pointer",
    marginTop: "2rem",
  },
  logo: {
    width: "50px",
    marginRight: "1rem",
  },
  payButtonText: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  icon: {
    color: "#28a745",
    marginLeft: "0.5rem",
  },
};

export default PlaceOrder;
