import React, { useEffect, useState } from "react";

import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";

const PostQuestion = () => {
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
      <div>Error while trying to post question: {error.toString()}</div>
    );
  } else if (isLoading) {
    statusComponent = <div>Posting question...</div>;
  }

  return (
    <div>
      <h1>Post a new question!</h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          value={title}
          onChange={(value) => setTitle(value)}
          placeholder="Enter your question title"
        />
        <br></br>
        <br></br>
        <Input
          name="content"
          value={content}
          onChange={(value) => setContent(value)}
          placeholder="Enter your question content"
        />
        <br></br>
        <br></br>
        <button type="submit">Submit</button>
      </form>
      {statusComponent}
    </div>
  );
};

export default PostQuestion;
