import React from "react";
import "./SignUpButton.css";
import { Link } from "react-router-dom";

export function SignUpButton() {
  return (
    <Link to="/auth/sign-up">
      <button className="btn">Sign Up</button>
    </Link>
  );
}
