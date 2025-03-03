import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getAnswerHistoryForQuestion } from "../services/answerService";

const Answers = () => {
  const [answers, setAnswers] = useState([]);
  const [category, setCategory] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && category) {
      const fetchedAnswers = getAnswerHistoryForQuestion(category);
      setAnswers(fetchedAnswers);
    }
  }, [user, category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Question Answers</h2>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select Category:
        </label>
        <select
          id="category"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Math">Math</option>
        </select>
      </div>

      {category ? (
        <div>
          {answers.length === 0 ? (
            <p>No answers recorded for this category.</p>
          ) : (
            <ul className="list-disc pl-5">
              {answers.map((answer, index) => (
                <li key={index} className="mb-2">
                  <p>
                    <span className="font-semibold text-sky-600">
                      User Name:
                    </span>{" "}
                    {answer?.userId}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-600">
                      Question:
                    </span>{" "}
                    {answer?.questionText}
                  </p>
                  {answer?.answerHistory?.map((history, index) => (
                    <div key={index}>
                      <p>
                        <span className="font-semibold">Your Answer:</span>{" "}
                        {history.answer}
                      </p>
                      <p>
                        <span className="font-semibold">Correct:</span>{" "}
                        {history.isCorrect ? "Yes" : "No"}
                      </p>
                      <p>
                        <span className="font-semibold">Timestamp:</span>{" "}
                        {new Date(history.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Please select a category to view your answers.</p>
      )}
    </div>
  );
};

export default Answers;
