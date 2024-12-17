import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import UsuarioService from "../../../service/UsuarioService";

export const AuthContext = createContext("");

export const UserProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("access_token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const { exibirUsuarioConectado } = UsuarioService();

  useEffect(() => {
    if (authToken && isTokenValid(authToken)) {
      setIsAuthenticated(true);
      fetchUserData();
    } else {
      setIsAuthenticated(false);
      setUserData(null);
    }
  }, [authToken]);

  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const decodedToken = jwtDecode(token);
      return true;
    } catch (error) {
      console.error("Token inválido", error);
      return false;
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await exibirUsuarioConectado();
      setUserData(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário logado", error);
      setAuthToken(null);
      localStorage.removeItem("access_token");
    }
  };

  const refreshUserData = () => {
    if (authToken && isTokenValid(authToken)) {
      fetchUserData();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthToken, userData, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
