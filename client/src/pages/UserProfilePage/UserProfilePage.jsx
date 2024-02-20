import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Please log in to view your profile</p>;
  }

  return (
    <div id="user-profile">
      <div id="user-profile-details">
        <h2>User Profile</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <div id="user-profile-action">
        <Button>
          <Link to="/user-profile/questions" className="user-profile-link">
            My Questions
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UserProfilePage;
