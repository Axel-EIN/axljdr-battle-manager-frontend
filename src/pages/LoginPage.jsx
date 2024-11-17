import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContexteUser } from "../contexts/contexteUser.jsx"; // Import du contexte pour les utilisateurs

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(ContexteUser); // Récupération de la fonction pour connecter l'utilisateur en destructurant le ContexteUtilisateur

  const handleSubmit = async (event) => {
    event.preventDefault(); // On previent le rechargement de page par défaut
    try {
      await loginUser(login, password);
      navigate("/");
    } catch ({response}) {
      alert(response.data.error); }
  };

  return (
    <>
      <h1>PAGE CONNEXION</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login" >Identifiant :</label>
        <input type="text" id="login" name="login" value={login} onChange={(event) => setLogin(event.target.value)} />

        <label htmlFor="password" >Mot de passe :</label>
        <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />

        <button type="submit">Se connecter</button>
      </form>
    </>
  );
};

export default LoginPage;
