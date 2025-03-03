import React, { useEffect, useState } from "react";
import { categories } from "../../data/appData";
import { updateQuestion } from "../../services/questionService";

const EditQuestion = ({ question, onQuestionUpdated, onCancel }) => {
  const [category, setCategory] = useState(question.category);
  const [text, setText] = useState(question.text);
  const [options, setOptions] = useState(question.options);
  const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer);

  useEffect(() => {
    if (question) {
      setCategory(question.category);
      setText(question.text);
      setOptions(question.options);
      setCorrectAnswer(question.correctAnswer);
    }
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedQuestion = {
      id: question.id,
      category,
      text,
      options,
      correctAnswer,
    };
    const updatedQuestions = updateQuestion(updatedQuestion);
    onQuestionUpdated(updatedQuestions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Edit Question</h2>
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
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Update Question
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuestion;
