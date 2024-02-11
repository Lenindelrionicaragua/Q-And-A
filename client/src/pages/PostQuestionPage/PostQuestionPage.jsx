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
      <br></br>
      <form id="postQuestionForm" onSubmit={handleSubmit}>
        <div id="postQuestion-input-area">
          <Input
            name="title"
            value={title}
            onChange={(value) => setTitle(value)}
            placeholder="Enter your question title"
          />
          {/* <br></br>
          <br></br> */}
          <Input
            name="content"
            value={content}
            onChange={(value) => setContent(value)}
            placeholder="Enter your question content"
          />
        </div>
        {/* <br></br>
        <br></br> */}
        <button id="submit-question-button" type="submit">
          Submit
        </button>
      </form>
      {statusComponent}
    </div>
  );
};

export default PostQuestionPage;
