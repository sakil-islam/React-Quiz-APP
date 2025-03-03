import React, { useEffect, useState } from "react";
import { deleteQuestion, getQuestions } from "../../services/questionService";
import AddQuestion from "./AddQuestion";
import EditQuestion from "./EditQuestion";
import QuestionList from "./QuestionList";

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    const fetchedQuestions = getQuestions();
    setQuestions(fetchedQuestions);
  };

  const handleQuestionAdded = (updatedQuestions) => {
    setQuestions(updatedQuestions);
    setEditingQuestion(null);
  };

  const handleQuestionUpdated = (updatedQuestions) => {
    setQuestions(updatedQuestions);
    setEditingQuestion(null);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = deleteQuestion(id);
    setQuestions(updatedQuestions);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AddQuestion onQuestionAdded={handleQuestionAdded} />
      {editingQuestion ? (
        <EditQuestion
          question={editingQuestion}
          onQuestionUpdated={handleQuestionUpdated}
          onCancel={handleCancelEdit}
        />
      ) : null}
      <QuestionList
        questions={questions}
        onDelete={handleDeleteQuestion}
        onEdit={handleEditQuestion}
      />
    </div>
  );
};

export default AdminDashboard;
