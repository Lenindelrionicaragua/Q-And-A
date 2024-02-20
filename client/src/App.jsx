import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import PageContent from "./components/PageContent/PageContent";
import Home from "./pages/Home/Home";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LogInPage from "./pages/LoginPage/LoginPage";
import UserList from "./pages/SignUpPage/UserList";
import QuestionDetailsPage from "./pages/QuestionDetailsPage/QuestionDetailsPage";
import QuestionList from "./pages/QuestionPage/QuestionPage";
import PostQuestionPage from "./pages/PostQuestionPage/PostQuestionPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import UserQuestionsPage from "./pages/UserQuestionsPage/UserQuestionsPage";
import UserQuestionDetailsPage from "./pages/UserQuestionDetailsPage/UserQuestionDetailsPage";

const App = () => {
  return (
    <AuthProvider>
      <>
        <Header />
        <Sidebar />
        <PageContent className="overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/sign-up" element={<SignUpPage />} />
            <Route path="/auth/log-in" element={<LogInPage />} />
            {/*  <Route path="/user-profile" element={<UserProfilePage />} /> */}

            {/* nested user routes */}

            <Route path="/user-profile">
              <Route path="" element={<UserProfilePage />} />
              <Route path="questions">
                <Route
                  path="/user-profile/questions"
                  element={<UserQuestionsPage />}
                />
                <Route
                  path=":questionId"
                  element={<UserQuestionDetailsPage />}
                />
              </Route>
            </Route>

            <Route path="/post-question" element={<PostQuestionPage />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/questions/:id" element={<QuestionDetailsPage />} />
            {/* /question-page was created to test db connection to "questions" collection */}
            <Route path="/question-page" element={<QuestionList />} />
          </Routes>
        </PageContent>
      </>
    </AuthProvider>
  );
};

export default App;
