import "./PostQuestionPage.css";
import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

// Import AuthContext to get user data
import { useAuth } from "../../Context/AuthContext.js";
import { logInfo } from "../../../../server/src/util/logging.js";

const PostQuestionPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedModules, setSelectedModules] = useState("");
  const [selectedModulesArray, setSelectedModulesArray] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/questions/create",
    (response) => {
      if (response) {
        setSuccessMessage("Successful Question creation!");
        logInfo(successMessage);
        setTitle("");
        setContent("");
        setSelectedModules("");
        alert(successMessage);
      }
    }
  );

  const navigate = useNavigate();

  // Extract user data from Authentication Context
  const { user } = useAuth();

  // TODO: on next stages, `selectedModules` should contain an array of references to ObjectIds from `Modules` collection. User should be able to choose between many Module options (multiple choice, in a dropdown menu).
  // Handle Modules Input
  const setModulesInputToArray = (modulesString) => {
    const modulesArray = modulesString
      .split(",")
      .map((module) => module.trim());
    setSelectedModulesArray(modulesArray);
  };

  useEffect(() => {
    // Check if user is logged in or not
    if (!user) {
      alert("Sorry! You have to log in before posting a new question 🙂");
      navigate("/auth/log-in");
    }

    if (user) {
      setUserId(user.id);
    }

    return cancelFetch;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    logInfo(userId, title, content, selectedModules);

    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        question: {
          user_id: userId,
          question_title: title,
          question_content: content,
          module_ids: selectedModulesArray,
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
            Add the module names that apply for your question. Please separate
            them by using comma:
            <Input
              name="module_ids"
              value={selectedModules}
              onChange={(value) => {
                setSelectedModules(value);
                if (selectedModules.length > 0) {
                  setModulesInputToArray(selectedModules);
                }
              }}
              placeholder="Please enter your module names here."
            />
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
