import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const PageContent = ({ children, testId }) => {
  return (
    <Box component="main" py={4} data-testid={testId}>
      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
};

export default PageContent;
