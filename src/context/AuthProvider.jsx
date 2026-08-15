import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import * as authService from "../services/authService";
import * as avatarService from "../services/avatarService";
import * as profileService from "../services/profileService";

const AUTH_TOKEN_KEY = "authToken";

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
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
    navigate("/");
  };

  const updateUser = async (updates) => {
    const updatedUser = await authService.updateProfile(updates);
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await authService.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "user_not_found";
      return { success: false, error: message };
    }
  };

  const deleteAccount = async () => {
    await authService.deleteAccount();
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUserLocal = (updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  const uploadAvatar = async (file) => {
    if (!user?.id) return;
    const result = await avatarService.uploadAvatar(user.id, file);
    updateUserLocal({ avatarUrl: result.avatarUrl });
    return result;
  };

  const removeAvatar = async () => {
    if (!user?.id) return;
    await avatarService.deleteAvatar(user.id);
    updateUserLocal({ avatarUrl: null });
  };

  const refreshUser = async () => {
    const freshUser = await authService.getCurrentUser();
    setUser(freshUser);
    localStorage.setItem("user", JSON.stringify(freshUser));
    return freshUser;
  };

  const completeProfile = async (payload) => {
    await profileService.completeProfile(payload);
    const freshUser = await refreshUser();
    return freshUser;
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
        uploadAvatar,
        removeAvatar,
        refreshUser,
        completeProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}