import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import * as authService from "../services/authService";
import * as avatarService from "../services/avatarService";

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


  // DƏYİŞDİ: local state yeniləmə yerinə PUT /api/users/me çağırılır.
  // Backend-dən qayıdan yenilənmiş user obyekti setUser edilir və
  // localStorage yenilənir. Xəta zəngi çağıran tərəfə (Profile.jsx)
  // ötürülür ki, orada try/catch ilə göstərilə bilsin.
  const updateUser = async (updates) => {
    const updatedUser = await authService.updateProfile(updates);
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  };


  // DƏYİŞDİ: local password müqayisəsi yerinə PUT
  // /api/users/change-password çağırılır. Əvvəlki interfeys ({ success,
  // error }) qorunub ki, Profile.jsx-də mövcud error-mapping məntiqi
  // işləməyə davam etsin.
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


  // DƏYİŞDİ: DELETE /api/users/me çağırılır, uğurlu olduqda
  // authToken/user localStorage-dan silinir və user null edilir.
  const deleteAccount = async () => {
    await authService.deleteAccount();
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  // DƏYİŞDİ: avatarUrl-in local sinxronizasiyası üçün ayrıca (backend-ə
  // toxunmayan) helper. updateUser() indi PUT /api/users/me çağırdığından,
  // avatar funksiyalarının davranışını dəyişməmək üçün onlar bunu istifadə
  // edir (avatarService özü artıq öz endpoint-i ilə yükləmə/silməni edir).
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}