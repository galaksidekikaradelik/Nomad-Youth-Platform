import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import * as authService from "../services/authService";

const AUTH_TOKEN_KEY = "authToken";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    authService
      .getCurrentUser()
      .then((freshUser) => {
        setUser(freshUser);
        localStorage.setItem("user", JSON.stringify(freshUser));
      })
      .catch(() => {
        authService.logout();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);


  const login = async (email, password) => {
    const loggedInUser = await authService.login({ email, password });
    setUser(loggedInUser);
    return loggedInUser;
  };


  const googleLogin = async (idToken) => {
    const loggedInUser = await authService.loginWithGoogle(idToken);
    setUser(loggedInUser);
    return loggedInUser;
  };


  const register = async (formData) => {
    const newUser = await authService.register(formData);
    setUser(newUser);
    return newUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };


  const updateUser = (updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };


  const changePassword = (currentPassword, newPassword) => {
    if (!user) return { success: false, error: "user_not_found" };

    if (user.password && user.password !== currentPassword) {
      return { success: false, error: "wrong_password" };
    }

    const next = { ...user, password: newPassword };
    setUser(next);
    localStorage.setItem("user", JSON.stringify(next));
    return { success: true };
  };


  const deleteAccount = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        googleLogin,
        register,
        logout,
        updateUser,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}