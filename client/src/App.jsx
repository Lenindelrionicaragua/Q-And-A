import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Nav from "./components/Navigation/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";

const App = () => {
  return (
    <>
      <Header />
      <Nav />
      <main>
        <h1>Each page would load in this area</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" />
          <Route path="/sign-up" />
          <Route path="/ask-a-question" />
          <Route path="/user" element={<UserList />} />
          <Route path="/user/create" element={<CreateUser />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
