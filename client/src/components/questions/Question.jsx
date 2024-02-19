import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import "./Question.css";

const Question = ({ question, isUserQus = false }) => {
  const id = question._id;
  const [daysAgo, setDaysAgo] = useState("...");
  useEffect(() => {
    const newDate = !question.created_at
      ? "unknown date"
      : new Date(question.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

    setDaysAgo(newDate);
  }, [question.created_at]);
  const [deleteStarted, setDeleteStarted] = useState(false);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/userQuestions/delete/${id}`,
    (res) => {
      console.log(res);
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (deleteStarted) {
      if (confirm("Are you sure you want to delete this question?")) {
        performFetch({ method: "DELETE" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
    return () => {
      cancelFetch();
    };
  }, [deleteStarted]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="question-wrapper">
      <Link to={`/questions/${id}`} className="">
        <h1>{question.question_title}</h1>
      </Link>

      <p>{question.question_content}</p>
      <div className="question-pins">
        {question.module_ids?.map((tag) => (
          <span key={tag} className="pin tag">
            {tag}
          </span>
        ))}
        <span className="flex-spanner"></span>
        <span className="pin">{question.like_counter} LIKES</span>
        <span className="pin">{question.visit_counter} VIEWS</span>
        <span className="pin">
          Asked by {question.user_name} at {daysAgo}
        </span>
      </div>
      <div className="button-group">
        <Button className="icon-button">
          <ThumbUpIcon style={{ fontSize: "18px" }} />
        </Button>
        {isUserQus && (
          <Button
            className="icon-button delete"
            onClick={() => setDeleteStarted(true)}
          >
            <DeleteIcon style={{ fontSize: "18px" }} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Question;
