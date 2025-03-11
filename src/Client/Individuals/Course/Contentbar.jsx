import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { setUpdateLessonProgress } from "../../../Store/Hooks/CourseHook";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import axios from "axios";
import { back_base_url } from "../../../util/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notepad from "./Notepad";
const ContentBar = ({
  viewCourse,
  usersById,
  setViewCourse,
  setLesson,
  isClicked,
  per,
  dataStore,
  setIsClicked,
  setDuration,
  setCurrentTime,
  current,
  decryptedId,
  userId,
  lessonId,
  setQuizData,
  setDataStore,
}) => {
  const videoRef = useRef();
  const [started, setStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuizResults, setShowQuizResults] = useState(false);

  const dispatch = useDispatch();

  const handleVideoDurationChange = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      setStarted(true);
      setDuration(duration);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      const updateProgress = () => {
        setCurrentTime(videoRef.current.currentTime);
      };

      const interval = setInterval(updateProgress, 60000);

      videoRef.current.addEventListener("timeupdate", updateProgress);

      return () => {
        clearInterval(interval);
        if (videoRef.current) {
          videoRef.current.removeEventListener("timeupdate", updateProgress);
        }
      };
    }
  }, [started]);
  const makeAsComplete = () => {
    const currentLessonId = lessonId;
    const currentLesson = usersById.lesson.find(
      (lesson) => lesson.lessonId === currentLessonId
    );
    if (currentLesson) {
      dispatch(
        setUpdateLessonProgress({
          data: {
            lessonId: currentLessonId,
            courseId: decryptedId,
            progress: 100,
            lessonTime: current,
            userId: userId,
          },
        })
      );

      const currentIndex = usersById?.lesson?.findIndex(
        (lesson) => lesson.lessonId === currentLessonId
      );

      if (currentIndex < usersById.lesson.length - 1) {
        const nextLesson = usersById.lesson[currentIndex + 1];
        setLesson(nextLesson.lessonId);
        const lessoned = usersById?.course?.chapter?.flatMap((item) =>
          item.LessonFile.filter((i) => i._id === nextLesson.lessonId)
        );
        if (nextLesson.groupquestionid) {
          const questionsGroup = usersById?.course?.chapter?.filter(
            (item) => item?.questionsGroup?._id === nextLesson.groupquestionid
          );
          console.log(questionsGroup[0]);
          setDataStore(questionsGroup[0]?.questionsGroup?.questions);
          setIsClicked(true);
          setViewCourse({
            file: "",
            name: "",
            text: "",
          });
          setLesson(nextLesson.groupquestionid);
        } else {
          setViewCourse({
            file: lessoned[0].LessonUrl,
            name: lessoned[0].LessonType,
            text: lessoned[0].LesssonText,
          });
          dispatch(
            setUpdateLessonProgress({
              data: {
                lessonId: nextLesson.lessonId,
                courseId: decryptedId,
                progress: 0,
                lessonTime: 0,
                userId: userId,
              },
            })
          );
        }
      }
    }
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    setSelectedAnswers((prev) => [...prev, answer]);
  };

  const handleSubmitAnswer = async () => {
    const correctAnswers = viewCourse[currentQuestionIndex]?.correctAnswers;
    const isCorrect = correctAnswers.includes(selectedAnswer);
    const correctAnswer = correctAnswers[0];

    setQuizResults((prevResults) => {
      const newResults = [
        ...prevResults,
        {
          question: viewCourse[currentQuestionIndex]?.questionText,
          answer: selectedAnswer,
          correct: isCorrect,
          correctAnswer: correctAnswer,
        },
      ];

      if (currentQuestionIndex < viewCourse.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
        setShowQuizResults(false);
      } else {
        setShowQuizResults(true);
        setCurrentQuestionIndex();
        updateAverageScoreProgress(newResults);
      }

      return newResults;
    });
  };

  const updateAverageScoreProgress = async (quizResults) => {
    try {
      const response = await axios.patch(
        `${back_base_url}api/v1/users/update-averagescoreprogress`,
        {
          userId: userId,
          courseId: decryptedId,
          groupQuestionId: lessonId,
          averagescoreprogress: calculateFinalAverage(quizResults),
        }
      );
      setQuizData(response.data);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const calculateFinalAverage = (quizResults) => {
    const correctCount = quizResults.filter((result) => result.correct).length;
    return ((correctCount / quizResults.length) * 100).toFixed(2);
  };

  const questionQuizHandler = () => {
    setViewCourse(dataStore);
    setIsClicked(false);
    setShowQuizResults(false);
  };

  const handleBackClick = () => {
    if (currentQuestionIndex > 0) {
      const previousIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(previousIndex);
      setSelectedAnswer(quizResults[previousIndex]?.answer || null);
      setShowQuizResults(false);
    }
  };

  const handleNextClick = () => {
    const correctAnswers = viewCourse[currentQuestionIndex]?.correctAnswers;
    const isCorrect = correctAnswers.includes(selectedAnswer);
    const correctAnswer = correctAnswers[0];

    const newResults = [...quizResults];
    newResults[currentQuestionIndex] = {
      question: viewCourse[currentQuestionIndex]?.questionText,
      answer: selectedAnswer,
      correct: isCorrect,
      correctAnswer: correctAnswer,
    };
    setQuizResults(newResults);

    if (currentQuestionIndex < viewCourse.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(newResults[currentQuestionIndex + 1]?.answer || null);
      setShowQuizResults(false);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && dataStore?.length > 0) {
        setIsClicked(false);
        setLesson();
        setViewCourse({
          file: "",
          name: "",
          text: "",
        });
        setDataStore("");
        toast.warn("You have switched tabs or opened a new tab!");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const averageFilter = usersById?.lesson?.find(
    (item) => item?.groupquestionid === lessonId
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div
        style={{
          maxHeight: "90vh",
          overflowY: "scroll",
          paddingBottom: "3rem",
        }}
      >
        <div>
          <h3>
            {viewCourse?.length
              ? "Quiz"
              : viewCourse.name
              ? viewCourse.name
              : "Course"}
          </h3>
        </div>
        <div style={{ padding: ".5rem 1rem" }}>
          {viewCourse && (
            <div className="d-flex flex-column gap-4">
              {/\.mp4$|\.avi$|\.mov$/.test(viewCourse?.file) && (
                <div className="d-flex align-items-center justify-content-center">
                  <video
                    ref={videoRef}
                    src={viewCourse.file}
                    onLoadedMetadata={handleVideoDurationChange}
                    controls
                    muted={false}
                    style={{
                      width: "90%",
                      height: "425px",
                      backgroundColor: "#000",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                      outline: "none",
                    }}
                    poster={usersById?.course?.coverPage[0]}
                  ></video>
                </div>
              )}
              <div
                style={{ textAlign: "justify" }}
                className="d-flex justify-content-center w-100"
              >
                <Notepad text={viewCourse?.text} lessonId={lessonId} userId={userId}/>
              </div>
              {isClicked && (
                <div className="d-flex flex-column align-items-center">
                  <div style={{ width: "90%" }}>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Impedit vitae sit voluptatem ipsa, amet, maxime quia
                      laboriosam saepe sapiente odit cumque asperiores repellat
                      dolores non consequuntur exercitationem ipsam recusandae
                      aliquid.
                    </p>
                    <div className="w-100 row gap-4 justify-content-between px-5">
                      <span
                        className="col-5 px-3 py-4"
                        style={{
                          border: "1px solid #E7e7e7",
                          borderRadius: "6px",
                          fontSize: "16px",
                          color: "#4CAF50",
                        }}
                      >
                        Excellently achieves above 50%
                      </span>
                      <span
                        className="col-5 px-3 py-4"
                        style={{
                          border: "1px solid #E7e7e7",
                          borderRadius: "6px",
                          fontSize: "16px",
                        }}
                      >
                        Your result --{" "}
                        <strong>{averageFilter?.averagescoreprogress} %</strong>
                      </span>
                    </div>
                    <div
                      className="d-flex flex-column align-items-end py-5"
                      style={{ width: "93%" }}
                    >
                      <button
                        onClick={questionQuizHandler}
                        style={{
                          backgroundColor: "#4CAF50",
                          border: "none",
                          color: "white",
                          padding: "10px 32px",
                          textAlign: "center",
                          textDecoration: "none",
                          display: "inline-block",
                          fontSize: "16px",
                          cursor: "pointer",
                          borderRadius: "8px",
                        }}
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {viewCourse?.length > currentQuestionIndex && (
                <div>
                  <div style={{ maxWidth: 500 }}>
                    <h4 style={{ textTransform: "capitalize" }}>
                      {viewCourse[currentQuestionIndex]?.type}
                    </h4>
                    <div className="d-flex">
                      <span>{currentQuestionIndex + 1}</span>
                      <span style={{ paddingLeft: "1rem" }}>
                        {typeof viewCourse[currentQuestionIndex]
                          ?.questionText === "string" &&
                          parse(viewCourse[currentQuestionIndex]?.questionText)}
                      </span>
                    </div>
                    <ul
                      style={{
                        paddingLeft: "2rem",
                        listStyle: "none",
                      }}
                    >
                      {viewCourse[currentQuestionIndex]?.options?.map(
                        (item, index) => (
                          <li
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: ".5rem",
                              marginBottom: "10px",
                            }}
                          >
                            {viewCourse[currentQuestionIndex]?.type !==
                            "multiple Choice" ? (
                              <>
                                <input
                                  type="radio"
                                  id={`option-${index}`}
                                  name="quiz-option"
                                  value={item}
                                  checked={selectedAnswer === item}
                                  onChange={() => handleSelectAnswer(item)}
                                  hidden
                                />
                                <label
                                  htmlFor={`option-${index}`}
                                  style={{
                                    background:
                                      selectedAnswer === item
                                        ? "#1A4D2E"
                                        : "#F5EFE6",
                                    width: "100%",
                                    padding: "10px 20px",
                                    color:
                                      selectedAnswer === item
                                        ? "#F5EFE6"
                                        : "#1A4D2E",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {item}
                                </label>
                              </>
                            ) : (
                              <>
                                <input
                                  type="checkbox"
                                  id={`option-${index}`}
                                  name={`quiz-option-${index}`}
                                  value={item}
                                  checked={selectedAnswers.includes(item)}
                                  onChange={() => handleSelectAnswer(item)}
                                  hidden
                                />
                                <PiDotsSixVerticalBold />
                                <label
                                  htmlFor={`option-${index}`}
                                  style={{
                                    background: selectedAnswers.includes(item)
                                      ? "#1A4D2E"
                                      : "#F5EFE6",
                                    width: "100%",
                                    padding: "10px 20px",
                                    color: selectedAnswers.includes(item)
                                      ? "#F5EFE6"
                                      : "#1A4D2E",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {item}
                                </label>
                              </>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "1rem",
                    }}
                  >
                    {currentQuestionIndex > 0 && (
                      <button
                        onClick={handleBackClick}
                        style={{
                          background: "#E1F7F5",
                          padding: "5px 20px",
                          borderRadius: "6px",
                          fontWeight: "bold",
                          border: "1px solid #E1F7F5",
                          cursor: "pointer",
                        }}
                      >
                        Back
                      </button>
                    )}
                    {currentQuestionIndex < viewCourse.length - 1 && (
                      <button
                        onClick={handleNextClick}
                        style={{
                          background: "#E1F7F5",
                          padding: "5px 20px",
                          borderRadius: "6px",
                          fontWeight: "bold",
                          border: "1px solid #E1F7F5",
                          cursor: "pointer",
                        }}
                      >
                        Next
                      </button>
                    )}
                    {currentQuestionIndex === viewCourse.length - 1 && (
                      <button
                        onClick={handleSubmitAnswer}
                        style={{
                          background: "#E1F7F5",
                          padding: "5px 20px",
                          borderRadius: "6px",
                          fontWeight: "bold",
                          border: "1px solid #E1F7F5",
                          cursor: "pointer",
                        }}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              )}

              {!isClicked && !viewCourse.file && showQuizResults && (
                <div>
                  <h4>Quiz Results</h4>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {quizResults.map((result, index) => (
                      <li key={index} style={{ marginBottom: "10px" }}>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "1rem",
                          }}
                        >
                          {index + 1}
                          {parse(result?.question)}
                        </span>
                        <p>
                          Your Answer: {result?.answer}{" "}
                          {result.correct ? (
                            <FaCheck
                              style={{ color: "green", marginLeft: "5px" }}
                            />
                          ) : (
                            <span style={{ color: "red", marginLeft: "5px" }}>
                              (Correct Answer: {result?.correctAnswer})
                            </span>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p>Final Average: {calculateFinalAverage(quizResults)}%</p>
                </div>
              )}
            </div>
          )}
        </div>
        {(viewCourse?.file !== "" ||
          viewCourse?.name !== "" ||
          viewCourse?.text !== "") &&
          !viewCourse?.length &&
          viewCourse?.file !== "" &&
          per >= 80 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "91%",
              }}
            >
              <button
                type="button"
                aria-label="Mark as complete"
                style={{
                  backgroundColor: "#D9A128",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  padding: "7px 20px",
                  gap: "1rem",
                }}
                onClick={makeAsComplete}
              >
                <FaCheck />
                Complete and continue
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default ContentBar;
