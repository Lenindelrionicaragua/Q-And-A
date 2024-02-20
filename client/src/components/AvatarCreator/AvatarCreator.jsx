import React from "react";
import { useAuth } from "../../Context/AuthContext";
import useFetch from "../../hooks/useFetchAvatar";
import "../AvatarCreator/AvatarCreator.css";

const AvatarCreator = () => {
  const { user, updateUserAvatar } = useAuth();
  const { generateRandomAvatar } = useFetch();
  const [avatar, setAvatar] = React.useState(null);

  const createAvatar = async () => {
    try {
      const newAvatar = await generateRandomAvatar();
      setAvatar(newAvatar);
      updateUserAvatar(newAvatar);
    } catch (error) {
      console.error("Error generating avatar:", error);
    }
  };

  return (
    <div className="avatar-creator">
      <button className="button-creator" onClick={createAvatar}>
        Generate Avatar
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
