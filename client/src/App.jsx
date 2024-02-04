import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./Context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/user/login" element={<LoginPage />} />
        </Routes>
      </>
    </AuthProvider>
  );
};

export default App;
