import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../contexts/AuthContext";
import Box from "@mui/material/Box";
import QuestionItem from "../QuestionItem/QuestionItem";
import Typography from "@mui/material/Typography";

const UserQuestionList = () => {
  const { user } = useAuth();

  const { isLoading, error, performFetch } = useFetch(
    "/user/userQuestions/userId/" + user.id,
    fetchUserQuestions
  );

  const [userQuestions, setUserQuestions] = useState([]);

  const hasQuestions = userQuestions.length > 0;

  function fetchUserQuestions(res) {
    setUserQuestions(res.result);
  }

  useEffect(() => {
    performFetch();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Box component="section" py={4}>
      {hasQuestions && (
        <ul>
          {userQuestions.map((qus) => (
            <QuestionItem
              key={qus._id}
              question={qus}
              onDelete={setUserQuestions}
            />
          ))}
        </ul>
      )}
      {!hasQuestions && (
        <Typography variant="h5" component="h2">
          You do not have any questions yet!
        </Typography>
      )}
    </Box>
  );
};

export default UserQuestionList;
