import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdFilterList } from "react-icons/md";
import {
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTeacherForm from "./AddTeacherForm";
import { back_base_url } from "../../util/config";
import { IoMdMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Teacher = () => {
  const navigate = useNavigate()
  const [data, setData] = useState();
  const [students, setStudents] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchTeacher(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage, data]);

  const fetchTeacher = async (page, limit) => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/users/getallusers?page=${page}&limit=${limit}&role=instructor`
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
    fetchTeacher(page, newPerPage);
  };

  const [searchText, setSearchText] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [isFilterOptionsVisible, setIsFilterOptionsVisible] = useState(false);
  const [newStudentModalOpen, setNewStudentModalOpen] = useState(false);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [teacherToDecline, setTeacherToDecline] = useState(null);

  const toggleFilterOptions = () => {
    setIsFilterOptionsVisible(!isFilterOptionsVisible);
  };

  const handleGradeFilterChange = (grade) => {
    setFilterGrade(grade);
    setIsFilterOptionsVisible(false);
  };

  const ApproveHandler = async (id, email) => {
    try {
      const res = await axios.put(
        `${back_base_url}api/v1/users/instructor/approve/${id}`,
        { email }
      );
      toast.success(res.data.message);
      setData(res);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const DeclineHandler = async () => {
    if (!teacherToDecline) return;

    try {
      const res = await axios.put(
        `${back_base_url}api/v1/users/reject/${teacherToDecline._id}`,
        { rejectionReason: declineReason, email: teacherToDecline?.email }
      );
      toast.success(res.data.message);
      setData(res);
      setDeclineDialogOpen(false);
      setDeclineReason("");
      setTeacherToDecline(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRowClick = (row) => {
    navigate(`/admin/teacher_detail/${row._id}`);
  };

  const openNewStudentModal = () => {
    setNewStudentModalOpen(true);
  };

  const closeNewStudentModal = () => {
    setNewStudentModalOpen(false);
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRow, setMenuRow] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.Gender,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Experience",
      selector: (row) => row.Exprience,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          style={{
            color:
              row.status === "Approved"
                ? "#289712"
                : row.status === "Rejected"
                ? "#FF7070"
                : "",
            fontWeight: "bold",
          }}
        >
          {row.status}
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(event) => handleClick(event, row)}
            sx={{ml:2}}
          >
            <IoMdMore />
          </IconButton>
        </span>
      ),
      sortable: true,
    },
  ];

  const filteredTeachers = students?.filter(
    (teacher) =>
      teacher.fullname.toLowerCase().includes(searchText.toLowerCase()) &&
      (filterGrade === "" || teacher.Gender === filterGrade)
  );

  const fetchStudents = async (newTeacherData) => {
    try {
      setNewStudentModalOpen(false);
    } catch (error) {
      toast.error("something went wrong");
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
        <h4 style={{ margin: "0" }}>Teacher List</h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: "10px",
          }}
        >
          <div>
            <MdFilterList
              onClick={toggleFilterOptions}
              style={{ marginRight: "10px", color: "#888", cursor: "pointer" }}
            />{" "}
            CATEGORY FILTER{" "}
          </div>
          {isFilterOptionsVisible && (
            <div
              style={{
                position: "absolute",
                top: "35px",
                padding: "5px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                zIndex: "1",
              }}
            >
              <div onClick={() => handleGradeFilterChange("")}>All Gender</div>
              <div onClick={() => handleGradeFilterChange("male")}>Male</div>
              <div onClick={() => handleGradeFilterChange("female")}>
                Female
              </div>
            </div>
          )}
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
            Add New Teacher
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredTeachers}
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
      <Dialog
        open={declineDialogOpen}
        onClose={() => setDeclineDialogOpen(false)}
      >
        <DialogTitle>Decline Teacher</DialogTitle>
        <DialogContent>
          <TextField
            label="Reason for Decline"
            multiline
            rows={4}
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeclineDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={DeclineHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <AddTeacherForm
        open={newStudentModalOpen}
        onClose={closeNewStudentModal}
        onSubmit={fetchStudents}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            ApproveHandler(menuRow?._id, menuRow?.email);
            handleClose();
          }}
        >
          Approve
        </MenuItem>
        <MenuItem
          onClick={() => {
            setTeacherToDecline(menuRow);
            setDeclineDialogOpen(true);
            handleClose();
          }}
        >
          Reject
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Teacher;
