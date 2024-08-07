import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../constants/urls.js";

const PageUtilisateurCreer = () => {
  const [identifiant, setIdentifiant] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [prenom, setPrenom] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const soumettreFormulaire = async (event) => {
    event.preventDefault(); // Prévient le comportement de rechargement de page par défaut sur le boutton
    const nouvelleUtilisateur = {
      identifiant: identifiant,
      email: email,
      mdp: mdp,
      prenom: prenom,
      avatar: avatar,
      role: role
    }

    try {
      await axios.post( URLS.USER_CREATE, nouvelleUtilisateur, { withCredentials: true } );
      navigate("/admin"); // Rédirection sur la page admin
    } catch (erreur) {
      console.error(erreur.message);
    }
  };

  return (
    <>
      <h1>Page de Création d'un Utilisateur !</h1>

      <form onSubmit={soumettreFormulaire}>

        <label htmlFor="identifiant">Identifiant :</label>
        <input type="text" name="identifiant" value={identifiant} onChange={(event) => setIdentifiant(event.target.value)} />

        <label htmlFor="mdp">Mot de passe :</label>
        <input type="password" name="mdp" value={mdp} onChange={(event) => setMdp(event.target.value)} />
      
        <label htmlFor="email">Email :</label>
        <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />

        <label htmlFor="prenom">Prénom</label>
        <input type="text" name="prenom" value={prenom} onChange={(event) => setPrenom(event.target.value)} />

        <label htmlFor="avatar">Avatar</label>
        <input type="avatar" name="avatar" value={avatar} onChange={(event) => setAvatar(event.target.value)} />

        <label htmlFor="role">Role</label>
        <select name="role" id="role" onChange={(event) => setRole(event.target.value)} >
          <option defaultValue value="user">Utilisateur</option>
          <option value="mj">Maître du Jeu</option>
          <option value="admin">Administrateur</option>
        </select>

        <button type="submit">Créer l'utilisateur</button>
      </form>
    </>
  );
};

export default PageUtilisateurCreer;
