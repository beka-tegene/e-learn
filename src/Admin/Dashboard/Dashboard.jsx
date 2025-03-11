import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserInstructorData } from "../../Store/Hooks/UserHook";
import { MdArrowUpward, MdDownload } from "react-icons/md";
import { back_base_url } from "../../util/config";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import 'chart.js/auto';

const Dashboard = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [students, setStudents] = useState([]);
  const [payment, setPayment] = useState([]);
  const [tutor, setTutor] = useState([]);
  const [timeRange, setTimeRange] = useState("month");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${back_base_url}api/v1/users/getallusers?&role=user`);
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getInstructor = useSelector(state => state.UserHook.OutputUsersInstructor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInstructorData());
  }, [dispatch]);

  const [totalCourses, setTotalCourses] = useState(1);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${back_base_url}api/v1/course`);
      setTotalCourses(response.data.totalCourses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${back_base_url}api/v1/users/getallusers?&role=tutorinstructor`);
        setTutor(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [timeRange]);

  const [dashboardUser, setDashboardUser] = useState();
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${back_base_url}api/v1/auth/dashboard/users?period=${timeRange}&role=user`);
        setDashboardUser(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [timeRange]);

  const [dashboardInstructor, setDashboardInstructor] = useState();
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${back_base_url}api/v1/auth/dashboard/users?period=${timeRange}&role=instructor`);
        setDashboardInstructor(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [timeRange]);

  const [dashboardTutor, setDashboardTutor] = useState();
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${back_base_url}api/v1/auth/dashboard/users?period=${timeRange}&role=tutorinstructor`);
        setDashboardTutor(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${back_base_url}api/v1/contact/contacts`);
        setContacts(data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${back_base_url}payment`);
        setPayment(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const columns = [
    { name: "First Name", selector: row => row?.firstName, sortable: true },
    { name: "Last Name", selector: row => row?.lastName, sortable: true },
    { name: "Phone Number", selector: row => row?.phoneNumber, sortable: true },
    { name: "Work Email", selector: row => row?.workEmail, sortable: true },
  ];

  const summaryData = [
    { title: "Students", number: dashboardUser?.userCount, path: "/admin/student_list" },
    { title: "Teachers", number: dashboardInstructor?.userCount, path: "/admin/teacher_list" },
    { title: "Tutor", number: dashboardTutor?.userCount, path: "/admin/tutor_list" },
    { title: "Courses", number: totalCourses, path: "/admin/course_list" },
    { title: "Amount", number: payment?.totalAmount, path: "/admin/transaction_list" },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const PdfDocument = () => (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Dashboard Report</Text>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Summary</Text>
          {summaryData.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item.title}: {item.number}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Contacts</Text>
          {contacts.slice(0, 3).map((contact, index) => (
            <Text key={index} style={styles.text}>
              {contact.firstName} {contact.lastName} - {contact.workEmail}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  const barData = {
    labels: ["Users", "Instructors", "Tutors"],
    datasets: [
      {
        label: `Count (${timeRange})`,
        data: [dashboardUser?.userCount, dashboardInstructor?.userCount, dashboardTutor?.userCount],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
      },
    ],
  };

  const pieData = {
    labels: ["Users", "Instructors", "Tutors"],
    datasets: [
      {
        data: [dashboardUser?.userCount, dashboardInstructor?.userCount, dashboardTutor?.userCount],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
      },
    ],
  };

  return (
    <div style={{ padding: "1rem", display: "grid", gridTemplateColumns: "1fr", gap: "10px", height: "87vh", overflowY: "scroll" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px", paddingTop: "10px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => handleTimeRangeChange("day")} style={{ padding: "4px 28px", borderRadius: "8px", background: timeRange === "day" ? "#0000FFC0" : "#EEEEEE", color: timeRange === "day" ? "white" : "black" }}>Daily</button>
          <button onClick={() => handleTimeRangeChange("month")} style={{ padding: "4px 28px", borderRadius: "8px", background: timeRange === "month" ? "#0000FFC0" : "#EEEEEE", color: timeRange === "month" ? "white" : "black" }}>Monthly</button>
          <button onClick={() => handleTimeRangeChange("year")} style={{ padding: "4px 28px", borderRadius: "8px", background: timeRange === "year" ? "#0000FFC0" : "#EEEEEE", color: timeRange === "year" ? "white" : "black" }}>Yearly</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button style={{ padding: "4px 28px", borderRadius: "8px", background: "#0000FFC0", color: "white" }}>
            <PDFDownloadLink document={<PdfDocument />} fileName="Dashboard_Report.pdf">
              <span style={{ display: "flex", alignItems: "center" }}>
                <MdDownload size={24} style={{ marginRight: "8px" }} /> Download PDF
              </span>
            </PDFDownloadLink>
          </button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr" , gap: "16px" }}>
        {summaryData.map((item, index) => (
          <div key={index} style={{ background: "white", borderRadius: "16px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", padding: "16px", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", border: "1px solid #f5f5f5" }} onClick={() => navigate(item.path)}>
            <h2 style={{ fontSize: "1.5rem", color: "grey", fontWeight: "bold", marginBottom: "8px" }}>{item.title}</h2>
            <p style={{ fontSize: "1.25rem", color: "grey", fontWeight: "bold", margin: "0" }}>{item.number}</p>
          </div>
        ))}
      </div>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: !isMobile ? "2fr 1fr" : "",
            gap: "20px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", height: "45vh" }}
          >
            <h5>Report Summary</h5>
            <Bar data={barData} />
          </div>
          <div>
            <h5>Report Summary</h5>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                height: "45vh",
              }}
            >
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h5>Contact Table</h5>
        <DataTable
          columns={columns}
          data={contacts.slice(0, 3)}
          highlightOnHover
          responsive
          selectableRows
          selectableRowsHighlight
          customStyles={{
            headRow: {
              style: {
                backgroundColor: "#f2f2f2",
              },
            },
            headCells: {
              style: {
                color: "#333",
                fontSize: "14px",
                fontWeight: "bold",
              },
            },
            rows: {
              style: {
                borderBottomColor: "#f2f2f2",cursor:"pointer"
              },
            },
          }}
        />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
});

export default Dashboard;
