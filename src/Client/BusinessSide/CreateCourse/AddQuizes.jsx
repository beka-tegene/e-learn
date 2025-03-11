import React, { useEffect, useState } from "react";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { FaCheck, FaCheckDouble } from "react-icons/fa";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { MdArrowDropDown, MdDelete, MdEdit, MdSearch } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import { back_base_url } from "../../../util/config";

const AddQuizes = () => {
  const navigate = useNavigate()
  const { id, slug } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [course, setCourse] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${back_base_url}api/v1/course/${id}/chapter/${slug}/questions`
        );
        setCourse(res.data.questions);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error here
      }
    };

    fetchData();
  }, [id, slug]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedQuiz(null);
  };

  const quizDeleteHandler = (quizId) => {
    try {
      axios
        .delete(
          `${back_base_url}api/v1/course/courses/${id}/chapters/${slug}/questions/${quizId}`
        )
        .then((res) => {
          toast.error(res.data.message);
          setInterval(() => {
            navigate(0);
          }, 2000);
        });
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div style={{ height: "87vh", overflowY: "scroll", background: "#F7F7F7" }}>
      <ToastContainer />
      <div
        style={{
          padding: "10px 40px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h5>Quizzes</h5>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={handleClick} variant="contained">
            Create Quiz <MdArrowDropDown />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem
              onClick={() =>
                navigate( `/lms-business/detail_quiz/${id}/${slug}/tf`)
              }
            >
              <ListItemIcon>
                <FaCircleHalfStroke fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" style={{ fontSize: "12px" }}>
                  True and False
                </Typography>
              </ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() =>
                navigate( `/lms-business/detail_quiz/${id}/${slug}/sc`)
              }
            >
              <ListItemIcon>
                <FaCheck fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" style={{ fontSize: "12px" }}>
                  Single Choice
                </Typography>
              </ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() =>
                navigate( `/lms-business/detail_quiz/${id}/${slug}/mc`)
              }
            >
              <ListItemIcon>
                <FaCheckDouble fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" style={{ fontSize: "12px" }}>
                  Multiple Choice
                </Typography>
              </ListItemText>
            </MenuItem>
          </Menu>
          <form
            action=""
            style={{
              border: "1px solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "white",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <input
              type="text"
              style={{ outline: "none", padding: "4px 8px", border: "none" }}
            />
            <MdSearch style={{ fontSize: "20px", cursor: "pointer" }} />
          </form>
        </div>
        <div>
          <h5>Chapters quiz</h5>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr .5fr",
              padding: "0 20px",
            }}
          >
            <div
              style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            >
              {course?.length > 0 ? (
                course?.map((quiz, index) => (
                  <div
                    style={{
                      border: "1px solid",
                      padding: "3px 10px",
                      borderRadius: "7px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    key={index}
                  >
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleQuizClick(quiz)}
                    >
                      {index + 1}.{" "}
                      {typeof quiz?.questionText === "string" &&
                        parse(quiz?.questionText)}
                    </span>
                    <div style={{ flexGrow: 1 }}></div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <IconButton>
                        <MdDelete onClick={() => quizDeleteHandler(quiz._id)} />
                      </IconButton>
                    </div>
                  </div>
                ))
              ) : (
                <p>No quizzes found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modal for displaying quiz details */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          style: { borderRadius: "10px", maxWidth: 500, minWidth: 500 },
        }}
      >
        <DialogTitle
          style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}
        >
          Quiz Details
        </DialogTitle>
        <DialogContent>
          {selectedQuiz && (
            <>
              <div style={{ marginBottom: "15px" }}>
                <Typography variant="subtitle1">Question:</Typography>
                <Typography style={{ marginTop: "5px" }}>
                  {typeof selectedQuiz?.questionText === "string" &&
                    parse(selectedQuiz?.questionText)}
                </Typography>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <Typography variant="subtitle1">Options:</Typography>
                <ul
                  style={{
                    marginTop: "5px",
                    paddingLeft: "20px",
                    listStyleType: "none",
                  }}
                >
                  {selectedQuiz.options.map((option, index) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: "5px",
                        padding: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Typography variant="subtitle1">Correct Answer(s):</Typography>
                <ul
                  style={{
                    marginTop: "5px",
                    paddingLeft: "20px",
                    listStyleType: "none",
                  }}
                >
                  {selectedQuiz.correctAnswers.map((answer, index) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: "5px",
                        padding: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        background: "green",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {answer}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions
          style={{ borderTop: "1px solid #ccc", paddingTop: "10px" }}
        >
          <Button onClick={handleCloseModal} style={{ marginRight: "10px" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddQuizes;
