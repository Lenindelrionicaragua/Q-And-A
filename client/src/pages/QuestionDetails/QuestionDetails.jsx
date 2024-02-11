import React, { useEffect, useState } from "react";
import QuestionBox from "../../components/QuestionBox/QuestionBox";
import AnswerBox from "../../components/AnswerBox/AnswerBox";
import CreateAnswerBox from "../../components/CreateAnswerBox/CreateAnswerBox";
import { useParams } from "react-router-dom";

const QuestionDetail = () => {
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const { id } = useParams();

  //We should fetch the question and answers from the server using the id and set the state accordingly. I used a mock data for now.

  useEffect(() => {
    setQuestion({
      title: "This is the question title",
      subtitle: "This is the question subtitle",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam. ",
      module: "JAVASCRIPT",
      likeCount: 22,
      answerCount: 2,
      viewCount: 3,
      userName: "Christina",
      time: 5,
    });

    setAnswers([
      {
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam.          ",
        likeCount: 2,
        userName: "Zehra",
        time: 55,
      },
      {
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam. ",
        likeCount: 9,
        userName: "Liz",
        time: 5,
      },
    ]);
  }, []);

  const handleSubmit = (answerTitle, answerContent) => {
    const newAnswer = {
      title: answerTitle,
      content: answerContent,
    };

    fetch("/api/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAnswer),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setAnswers([...answers, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <QuestionBox question={question} />
      {answers.map((answer, i) => (
        <AnswerBox key={i} answer={answer} />
      ))}
      <CreateAnswerBox handleSubmit={handleSubmit} />
    </div>
  );
};

export default QuestionDetail;
