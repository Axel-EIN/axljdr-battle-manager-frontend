import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../constants/urls.js";
import { useParams } from "react-router-dom";

const PageUtilisateurModifier = () => {
  const [utilisateur, setUtilisateur] = useState("");

  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState(null);
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const { utilisateurID } = useParams();

  useEffect( () => {
    recupererUnUtilisateur(utilisateurID);
  }, []);

  const recupererUnUtilisateur = async (utilisateurID) => {
    try {
      const { data, status } = await axios.get(URLS.USER_ONE + '/' + utilisateurID);

      if (status == 200) {
        const utilisateurTrouve = data;
        setUtilisateur(utilisateurTrouve);

        setIdentifiant(utilisateurTrouve.identifiant);
        setEmail(utilisateurTrouve.email);
        setPrenom(utilisateurTrouve.prenom);
        setAvatar(utilisateurTrouve.avatar);
        setRole(utilisateurTrouve.role);
      }

    } catch (erreur) {
      console.error(erreur.message);
    }
  }

  const soumettreFormulaire = async (event) => {
    event.preventDefault(); // Prévient le comportement de rechargement de page par défaut sur le boutton

    let utilisateurModifie = {
      identifiant: identifiant,
      email: email,
      prenom: prenom,
      avatar: avatar,
      role: role,
    }

    if (mdp)
      utilisateurModifie = {...utilisateurModifie, mdp: mdp}

    try {
      await axios.put(
        URLS.USER_EDIT + '/' + utilisateur.id, utilisateurModifie, { withCredentials: true }
      );
      navigate("/admin"); // Rédirection sur page admin
    } catch (erreur) { console.error(erreur.message); }
  };

  return (
    <>
      <h1>Page de Modification d'un Utilisateur !</h1>

      <form onSubmit={soumettreFormulaire}>

        <label htmlFor="identifiant">Identifiant :</label>
        <input type="text" name="identifiant" value={identifiant} onChange={(event) => setIdentifiant(event.target.value)} />

        <label htmlFor="mdp">Mot de passe :</label>
        <input type="password" name="mdp" onChange={(event) => setMdp(event.target.value)} />
 
        <label htmlFor="email">Email :</label>
        <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />

        <label htmlFor="prenom">Prénom</label>
        <input type="text" name="prenom" value={prenom} onChange={(event) => setPrenom(event.target.value)} />

        <label htmlFor="avatar">Avatar</label>
        <input type="avatar" name="avatar" value={avatar} onChange={(event) => setAvatar(event.target.value)} />

        <label htmlFor="role">Role</label>
        <select name="role" id="role" value={role} onChange={(event) => setRole(event.target.value)} >
          <option value="user">Utilisateur</option>
          <option value="mj">Maître du Jeu</option>
          <option value="admin">Administrateur</option>
        </select>

        <button type="submit">Modifier l'utilisateur</button>
      </form>
    </>
  );
};

export default PageUtilisateurModifier;
