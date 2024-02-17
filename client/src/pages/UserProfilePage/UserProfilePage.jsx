import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const UserProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Please log in to view your profile</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <Button>
        <Link to="/user-profile/questions">My Questions</Link>
      </Button>
    </div>
  );
};

export default UserProfilePage;
