import "./PostQuestionPage.css";
import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.js";
// import { logInfo } from "../../../../server/src/util/logging.js";

const PostQuestionPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Check if user is logged in or not
    if (!user) {
      alert("Sorry! You have to log in before posting a new question 🙂");
      navigate("/auth/log-in");
    }
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedModules, setSelectedModules] = useState("");
  const [selectedModulesArray, setSelectedModulesArray] = useState([]);
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

  // Handle Modules Input
  const setModulesInputToArray = (modulesString) => {
    const modulesArray = modulesString
      .split(",")
      .map((module) => module.trim());
    setSelectedModulesArray(modulesArray);
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
          module_ids: selectedModulesArray,
        },
      }),
    });
    return cancelFetch;
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
            them by using comma. --- Please add an extra comma at the end for
            modules to be entered correctly, for example: &quot;HTML, CSS,
            JavaScript,&quot;:
            <Input
              name="module_ids"
              value={selectedModules}
              onChange={(value) => {
                setSelectedModules(value);
                setModulesInputToArray(selectedModules);
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
