import React from "react";
import "./CreateAnswerBox.css";
import PropTypes from "prop-types";

const CreateAnswerBox = ({ handleSubmit }) => {
  const [answerTitle, setAnswerTitle] = React.useState("");
  const [answerContent, setAnswerContent] = React.useState("");

  return (
    <div className="create-answer-wrapper">
      <form
        className="form-group"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(answerTitle, answerContent);
        }}
      >
        <div className="description-wrapper">
          <h3>This is a create answer box</h3>
          <p>Save your changes before leaving the page</p>
        </div>
        <hr />
        <input
          placeholder="INSERT TITLE"
          type="text"
          value={answerTitle}
          onChange={(event) => {
            setAnswerTitle(event.target.value);
          }}
        />
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
  );
};

CreateAnswerBox.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default CreateAnswerBox;
