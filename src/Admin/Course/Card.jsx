import React, { useEffect, useState } from "react";
import { MdBook, MdTimer } from "react-icons/md";
import {
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Pagination,
  IconButton,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrMore } from "react-icons/gr";
import { back_base_url } from "../../util/config";
import { useNavigate } from "react-router-dom";

const Card = ({ activeData }) => {
  const navigate = useNavigate()
  const [data, setData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [courseToDecline, setCourseToDecline] = useState(null);
  const [course, setCourse] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCourse();
  }, [currentPage, activeData, data]);
  const fetchCourse = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${back_base_url}api/v1/course`, {
        params: {
          page: currentPage,
          limit: 12,
          status: activeData,
        },
      });
      setCourse(response.data.courses);
      setTotalRows(response.data.totalPages);
      setTotalCourses(response.data.totalCourses);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentId(null);
  };

  const ApproveHandler = async (id) => {
    try {
      const res = await axios.put(
        `${back_base_url}api/v1/course/approve/${id}`
      );
      toast.success(res.data.message);
      setData(res);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDecline = (course) => {
    setCourseToDecline(course);
    setDeclineDialogOpen(true);
    handleClose();
  };

  const DeclineHandler = async () => {
    if (!courseToDecline) return;

    try {
      const res = await axios.post(
        `${back_base_url}api/v1/course/${courseToDecline._id}/reject`,
        {
          reason: declineReason,
        }
      );
      toast.success(res.data.message);
      setData(res);
      setDeclineDialogOpen(false);
      setDeclineReason("");
      setCourseToDecline(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          padding: "2rem 1rem ",
          alignItems: "start",
          width: "100%",
        }}
      >
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <div
              style={{
                borderRadius: "8px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                backgroundColor: "white",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                position: "relative",
                cursor: "pointer",
              }}
              key={index}
            >
              <div
                style={{
                  height: "28vh",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  height={"100%"}
                />
              </div>
              <div style={{ padding: "10px 5px" }}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={"10%"}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span
                  style={{
                    background: "#EBCC8B",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    // width: "fit-content",
                    padding: "0 10px",
                    borderRadius: "5px",
                    width: "40%",
                  }}
                >
                  <MdBook />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    width={"100%"}
                  />
                </span>
                <span
                  style={{
                    borderBottom: "3px solid yellow",
                    width: "40%",
                  }}
                >
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    width={"100%"}
                  />
                </span>
              </div>
            </div>
          ))
        ) : course?.length > 0 ? (
          course?.map((item, index) => (
            <div
              style={{
                borderRadius: "8px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                backgroundColor: "#FEFBFA",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                position: "relative",
                cursor: "pointer",
              }}
              key={index}
            >
              <div
                style={{ height: "28vh", width: "100%", overflow: "hidden" }}
                onClick={() =>
                  navigate( `/admin/course_list/${item?._id}`)
                }
              >
                <img
                  src={item.coverPage[0]}
                  alt="img1"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MdBook /> {item?.chapter?.length} Chapters
                </span>
                <span
                  style={{
                    color: "gray",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MdTimer /> {item?.courseDuration}
                </span>
              </div>
              <h1 style={{ fontSize: "15px", fontWeight: "bold" }}>
                {item?.courseName?.length > 70
                  ? `${item?.courseName?.slice(0, 70)}...`
                  : item?.courseName}
              </h1>
              <h1 style={{ fontSize: "13px", fontWeight: "400" }}>
                {item?.courseDescription?.length > 80
                  ? `${item?.courseDescription?.slice(0, 80)}...`
                  : item?.courseDescription}
              </h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  className="text-gray-500 flex gap-8 items-start"
                  style={{
                    color:
                      item?.status === "Approved"
                        ? "#008000"
                        : item?.status === "Pending"
                        ? "#DFA035"
                        : "#E64E4E",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "start",
                    gap: "28px",
                  }}
                >
                  {item?.status}
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    color: "#DFA035",
                    fontWeight: "bold",
                  }}
                >
                  {item?.price} ETB
                </span>
              </div>
              <span
                style={{
                  position: "absolute",
                  backgroundColor:
                    item.paymentType === "free" ? "green" : "goldenrod",
                  left: "0",
                  color: "white",
                  padding: "0 10px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  borderRadius: "0 10px 0 0",
                }}
              >
                {item?.paymentType}
              </span>
              <span
                style={{
                  position: "absolute",
                  right: "10px",
                  color: "black", // Changed to black for better visibility
                  padding: "0 10px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  borderRadius: "0 10px 0 0",
                }}
                onClick={(e) => handleClick(e, item?._id)}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <IconButton
                  sx={{
                    background: "#0003",
                    fontSize: "14px",
                    color: "#FFFFFF",
                  }}
                >
                  <GrMore />
                </IconButton>
              </span>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open && currentId === item?._id} // Only open for the current item
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => ApproveHandler(item?._id)}>
                  Approve
                </MenuItem>
                <MenuItem onClick={() => handleDecline(item)}>Decline</MenuItem>
              </Menu>
            </div>
          ))
        ) : (
          <div
            style={{
              padding: "1rem",
              textAlign: "center",
              minWidth: "100%",
              gridColumn: "1 / -1",
            }}
          >
            <p style={{ fontWeight: "bold" }}>No Data Recorded</p>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={totalRows}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </div>
      <Dialog
        open={declineDialogOpen}
        onClose={() => setDeclineDialogOpen(false)}
      >
        <DialogTitle>Decline Course</DialogTitle>
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
    </div>
  );
};

export default Card;
