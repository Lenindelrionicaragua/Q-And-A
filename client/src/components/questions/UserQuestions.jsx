import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../Context/AuthContext";
import Box from "@mui/material/Box";
import Question from "./Question";

const UserQuestions = () => {
  const { user } = useAuth();

  const { isLoading, error, performFetch } = useFetch(
    "/user/userQuestions/userId/" + user.id,
    fetchUserQuestions
  );
  const [userQuestions, setUserQuestions] = useState([]);

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
      <ul>
        {userQuestions.map((qus) => (
          <Question key={qus._id.toString()} question={qus} isUserQus={true} />
        ))}
      </ul>
    </Box>
  );
};

export default UserQuestions;
