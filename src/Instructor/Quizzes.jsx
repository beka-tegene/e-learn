import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { back_base_url } from "../util/config";
const Quizzes = () => {
  const navigate = useNavigate()
  const { id, slug, type } = useParams();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleQuestionChange = (html) => {
    const normalizedHtml = html.replace(/\s\s+/g, ' ');
    setQuestion(normalizedHtml);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleSave = async () => {
   
    if (type === "mc") {
      const nonEmptyOptions = options.filter((option) => option.trim() !== "");
      const nonEmptyCorrectAnswers = correctAnswers.filter(
        (option) => option.trim() !== ""
      );
      if (nonEmptyOptions?.length === 0) {
        toast.error("Please add at least one non-empty option.");
      } else {
        try {
          const response = await axios.post(
            `${back_base_url}api/v1/course/addQuestions`,
            {
              courseId: id,
              chapterId: slug,
              questions: [
                {
                  type: "multiple Choice",
                  questionText: question,
                  options: nonEmptyOptions,
                  correctAnswers: nonEmptyCorrectAnswers,
                },
              ],
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          toast.success("Add quiz successfully");
          setInterval(() => {
            navigate(`/instructor/detail_quiz/${id}/${slug}`);
          }, 2000);
        } catch (error) {
          toast.error("something went wrong");
        }
      }
    } else {
      const trimmedCorrectAnswer = correctAnswer.trim();
      if (trimmedCorrectAnswer !== "") {
        if (type === "tf") {
          try {
            const response = await axios.post(
              `${back_base_url}api/v1/course/addQuestions`,
              {
                courseId: id,
                chapterId: slug,
                questions: [
                  {
                    type: "True and False",
                    questionText: question,
                    options: ["true", "false"],
                    correctAnswers: [trimmedCorrectAnswer],
                  },
                ],
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            toast.success("Add quiz successfully");
            setInterval(() => {
              navigate(`/instructor/detail_quiz/${id}/${slug}`);
            }, 2000);
          } catch (error) {
            toast.error("something went wrong");
          }
        } else {
          try {
            const response = await axios.post(
              `${back_base_url}api/v1/course/addQuestions`,
              {
                courseId: id,
                chapterId: slug,
                questions: [
                  {
                    type: "Single Choice",
                    questionText: question,
                    options: options,
                    correctAnswers: [trimmedCorrectAnswer],
                  },
                ],
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            toast.success("Add quiz successfully");
            setInterval(() => {
              navigate(`/instructor/detail_quiz/${id}/${slug}`);
            }, 2000);
          } catch (error) {
            toast.error("something went wrong");
          }
        }
      } else {
        toast.error("Please select a correct answer.");
      }
    }
  };

  const handlePreview = () => {
    setPreviewVisible(true);
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
  };

  const handleCorrectAnswersChange = (event, index) => {
    const selectedAnswer = event.target.value;
    const newCorrectAnswers = [...correctAnswers];

    if (correctAnswers.includes(selectedAnswer)) {
      newCorrectAnswers.splice(newCorrectAnswers.indexOf(selectedAnswer), 1);
    } else {
      newCorrectAnswers.push(selectedAnswer);
    }

    setCorrectAnswers(newCorrectAnswers);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div style={{ height: "87vh", overflowY: "scroll", background: "#F7F7F7" }}>
      <ToastContainer />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: !isMobile ? "5fr 2fr" : "",
          padding: "10px 20px",
          gap: "10px",
          alignItems: "start",
        }}
      >
        <div>
          {type === "tf" && (
            <>
              <h5>True And False</h5>
              <form
                action=""
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                  padding: "0 20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    padding: "20px 0",
                  }}
                >
                  <label htmlFor="question">Enter Your Question</label>
                  <ReactQuill
                    style={{
                      height: "30vh",
                      marginBottom: "2.5rem",
                      padding: "0 20px",
                    }}
                    theme="snow"
                    value={question}
                    onChange={handleQuestionChange}
                  />
                </div>
                <div>
                  <label>Select the correct answer</label>
                  <RadioGroup
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    sx={{ p: "0 20px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="True"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="False"
                      />
                    </div>
                  </RadioGroup>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Button onClick={handlePreview}>Preview</Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </form>
            </>
          )}
          {type === "sc" && (
            <>
              <h5>Single Choice (only one choice)</h5>
              <form
                action=""
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                  padding: "0 20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <label htmlFor="question">Enter Your Question</label>
                  <ReactQuill
                    style={{
                      height: "30vh",
                      marginBottom: "2.5rem",
                      padding: "0 20px",
                    }}
                    theme="snow"
                    value={question}
                    onChange={handleQuestionChange}
                  />
                </div>
                <div>
                  <label>Select the correct answer</label>
                  <RadioGroup
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    sx={{ p: "0 20px" }}
                  >
                    {options.map((option, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "10px",
                          padding: "0 20px",
                        }}
                      >
                        <FormControlLabel
                          value={option}
                          control={<Radio />}
                          label={
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(index, e.target.value)
                              }
                              style={{
                                width: "100%",
                                padding: "0 20px",
                                borderRadius: "10px",
                                border: "1px solid",
                                outline: "none",
                              }}
                            />
                          }
                        />
                      </div>
                    ))}
                  </RadioGroup>
                  <Button onClick={handleAddOption}>Add Option</Button>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Button onClick={handlePreview}>Preview</Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </form>
            </>
          )}
          {type === "mc" && (
            <>
              <h5>Multiple Choice (more than one)</h5>
              <form
                action=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "0 20px",
                }}
              >
                <div>
                  <label htmlFor="question">Enter Your Question</label>
                  <ReactQuill
                    style={{ height: "30vh", padding: "0 20px" }}
                    theme="snow"
                    value={question}
                    onChange={handleQuestionChange}
                  />
                </div>
                <div style={{ marginTop: "3rem" }}>
                  <label>Select the correct answer(s)</label>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexDirection: "column",
                    }}
                  >
                    {options.map((option, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "10px",
                          padding: "0 20px",
                        }}
                      >
                        <Checkbox
                          checked={correctAnswers.includes(option)}
                          onChange={(e) => handleCorrectAnswersChange(e, index)}
                          label={`option ${index}`}
                          value={option}
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "0 20px",
                            borderRadius: "10px",
                            border: "1px solid",
                            outline: "none",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <Button onClick={handleAddOption}>Add Option</Button>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Button onClick={handlePreview}>Preview</Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </form>
            </>
          )}
        </div>
        <div
          style={{
            display: previewVisible ? "block" : "none",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h5
            style={{
              marginBottom: "20px",
              color: "#333",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
            }}
          >
            Preview
          </h5>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "5px", fontWeight: "bold" }}>Question:</p>
            <div
              dangerouslySetInnerHTML={{ __html: question }}
              style={{ color: "#555", lineHeight: "1.6" }}
            />
          </div>
          {(type === "sc" || type === "mc") && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                Options:
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                      Option {index + 1}:
                    </p>
                    <p style={{ color: "#555" }}>{option}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(type === "sc" || type === "tf") && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                Correct Answer:
              </p>
              <p style={{ color: "green", fontWeight: "bold" }}>
                {correctAnswer}
              </p>
            </div>
          )}
          {type === "mc" && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                Correct Answer(s):
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {correctAnswers.map((answer, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <p
                      style={{
                        color: "green",
                        marginBottom: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Correct Answer {index + 1}:
                    </p>
                    <p style={{ color: "#555" }}>{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onClick={handleClosePreview}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
