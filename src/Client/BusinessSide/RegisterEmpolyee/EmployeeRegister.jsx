import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import Papa from "papaparse";
import { HiOutlineUpload } from "react-icons/hi";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrDownload } from "react-icons/gr";
import { back_base_url } from "../../../util/config";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [registerUser, setRegisterUser] = useState([]);
  const [formData, setFormData] = useState({ email: "" });
  const [csvData, setCsvData] = useState([]);
  const [open, setOpen] = useState(false);

  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken?.userId);
    }
  }, [token]);

  useEffect(() => {
    const fetchRegisterUser = async () => {
      if (userId) {
        try {
          const res = await axios.get(
            `${back_base_url}api/v1/auth/users/${userId}`
          );

          setRegisterUser(res.data.users);
        } catch (error) {}
      }
    };
    fetchRegisterUser();
  }, [userId]);

  const columns = [
    {
      name: "Full Name",
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setCsvData(results.data);
        },
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ email: "" });
    setCsvData([]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async () => {
    setLoading(true);
    const emails = csvData.map((item) => item.email);
    if (formData.email) {
      emails.push(formData.email);
    }
    try {
      await axios.post(`${back_base_url}api/v1/auth/registerasacompany`, {
        emails: emails,
        userIds: userId,
      });
      toast.success("Successfully Employee Registered");
      setTimeout(() => {
        navigate(0);
      }, 2000);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to register employee");
      setLoading(false);
    }
  };
  const handleDownloadExampleCSV = () => {
    const link = document.createElement("a");
    link.href = "/assets/Example.csv";
    link.download = "Example.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        height: "87vh",
        overflowY: "scroll",
        background: "#F9FAFB",
        padding: "1.5rem",
      }}
    >
      <ToastContainer />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              background: "#D9A128",
              color: "#FFF",
              padding: "6px 20px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
            onClick={handleClickOpen}
          >
            Add Employee
          </button>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={registerUser}
            pagination
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: "10px", maxWidth: 500, minWidth: 500 },
        }}
      >
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              margin="dense"
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
          </form>
          <label
            htmlFor="csv"
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              position: "absolute",
              top: "10px",
              right: "20px",
            }}
          >
            <HiOutlineUpload style={{ fontSize: "20px" }} />
            <Typography variant="body1" style={{ marginLeft: "8px" }}>
              Upload CSV
            </Typography>
          </label>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              cursor: "pointer",
            }}
            onClick={handleDownloadExampleCSV}
          >
            <GrDownload
              style={{
                fontSize: "20px",
              }}
            />{" "}
            Example CSV
          </span>
          <span>
            <strong>Remember:</strong> If you send a CSV file, it must contain
            fewer than 100 user emails.
          </span>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            name="csv"
            id="csv"
            hidden
          />
          {csvData.length > 0 && (
            <Paper style={{ padding: ".5rem", marginTop: ".5rem" }}>
              {/* <Typography variant="h6" gutterBottom>
                Parsed CSV Data
              </Typography> */}
              {/* <pre>{JSON.stringify(csvData, null, 2)}</pre> */}
              <pre>Your file has been uploaded. Click "Add" to proceed.</pre>
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddEmployee}
            color="primary"
            disabled={loading ? true : false}
          >
            {loading ? (
              <CircularProgress size={18} sx={{ color: "#272727" }} />
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Employee;
