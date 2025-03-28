import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setUser({ role });
    }
  }, []);

  const login = (token, role, navigate) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ role });
    navigate("/dashboard");
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login"); // ← Recibe navigate como argumento
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
