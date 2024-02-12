import React from "react";
import "./CreateAnswer.css";
import PropTypes from "prop-types";
import { useAuth } from "../../Context/AuthContext";
import { red } from "@mui/material/colors";

const CreateAnswer = ({ handleSubmit }) => {
  const [answerContent, setAnswerContent] = React.useState("");

  const { user } = useAuth();

  return (
    <>
      {user ? (
        <div className="create-answer-wrapper">
          <form
            className="form-group"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(answerContent);
              setAnswerContent("");
            }}
          >
            <div className="description-wrapper">
              <h3>Answer this question</h3>
              <p>Save your changes before leaving the page</p>
            </div>
            <hr />
            <input
              placeholder="INSERT CONTENT"
              type="text"
              value={answerContent}
              onChange={(event) => {
                setAnswerContent(event.target.value);
              }}
            />
            <div className="answer-save-btn">
              <button type="submit">Save&Post</button>
            </div>
          </form>
        </div>
      ) : (
        <p style={{ color: "red" }}>Log in to answer this question!</p>
      )}
    </>
  );
};

CreateAnswer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default CreateAnswer;
