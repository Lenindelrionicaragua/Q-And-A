import React, { useEffect, useState } from "react";

import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import TEST_ID from "./CreateUser.testid";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invitationCode, setInvitationCode] = useState("");

  const onSuccess = () => {
    setName("");
    setEmail("");
    setPassword("");
    setInvitationCode("");
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: { name, email, password, invitationCode } }),
    });
  };

  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div data-testid={TEST_ID.errorContainer}>
        Error while trying to create user: {error.toString()}
      </div>
    );
  } else if (isLoading) {
    statusComponent = (
      <div data-testid={TEST_ID.loadingContainer}>Creating user....</div>
    );
  }

  return (
    <div data-testid={TEST_ID.container}>
      <h1>What should the user be?</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={name}
          onChange={(value) => setName(value)}
          placeholder="Enter your name"
          data-testid={TEST_ID.nameInput}
        />
        <br />
        <Input
          name="email"
          value={email}
          onChange={(value) => setEmail(value)}
          placeholder="Enter your email"
          data-testid={TEST_ID.emailInput}
        />
        <br />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(value) => setPassword(value)}
          placeholder="Enter your password"
          data-testid={TEST_ID.passwordInput}
        />
        <br />
        <Input
          name="invitationCode"
          value={invitationCode}
          onChange={(value) => setInvitationCode(value)}
          placeholder="Enter your invitation code"
          required
        />
        <button type="submit" data-testid={TEST_ID.submitButton}>
          Submit
        </button>
      </form>
      {statusComponent}
    </div>
  );
};

export default CreateUser;
