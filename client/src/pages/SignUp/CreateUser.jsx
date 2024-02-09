import React, { useEffect, useState } from "react";
import "./CreateUser.css";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import TEST_ID from "./CreateUser.testid";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const navigate = useNavigate();

  const onSuccess = () => {
    setName("");
    setEmail("");
    setPassword("");
    setInvitationCode("");
    navigate("/user/login");
    alert("You signed up successfully! Login to continue.");
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
      <div
        data-testid={TEST_ID.errorContainer}
        style={{
          color: "#e23030",
          fontSize: "13px",
          textAlign: "center",
          lineHeight: "34px",
        }}
      >
        {error.toString()}
      </div>
    );
  } else if (isLoading) {
    statusComponent = (
      <div data-testid={TEST_ID.loadingContainer}>Creating user....</div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        paddingTop: "32px",
      }}
    >
      <div data-testid={TEST_ID.container} className="signUpWrapper">
        <h1>Sign Up! </h1>
        <form onSubmit={handleSubmit} id="signUpForm">
          <label htmlFor="email">
            Name:
            <Input
              name="name"
              value={name}
              onChange={(value) => setName(value)}
              placeholder="Enter your name"
              data-testid={TEST_ID.nameInput}
              required
            />
          </label>

          <label htmlFor="password">
            Email:
            <Input
              name="email"
              value={email}
              onChange={(value) => setEmail(value)}
              placeholder="Enter your email"
              data-testid={TEST_ID.emailInput}
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Please enter a valid email address"
            />
          </label>

          <label htmlFor="password">
            Password:
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(value) => setPassword(value)}
              placeholder="Enter your password"
              data-testid={TEST_ID.passwordInput}
              required
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
              title="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number"
            />
          </label>
          <label htmlFor="password">
            Invitation Code:
            <Input
              name="invitationCode"
              value={invitationCode}
              onChange={(value) => setInvitationCode(value)}
              placeholder="Enter your invitation code"
              required
              pattern="^[a-zA-Z0-9]{5}$"
              title="Invitation code must be 5 characters long and contain only alphanumeric characters"
            />
          </label>
          {statusComponent}
          <button
            type="submit"
            data-testid={TEST_ID.submitButton}
            id="signUpButton"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
