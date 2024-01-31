import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const Question = ({ question }) => {
  return (
    <li className="questionItem">
      <Stack
        flex={1}
        direction="row"
        justifyContent="space-between"
        alignItems="start"
      >
        <Stack spacing={2} mb={4}>
          <Link to={`/${question.id}`}>
            <Typography
              component="h3"
              variant="h6"
              fontWeight="bold"
              color="primary.main"
            >
              {question.title}
            </Typography>
          </Link>

          <Typography component="span">{question.excerpt}</Typography>
        </Stack>

        <Button>
          <ThumbUpIcon />
        </Button>
      </Stack>
      <Stack
        flex={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={3}
      >
        <ul className="tags">
          {question.module.map((tag) => (
            <li key={tag} sx={{ bgcolor: "#90caf9" }}>
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
          <Typography>{question.answers.length} Answers</Typography>
          <Typography>{question.likes} Like</Typography>
          <Typography>{question.views} Views</Typography>
          <Typography> Asked by:{question.author}</Typography>
          <Typography>{question.date}</Typography>
        </Stack>
      </Stack>
    </li>
  );
};

export default Question;
