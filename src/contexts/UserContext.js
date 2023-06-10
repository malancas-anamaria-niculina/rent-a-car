import { createContext, useState } from "react";
import { registerUser, loginUser } from "../config/authApi";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const initialUser = {
    id: "",
    name: "",
    email: "",
    token: "",
    error: "",
  };
  const [user, setUser] = useState(initialUser);

  const handleRegister = async (userData) => {
    try {
      const registredUser = await registerUser(userData);
      console.log(registerUser);
      setUser(registredUser);
    } catch (error) {
      console.error("Registration failed: ", error.message);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const { message: token, isSuccess, owner } = await loginUser(credentials);
      console.log(token, isSuccess, owner);
      setUser({ ...user, token });
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
