import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

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
      <Link to="/user-profile/questions">My Questions</Link>
    </div>
  );
};

export default UserProfilePage;
