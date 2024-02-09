import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Nav from "./components/Navigation/Nav";
import PageContent from "./components/ui/PageContent";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/SignUp /CreateUser";
import UserList from "./pages/SignUp /UserList";
import QuestionDetails from "./pages/QuestionDetails";
import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () => {
  return (
    <AuthProvider>
      <>
        <Header />
        <Nav />
        <PageContent className="overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/sign-up" />
            <Route path="/ask-a-question" />
            <Route path="/user" element={<UserList />} />
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/:id" element={<QuestionDetails />} />
          </Routes>
        </PageContent>
      </>
    </AuthProvider>
  );
};

export default App;
