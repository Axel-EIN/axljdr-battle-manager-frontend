import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { URLS } from "../constants/urls.js";

export const ContexteUtilisateur = createContext();

export const FournisseurUtilisateur = ({ children }) => {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    recupererUtilisateurLocal();
  }, []);

  // Fonction pour récupérer l'Utilisateur enregistré dans le Storage Local
  const recupererUtilisateurLocal = async () => {
    try {
      // récupération du champ "utilisateur" dans le storage local
      const utilisateurLocal = localStorage.getItem("utilisateur");

      if (utilisateurLocal != null) // Si l'utilisateur existe
        setUtilisateur(JSON.parse(utilisateurLocal)); // On lit la chaîne et la transforme en JSON et met à jour le state utilisateur
    } catch (error) {
      console.error("error", error);
    }
  };

  // Fonction pour connecter l'Utilisateur et mettre à jour le Storage Local
  const connecterUtilisateur = async (identifiant, mdp) => {
    
    // Requête pour connecter l'utilisateur
    const { data, status } = await axios.post(URLS.USER_LOGIN, {
      identifiant: identifiant,
      mdp: mdp,
    });

    if ( status === 200 ) {
      const utilisateurConnecte = data;
      setUtilisateur(utilisateurConnecte);
      // On crée un champ utilisateur dans le storage local en le transformant en chaîne
      localStorage.setItem("utilisateur", JSON.stringify(utilisateurConnecte));
      return utilisateurConnecte; // On renvoit l'utilisateur
    }

  };

  // Fonction pour déconnecter l'Utilisateur et mettre à jour le Storage Local
  const deconnecterUtilisateur = () => {
    setUtilisateur(null);
    localStorage.removeItem("utilisateur");
  };

  // Fonction pour inscrire l'Utilisateur
  const inscrireUtilisateur = async (donneesUtilisateur) => {
    const nouvelUtilisateur = await axios.post(URLS.USER_REGISTER, donneesUtilisateur);
    setUtilisateur(nouvelUtilisateur);
  };

  return (
    <ContexteUtilisateur.Provider value={{ utilisateur, connecterUtilisateur, deconnecterUtilisateur, inscrireUtilisateur }}>
      {children}
    </ContexteUtilisateur.Provider>
  );
};
