import React from "react";

const QuestionList = ({ questions, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Category</th>
            <th className="border border-gray-400 px-4 py-2">Question</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id} className="hover:bg-gray-100">
              <td className="border border-gray-400 px-4 py-2">
                {question.category}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {question.text}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <button
                  onClick={() => onEdit(question)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(question.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
