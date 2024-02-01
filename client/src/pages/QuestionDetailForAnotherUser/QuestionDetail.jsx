import React, { useEffect, useState } from "react";
import QuestionBox from "../../components/QuestionBox/QuestionBox";
import AnswerBox from "../../components/AnswerBox/AnswerBox";
import CreateAnswerBox from "../../components/CreateAnswerBox/CreateAnswerBox";

const QuestionDetail = () => {
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setQuestion({
      title: "This is the question title",
      subtitle: "This is the question subtitle",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam. ",
      module: "JAVASCRIPT",
      likeCount: 2,
      answerCount: 2,
      viewCount: 3,
      userName: "Zehra",
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
        userName: "Zek",
        time: 5,
      },
    ]);
  }, []);

  const handleSubmit = (answerTitle, answerContent) => {
    console.log(answerTitle);
    console.log(answerContent);

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
