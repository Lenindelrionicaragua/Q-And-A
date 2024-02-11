import "./PostQuestionPage.css";
import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";

const PostQuestionPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSuccess = () => {
    setTitle("");
    setContent("");
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/questions/create",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ question: { title, content } }),
    });
  };

  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div id="postQuestion-status-component">
        Error while trying to post question: {error.toString()}
      </div>
    );
  } else if (isLoading) {
    statusComponent = (
      <div id="postQuestion-status-component">Posting question...</div>
    );
  }

  return (
    <div id="PostQuestionPage">
      <h1>Post a new question!</h1>
      <hr></hr>
      <h2>
        Hey there <span>user.name</span>!
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
            {/* <Input
              name="question-content"
              value={content}
              onChange={(value) => setContent(value)}
              placeholder="Please enter your question content here."
            /> */}
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
