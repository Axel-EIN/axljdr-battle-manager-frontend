import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { URLS } from "../constants/urls.js";

export const ContexteUser = createContext();

export const UserProdiver = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Mise en place d'un système de loading pour attendre que le contexte récupère l'utilisateur courant
  
  useEffect(() => { getCurrentUser(); }, []);

  // === GET CURRENT USER ===
  const getCurrentUser = async () => {
    try {
      const { data, status } = await axios.get(URLS.USER_CURRENT, { withCredentials: true }); // Permet d'envoyer le cookie jwt lors de la requête
      if ( status == 200 ) setUser(data);
      setLoading(false); // Loading terminé
    } catch (error) {
      console.error("error", error);
      setLoading(false); // Loading terminé
    }
  };

  // === LOGIN USER ===
  const loginUser = async (login, password) => {
    const { data, status } = await axios.post(URLS.USER_LOGIN, { login: login, password: password }, { withCredentials: true });
    if (status === 200) setUser(data);
    setLoading(false); // Loading terminé
  };

  
  // === LOGOUT USER ===
  const logoutUser = async () => {
    const { data, status } = await axios.post(URLS.USER_LOGOUT,{}, { withCredentials: true });
    setUser(null);
  };

  return (
    <ContexteUser.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </ContexteUser.Provider>
  );
};
