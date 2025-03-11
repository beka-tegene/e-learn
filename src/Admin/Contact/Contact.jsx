import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { back_base_url } from "../../util/config";
const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [open, setOpen] = useState(false);

  const [CompanyRegistered, setCompanyRegistered] = useState([]);

  useEffect(() => {
    response();
  }, []);
  const response = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(
        `${back_base_url}api/v1/users/getallusers?&role=company_owner&&limit=${10}`
      );
      setCompanyRegistered(data.users);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.withCredentials = true;
      try {
        const { data } = await axios.get(
          `${back_base_url}api/v1/contact/contacts`
        );
        setContacts(data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchData();
  }, []);
  console.log(contacts);

  const handleClickOpen = (contact) => {
    setSelectedContact(contact);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContact(null);
  };

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: generatePassword(),
    role: "company_owner",
  });
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
    setFormData({
      fullname: "",
      email: "",
      password: generatePassword(),
      role: "company_owner",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCompany = async () => {
    try {
      const response = await axios.post(
        `${back_base_url}api/v1/auth/registerasacompanyowner`,
        {
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
        }
      );
      toast.success("Company registration successful");
      handleClose1();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Work Email",
      selector: (row) => row.workEmail,
      sortable: true,
    },
  ];
  const column = [
    {
      name: "Full Name",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Work Email",
      selector: (row) => row.email,
      sortable: true,
    },
  ];
  const filteredContacts = contacts.filter((item) =>
    item.firstName.toLowerCase().includes(searchText.toLowerCase())
  );

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
        <h4 style={{ margin: "0" }}>Contact Us List</h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            style={{
              marginRight: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained" onClick={handleClickOpen1}>
            Create Company Profile
          </Button>
          <Dialog
            open={open1}
            onClose={handleClose1}
            PaperProps={{
              style: { borderRadius: "10px", maxWidth: 500, minWidth: 500 },
            }}
          >
            <DialogTitle>Create New Profile</DialogTitle>
            <DialogContent>
              <form>
                <TextField
                  margin="dense"
                  label="Company Name"
                  type="text"
                  name="fullname"
                  fullWidth
                  value={formData.fullname}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  label="Email"
                  type="email"
                  name="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  label="Password"
                  type="text"
                  name="password"
                  disabled
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button color="primary" onClick={handleAddCompany}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredContacts}
        pagination
        highlightOnHover
        responsive
        onRowClicked={handleClickOpen}
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
            },
          },
        }}
      />
      <DataTable
        columns={column}
        data={CompanyRegistered}
        pagination
        highlightOnHover
        responsive
        // onRowClicked={handleClickOpen}
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
            },
          },
        }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contact Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedContact && (
              <div>
                <p>
                  <strong>First Name:</strong> {selectedContact.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {selectedContact.lastName}
                </p>
                <p>
                  <strong>Phone Number:</strong> {selectedContact.phoneNumber}
                </p>
                <p>
                  <strong>Company Name:</strong> {selectedContact.companyName}
                </p>
                <p>
                  <strong>Company Size:</strong> {selectedContact.companySize}
                </p>
                <p>
                  <strong>Expected Learners:</strong>{" "}
                  {selectedContact.expectedLearners}
                </p>
                <p>
                  <strong>Work Email:</strong> {selectedContact.workEmail}
                </p>
                {/* Add other fields as needed */}
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Contact;

const generatePassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
