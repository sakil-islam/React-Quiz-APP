import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import {
  getAnswerHistoryForQuestion,
  saveAnswer,
} from "../../services/answerService";
import { getQuestions } from "../../services/questionService";

const Quiz = ({ category, onCategorySelect }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const allQuestions = getQuestions();
    const filteredQuestions = allQuestions.filter(
      (q) => q.category === category
    );
    setQuestions(filteredQuestions);
    initializeAnswers(filteredQuestions);
  }, [category]);

  const initializeAnswers = (questions) => {
    const initialAnswers = {};
    questions.forEach((question) => {
      const answerHistory = getAnswerHistoryForQuestion(
        user.id,
        category,
        question.id
      );
      initialAnswers[question.id] =
        answerHistory.length > 0
          ? answerHistory[answerHistory.length - 1].answer
          : "";
    });
    setAnswers(initialAnswers);
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      const isCorrect = answers[question.id] === question.correctAnswer;
      saveAnswer(
        user.id,
        category,
        question.id,
        question.text,
        answers[question.id],
        isCorrect
      );
      if (isCorrect) {
        correctCount++;
      }
    });

    setCorrectAnswersCount(correctCount);
    setSubmitted(true);
    setCanEdit(true);
  };

  const handleEditQuiz = () => {
    setSubmitted(false);
    setCanEdit(false);
  };

  const handleSelectNewCategory = () => {
    onCategorySelect();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Quiz: {category}</h2>

      {!submitted ? (
        <div>
          {questions.map((question) => (
            <div key={question.id} className="mb-8">
              <h3 className="text-xl font-semibold mb-2">{question.text}</h3>
              <div className="grid grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(question.id, option)}
                    className={`p-3 rounded-md text-left ${
                      answers[question.id] === option
                        ? "bg-blue-200"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center">
            <button
              onClick={handleSubmitQuiz}
              className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              disabled={Object.keys(answers).length !== questions.length}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <p className="text-lg">
            Correct Answers: {correctAnswersCount} / {questions.length}
          </p>
          <div className="flex justify-center mt-4">
            {canEdit && (
              <button
                onClick={handleEditQuiz}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit Quiz
              </button>
            )}
            <button
              onClick={handleSelectNewCategory}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Select Another Category
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
