import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useFetch from "../../hooks/useFetch";
import TimeAgo from "../TimeAgo/TimeAgo";

const QuestionFooter = ({ classes, question }) => {
  const [userName, setUserName] = useState("");
  const { /* performFetch,*/ cancelFetch } = useFetch(
    `/user/${question.user_id}/name`,
    (response) => {
      setUserName(response.result);
    }
  );

  React.useEffect(() => {
    // performFetch(); // I've a small improvement in my branch and I believe we can use it here. Let's keep this fix for later. We can even return userName from backend in the first place

    return cancelFetch;
  }, []);

  return (
    <Stack
      flex={1}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={3}
    >
      <ul className={classes.tags}>
        {question.module_ids?.map((tag) => (
          <li key={tag}>
            <span>{tag}</span>
          </li>
        ))}
      </ul>
      <Stack
        direction="row"
        alignItems="center"
        spacing={3}
        flexWrap="wrap"
        rowGap={2}
      >
        {/* <Typography>{question.answers.length} Answers</Typography> */}
        <Typography>{question.like_counter} Like</Typography>
        <Typography>{question.visit_counter} Views</Typography>
        <Typography>Asked by:{userName}</Typography>
        <Typography>
          <TimeAgo createdAt={question.created_at} />
        </Typography>
      </Stack>
    </Stack>
  );
};

export default QuestionFooter;
