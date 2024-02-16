import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../Context/AuthContext";

const UserQuestions = () => {
  const { user } = useAuth();
  console.log(user);
  const { isLoading, error, performFetch } = useFetch(
    "/user/userQuestions",
    fetchUserQuestions
  );

  function fetchUserQuestions(res) {
    console.log(res);
  }

  useEffect(() => {
    performFetch({
      headers: {
        Authorization: user.id,
        "content-type": "application/json",
      },
    });
  }, []);
  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return <div></div>;
};

export default UserQuestions;
