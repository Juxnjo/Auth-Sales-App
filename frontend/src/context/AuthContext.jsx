import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (storedToken && role) {
      setToken(storedToken);
      setUser({ role });
    }
  }, []);

  const login = (authToken, role, navigate) => {
    localStorage.setItem("token", authToken);
    localStorage.setItem("role", role);
    setToken(authToken);
    setUser({ role });
    navigate("/dashboard");
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
