import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AvatarCreator from "../../components/AvatarCreator/AvatarCreator";

const UserProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Please log in to view your profile</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <AvatarCreator className="avatar-creator" />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <Button>
        <Link to="/user-profile/questions">My Questions</Link>
      </Button>
    </div>
  );
};

export default UserProfilePage;
