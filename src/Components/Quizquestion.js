import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/Quiz.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const QuizApp = () => {
  const category = useSelector((state) => state.Cat.category);
  const Username = useSelector((state) => state.User.username);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      fetchQuizData();
    }
    // Ensure category is set before fetching quiz data
  }, [category]);

  const fetchQuizData = () => {
    axios
      .get(`http://localhost:3000/${category}`)
      .then((response) => {
        setQuizData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  };

  const handleAnswerClick = (selectedOption) => {
    const updatedAnswers = {
      ...selectedAnswers,
      [currentQuestionIndex]: selectedOption,
    };
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleGoToHome = () => {
    navigate("/Home");
  };


  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    Object.keys(selectedAnswers).forEach((questionIndex) => {
      const answeredOption = selectedAnswers[questionIndex];
      const correctAnswer = quizData[questionIndex].answer;
      if (answeredOption === correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowResults(true);
    saveQuizHistory()
  };
  
  const getScoreMessage = () => {
    if (score === quizData.length) {
      return "Congratulations! You got a perfect score!";
    } else if (score >= Math.floor(quizData.length / 2)) {
      return "Well done! You did a great job!";
    } else {
      return "Keep practicing! You'll improve!";
    }
  };
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0); // Reset current question index to the first question
    setScore(0); // Reset score to 0
    setShowResults(false); // Hide results
    setSelectedAnswers({}); // Clear selected answers
  };


  
  const viewSelectedAnswers = () => {
    return quizData.map((question, index) => (
      <div key={index}>
        <p>
          Q.{question.id}: {question.question}
        </p>
        <p>
          Selected Answer:{" "}
          {selectedAnswers[index]
            ? selectedAnswers[index]
            : "You didn't select an answer"}
        </p>
        <p>Correct Answer: {question.answer}</p>
      </div>
    ));
  };

  const saveQuizHistory = () => {
    // Save quiz history with scores to a database or any storage mechanism
    const quizHistory = {
      user:Username,
      quizCategory: category,
      score: score,
      selectedAnswers: selectedAnswers,
    };
    // Example: You can send an API request to store this information
    axios.post("http://localhost:3000/quiz-history", quizHistory)
      .then((response) => {
        console.log("Quiz history saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving quiz history:", error);
      });
  };



  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      {!showResults && currentQuestion && (
        <div className="question-container" key={currentQuestion.id}>
          <h3>
            Q.{currentQuestion.id} {currentQuestion.question}
          </h3>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={
                  selectedAnswers[currentQuestionIndex] === option
                    ? "selected-answer"
                    : ""
                }
              >
                {option}
              </li>
            ))}
             {showResults && (
              <div className="results-container">
                <h2>Results</h2>
                <p>Your Score: {score}</p>
                <p>{getScoreMessage()}</p>
                <button onClick={handleRestartQuiz}>Restart Quiz</button>
                </div>
             )}
          </ul>
          
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button onClick={handlePrevQuestion}>Previous</button>
            )}
            {currentQuestionIndex < quizData.length - 1 && (
              <button onClick={handleNextQuestion}>Next</button>
            )}

            {currentQuestionIndex === quizData.length - 1 && (
              <button onClick={handleSubmitQuiz}>Submit</button>
            )}

          </div>
          {currentQuestion.hint && (
            <p className="hint-text">Hint:{currentQuestion.hint}</p>
          )}
        </div>
      )}
    {showResults && (
        <div className="results-container">
          <h2>Results</h2>
          <p>Your Score: {score}</p>
          <p>{getScoreMessage()}</p>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
          <button onClick={handleGoToHome}>Go to Home</button>
          <div className="selected-answers">
            <h3>Selected Answers</h3>
            {viewSelectedAnswers()}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
