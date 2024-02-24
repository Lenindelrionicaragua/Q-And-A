import React from "react";
// import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetchAvatar";
import "../AvatarCreator/AvatarCreator.css";

const AvatarCreator = () => {
  const { user, updateUser } = useAuth(); // Use useAuth hook to access the user object
  const { generateRandomAvatar } = useFetch();
  const [avatar, setAvatar] = React.useState(null);

  const createAvatar = async () => {
    try {
      const newAvatar = await generateRandomAvatar();
      setAvatar(newAvatar);
      updateUser({ ...user, avatar: newAvatar }); // Update user's avatar in the AuthContext
    } catch (error) {
      console.error("Error generating avatar:", error);
    }
  };

  return (
    <div className="avatar-creator">
      <button className="button-creator" onClick={createAvatar}>
        Create Avatar
      </button>
      {avatar && (
        <div className="avatar-container">
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(avatar)}`}
            alt="Avatar"
            className="avatar-image"
          />
          <div className="avatar-text">{user.name && <h1>{user.name}</h1>}</div>
        </div>
      )}
    </div>
  );
};

export default AvatarCreator;
