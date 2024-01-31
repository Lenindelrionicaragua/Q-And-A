import React from "react";
import { Link } from "react-router-dom";

import TEST_ID from "./Nav.testid";

const Nav = () => {
  return (
    <ul>
      <Link to="/" data-testid={TEST_ID.linkToHome}>
        <li></li>
      </Link>
      <Link to="/user" data-testid={TEST_ID.linkToUsers}>
        <li></li>
      </Link>
    </ul>
  );
};

export default Nav;
