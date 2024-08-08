import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Import du contexte pour les utilisateurs
import { ContexteUtilisateur } from "../contexts/contexteUtilisateur.jsx";

const PageConnexion = () => {
  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");
  const navigate = useNavigate();

  // Récupération de la fonction pour connecter l'utilisateur en destructurant le ContexteUtilisateur
  const { connecterUtilisateur } = useContext(ContexteUtilisateur);

  // Fonction qui se déclenche pour gérer le formulaire quand on appuie sur le bouton valider
  const gererFormulaire = async (event) => {
    event.preventDefault(); // On previent le rechargement de page par défaut
    try {
      await connecterUtilisateur(identifiant, mdp);
      navigate("/");
    } catch ({response}) {
      alert(response.data.error); }
  };

  return (
    <>
      <h1>PAGE CONNEXION</h1>
      <form onSubmit={gererFormulaire}>

        <label htmlFor="identifiant" >Identifiant :</label>
        <input type="text" id="identifiant" name="identifiant" value={identifiant} onChange={(event) => setIdentifiant(event.target.value)} />

        <label htmlFor="mdp" >Mot de passe :</label>
        <input type="password" name="mdp" id="mdp" value={mdp} onChange={(event) => setMdp(event.target.value)} />

        <button type="submit">Se connecter</button>
        
      </form>
    </>
  );
};

export default PageConnexion;
