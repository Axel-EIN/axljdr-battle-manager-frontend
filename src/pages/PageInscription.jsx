import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../constants/urls.js";

const PageInscription = () => {
  const [identifiant, setIdentifiant] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [prenom, setPrenom] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  // Fonction qui se déclenche lors de la validation du formulaire
  const gererFormulaire = async (event) => {
    event.preventDefault(); // Prévient le comportement de rechargement de page par défaut sur le boutton

    try {
      await axios.post(URLS.USER_REGISTER, {
        identifiant: identifiant,
        email: email,
        mdp: mdp,
        prenom: prenom,
        avatar: avatar,
      });
      navigate("/"); // Rédirection sur la page home
    } catch (erreur) {
      console.error(erreur.message);
    }
  };

  return ( // Affichage de la Vue
    <>
      <h1>PAGE INSCRIPTION</h1>
      <form onSubmit={gererFormulaire}>
        Identifiant :<br />
        <input
          type="text"
          name="identifiant"
          value={identifiant}
          onChange={(event) => setIdentifiant(event.target.value)}
        />
        <br />
        Email :<br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        Mot de passe :<br />
        <input
          type="password"
          name="mdp"
          value={mdp}
          onChange={(event) => setMdp(event.target.value)}
        />
        <br />
        Prenom : <br />
        <input
          type="text"
          name="prenom"
          value={prenom}
          onChange={(event) => setPrenom(event.target.value)}
        />
        <br />
        Avatar :<br />
        <input
          type="avatar"
          name="avatar"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
        />
        <br />
        <button type="submit">S'enregistrer</button>
      </form>
    </>
  );
};

export default PageInscription;
