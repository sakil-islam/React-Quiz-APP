import React, { useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserDashboard from '../src/components/User/UserDashboard';
import Navbar from './components/Navbar';
import AuthContext from './context/AuthContext';
import AuthProvider from "./context/AuthProvider";
import Answers from './pages/Answers';
import NotFound from './pages/NotFound';
import Questions from './pages/Questions';
import SignIn from './pages/SignIn';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/questions" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Questions />
            </ProtectedRoute>
          } />
          <Route path="/answers" element={<ProtectedRoute allowedRoles={['admin']}><Answers /></ProtectedRoute>} />
          <Route path="/" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return user.role === 'admin' ? <Navigate to="/questions" /> : <Navigate to="/" />;
  }

  return children;
};

export default App;