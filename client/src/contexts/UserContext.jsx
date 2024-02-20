import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

// Create the provider that wraps the application
const UserProvider = ({ children }) => {
  const [user, setUser] = useState((prevUser) => ({
    avatar: null,
    name: prevUser?.name || "",
  }));

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  // Effect to set a default name if not provided
  useEffect(() => {
    if (!user.name) {
      setUser((prevUser) => ({ ...prevUser, name: "ReactExplorer" }));
    }
  }, [user]); // Ensure to depend on 'user' to run the effect only when 'user' changes

  // Provide the context and its values to child components
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser, UserContext };
