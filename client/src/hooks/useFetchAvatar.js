import axios from "axios";

const useFetchAvatar = () => {
  const generateRandomAvatar = async () => {
    try {
      const randomSeed = Math.random().toString(36).substring(7);
      const response = await axios.get(
        `https://api.dicebear.com/7.x/pixel-art/svg?seed=${randomSeed}`
      );
      return response.data;
    } catch (error) {
      console.error("Error creating avatar:", error);
      return null;
    }
  };

  return { generateRandomAvatar };
};

export default useFetchAvatar;
