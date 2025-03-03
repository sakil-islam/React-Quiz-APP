import React, { useEffect, useState } from "react";
import { initialUsers } from "../data/appData";
import { loadState, removeState, saveState } from "../utils/localStorage";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => loadState("user") || null);
  const [users, setUsers] = useState(() => loadState("users") || initialUsers);

  useEffect(() => {
    saveState("user", user);
  }, [user]);

  useEffect(() => {
    saveState("users", users);
  }, [users]);

  const login = (id, password) => {
    const foundUser = users.find((u) => u.id === id && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    removeState("user");
    // localStorage.removeItem("quizAnswers");
  };

  const register = (id, password) => {
    const newUser = { id, password, role: "user" };
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      saveState("users", updatedUsers);
      return updatedUsers;
    });
    return true;
  };

  const value = {
    user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
