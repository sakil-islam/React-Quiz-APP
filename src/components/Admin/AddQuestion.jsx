import React, { useState } from "react";
import { categories } from "../../data/appData";
import { addQuestion } from "../../services/questionService";

const AddQuestion = ({ onQuestionAdded }) => {
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      category,
      text,
      options,
      correctAnswer,
    };
    const updatedQuestions = addQuestion(newQuestion);
    onQuestionAdded(updatedQuestions);
    setCategory("");
    setText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Add New Question</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Question Text:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Options:
          </label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Correct Answer:
          </label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Add Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
