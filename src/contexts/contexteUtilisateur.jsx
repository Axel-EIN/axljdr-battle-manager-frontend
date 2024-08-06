import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { URLS } from "../constants/urls.js";

export const ContexteUtilisateur = createContext();

export const FournisseurUtilisateur = ({ children }) => {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    recupererUtilisateurCourant();
  }, []);

  // Fonction pour récupérer l'Utilisateur Courant déjà authentifié
  const recupererUtilisateurCourant = async () => {
    try {
      const { data, status } = await axios.get(URLS.USER_CURRENT, {
        withCredentials: true // Permet d'envoyer le cookier jwt lors de la requête
      });

      console.log("data", data);

      if ( status == 200 ) {
        const utilisateurCourant = data;
        setUtilisateur(utilisateurCourant);
      }

    } catch (error) {
      console.error("error", error);
    }
  };

  // Fonction pour connecter l'Utilisateur pas encore authentifié
  const connecterUtilisateur = async (identifiant, mdp) => {
    
    const { data, status } = await axios.post(URLS.USER_LOGIN, {
      identifiant: identifiant,
      mdp: mdp,
    }, {
      withCredentials: true
    });

    if ( status === 200 ) {
      const utilisateurConnecte = data;
      setUtilisateur(utilisateurConnecte);
    }
  };

  // Fonction pour déconnecter l'Utilisateur
  const deconnecterUtilisateur = () => {
    setUtilisateur(null);
  };

  return (
    <ContexteUtilisateur.Provider value={{ utilisateur, connecterUtilisateur, deconnecterUtilisateur }}>
      {children}
    </ContexteUtilisateur.Provider>
  );
};
