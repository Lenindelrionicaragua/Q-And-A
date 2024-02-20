import "./PostQuestionPage.css";
import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import MultiChoiceModules from "../../components/MultipleChoiceModules/MultipleChoiceModules.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";

const PostQuestionPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Check if user is logged in or not
    if (!user) {
      alert("Sorry! You have to log in before posting a new question 🙂");
      navigate("/auth/log-in");
    }
    return cancelFetch;
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedModules, setSelectedModules] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/questions/create",
    (response) => {
      // Extract the question ID from the response
      const questionId = response.question._id;
      // Navigate to the question's page
      navigate(`/questions/${questionId}`);

      alert("Successful Question creation!");
    }
  );

  const handleModulesSelect = (selectedModules) => {
    setSelectedModules(selectedModules);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        question: {
          user_id: user.id,
          user_name: user.name,
          question_title: title,
          question_content: content,
          module_ids: selectedModules,
        },
      }),
    });
  };

  let statusComponent = null;
  if (error !== null) {
    statusComponent = (
      <div id="postQuestion-status-component">
        Error while trying to post question: {error.toString()}
      </div>
    );
  }

  if (isLoading) {
    statusComponent = (
      <div id="postQuestion-status-component">Posting question...</div>
    );
  }

  return (
    <div id="PostQuestionPage">
      <h1>Post a new question!</h1>
      <hr></hr>
      <h2>
        Hey there{" "}
        <span>
          {!user && "dear guest"}
          {user && user.name}
        </span>
        !
      </h2>
      <h3>
        Got any bugs? Share your experience and let&apos;s find a solution
        together.
      </h3>
      <form id="postQuestionForm" onSubmit={handleSubmit}>
        <div id="postQuestion-input-area">
          <label htmlFor="question-title">
            What would you like to ask about?
            <Input
              name="question-title"
              value={title}
              onChange={(value) => setTitle(value)}
              placeholder="Please enter your question title here."
            />
          </label>
          <label htmlFor="question-content">
            Please share extra information and context about your question.
            <textarea
              name="question-content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Please enter your question content here."
            ></textarea>
          </label>
          <label htmlFor="module-ids">
            Please add the modules that apply for your question:
            <MultiChoiceModules onModulesSelect={handleModulesSelect} />
          </label>
        </div>
        <button id="post-question-button" type="submit">
          Post Question
        </button>
      </form>
      {statusComponent}
    </div>
  );
};

export default PostQuestionPage;
