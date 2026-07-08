import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // İstifadəçi məlumatlarını (ad, soyad, e-poçt, telefon və s.) yeniləyir.
  const updateUser = (updates) => {
    setUser(prev => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  // TODO: Hazırda backend olmadığı üçün şifrə yalnız localStorage-dəki
  // user obyektində saxlanılır. Real backend qoşulanda bu funksiya
  // müvafiq API sorğusu ilə əvəz olunmalıdır.
  // Xəta mesajları tərcümə edilə bilsin deyə hazır mətn yox, error CODE qaytarır
  // (Settings.jsx bu kodu t() ilə uyğun tərcümə mətninə çevirir).
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

  // Hesabı silir: user state və localStorage təmizlənir.
  const deleteAccount = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, changePassword, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}