import { createContext, useState } from "react";
import { registerUser, loginUser } from "../config/authApi";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const initialUser = {
    id: "",
    name: "",
    email: "",
    token: "",
    isCreated: false,
    error: "",
  };
  const [user, setUser] = useState(initialUser);

  const handleRegister = async (userData) => {
    try {
      const { isSuccess } = await registerUser(userData);
      setUser({ ...user, isCreated: isSuccess });
    } catch (error) {
      setUser({
        ...initialUser,
        error:
          error.message || "There is something word with the registration!",
      });
      console.error("Registration failed: ", error.message);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const { message: token, owner } = await loginUser(credentials);
      localStorage.setItem("userToken", token);
      setUser({ ...user, token, ...owner });
    } catch (error) {
      setUser({
        ...initialUser,
        error:
          error.message ||
          "There is something word with your password or email!",
      });
      console.error("Loggin failed: ", error.message);
    }
  };

  const userContextValue = {
    user,
    handleRegister,
    handleLogin,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };

export default UserContext;
