import React from "react";
import { Link } from "react-router-dom";

import TEST_ID from "./Nav.testid";

const Nav = () => {
  return (
    <ul>
      <li>
        <Link to="/" data-testid={TEST_ID.linkToHome}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/user" data-testid={TEST_ID.linkToUsers}>
          Users
        </Link>
      </li>
      <li>
        <Link to="/user/login" data-testid={TEST_ID.linkToLogin}>
          Login
        </Link>
      </li>
    </ul>
  );
};

export default Nav;
