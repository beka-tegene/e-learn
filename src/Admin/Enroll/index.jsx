import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { back_base_url } from "../../util/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
const Enroll = () => {
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [students, setStudents] = useState([]);
  const token = Cookies.get("token");
  let userId;

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  useEffect(() => {
    fetchStudents(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const fetchStudents = async (page, limit) => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/orders?page=${page}&limit=${limit}&role=user`
      );
      console.log(response);

      setStudents(response?.data?.orders);
      setTotalRows(response?.data?.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
    fetchStudents(page, newPerPage);
  };
  const columns = [
    {
      name: "ID",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      sortable: true,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.user?.fullname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.user?.email,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.user?.phoneNumber,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.total + " ETB",
      sortable: true,
    },
    {
      name: "status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => (
        <button
          style={{ border: "1px solid black", padding: "8px 16px" }}
          onClick={() => chapaHandle2(row?._id)}
        >
          Approve
        </button>
      ),
      sortable: true,
    },
  ];
  const chapaHandle2 = async (id) => {
    try {
      const response = await axios.post(
        `${back_base_url}api/v1/course/enroll/course/user`,
        { orderId: id }
      );
      toast.success(response?.data?.message);
    } catch (error) {
      console.error("Error while getting payment:", error);
    }
  };
  return (
    <div style={{ padding: "20px", height: "87vh", overflowY: "scroll" }}>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h4 style={{ margin: "0" }}>Enroll List</h4>
      </div>
      <DataTable
        columns={columns}
        data={students}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        highlightOnHover
        responsive
        selectableRows
        selectableRowsHighlight
        // onRowClicked={handleRowClick}
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
              borderBottomColor: "#f2f2f2",
              cursor: "pointer",
            },
          },
        }}
      />
    </div>
  );
};

export default Enroll;
