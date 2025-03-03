import React, { useState } from "react";
import { categories } from "../../data/appData";
import CategorySelection from "./CategorySelection";
import Quiz from "./Quiz";

const UserDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (questionId, isCorrect) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: isCorrect,
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="container mx-auto p-4">
      {!selectedCategory ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Select Category to Start Quiz
          </h1>
          <CategorySelection
            categories={categories}
            onCategorySelect={handleCategorySelect}
          />
        </>
      ) : (
        <Quiz
          category={selectedCategory}
          onAnswerSelect={handleAnswerSelect}
          onSubmit={handleSubmit}
          onCategorySelect={handleCategorySelect}
        />
      )}
    </div>
  );
};

export default UserDashboard;
