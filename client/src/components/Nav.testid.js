import createTestIdFilePath from "../util/createTestIdFilePath";

const TEST_ID = {
  linkToHome: `${createTestIdFilePath("components", "Nav")}-linkToHome`,
  linkToUsers: `${createTestIdFilePath("components", "Nav")}-linkToUser`,
  linkToQuestionDetail: `${createTestIdFilePath(
    "pages",
    "Nav"
  )}-linkToQuestionDetailForAnotherUser`,
};

export default TEST_ID;
