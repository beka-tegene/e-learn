import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  TextField,
  Button,
} from "@mui/material";
import AddStudentForm from "./AddStudentForm";
import { back_base_url } from "../../util/config";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [newStudentModalOpen, setNewStudentModalOpen] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchStudents(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const fetchStudents = async (page, limit) => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/users/getallusers?page=${page}&limit=${limit}&role=user`
      );
      setStudents(response.data.users);
      setTotalRows(response.data.totalUsers);
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

  const filteredStudents = students?.filter((student) =>
    student.fullname.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      name: "ID",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      sortable: true,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
  ];
  const navigate = useNavigate()
  const handleRowClick = (row) => {
    navigate(`/admin/student_detail/${row?._id}`)
  };

  const openNewStudentModal = () => {
    setNewStudentModalOpen(true);
  };

  const closeNewStudentModal = () => {
    setNewStudentModalOpen(false);
  };

  return (
    <div style={{ padding: "20px", height: "87vh", overflowY: "scroll" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h4 style={{ margin: "0" }}>Student List</h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: "10px",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={openNewStudentModal}
          >
            Add New Student
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredStudents}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        highlightOnHover
        responsive
        selectableRows
        selectableRowsHighlight
        onRowClicked={handleRowClick}
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
              cursor:"pointer",
            },
          },
        }}
      />
      <AddStudentForm
        open={newStudentModalOpen}
        onClose={closeNewStudentModal}
        onSubmit={fetchStudents}
      />
    </div>
  );
};

export default Student;
