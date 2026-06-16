import { createContext, useContext, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/localStorage";

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(getToken());

  const login = (newToken: string) => {
    setToken(newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isLoggedIn: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};