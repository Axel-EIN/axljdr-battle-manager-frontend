import { useState } from "react";

const FormUser = ({ fonctionPropsSoumissionFormulaire, utilisateurInitial = false, register = false }) => {

  const [identifiant, setIdentifiant] = useState(utilisateurInitial.identifiant || '');
  const [identifiantChange, setIdentifiantChange] = useState(false);

  const [mdp, setMdp] = useState('');
  const [mdpChange, setMdpChange] = useState(false);

  const [email, setEmail] = useState(utilisateurInitial.email || '');
  const [emailChange, setEmailChange] = useState(false);

  const [prenom, setPrenom] = useState(utilisateurInitial.prenom || '');
  const [prenomChange, setPrenomChange] = useState(false);

  const [avatar, setAvatar] = useState(utilisateurInitial.avatar || null);
  const [avatarChange, setAvatarChange] = useState(false);

  const [role, setRole] = useState(utilisateurInitial.role || '');
  const [roleChange, setRoleChange] = useState(false);

  const soumettreFormulaire = (event) => {
    event.preventDefault();

    // Création d'un objet FormData pour l'upload de fichier
    const donneesFormulaire = new FormData();

    if (identifiantChange === true && identifiant && identifiant != '') donneesFormulaire.append('identifiant', identifiant);
    if (mdpChange === true && mdp && mdp != '') donneesFormulaire.append('mdp', mdp);
    if (emailChange === true && email && email != '') donneesFormulaire.append('email', email);
    if (prenomChange === true && prenom && prenom != '') donneesFormulaire.append('prenom', prenom);
    if (avatarChange === true && avatar && avatar != '') donneesFormulaire.append('avatar', avatar);
    if (roleChange === true && role && role != '') donneesFormulaire.append('role', role);
    
    if (utilisateurInitial === false && donneesFormulaire.get('identifiant') && donneesFormulaire.get('mdp') && donneesFormulaire.get('email') && donneesFormulaire.get('prenom')) {
      fonctionPropsSoumissionFormulaire(donneesFormulaire);
    } else if (utilisateurInitial && Object.keys(utilisateurInitial).length > 0)
      {
        if (identifiantChange || mdpChange || emailChange || prenomChange || avatarChange || roleChange) {
          fonctionPropsSoumissionFormulaire(donneesFormulaire);
        } else
          alert("Vous n'avez aucun changement à effectuer !");
      }
    else
      alert("Il manque des données de formulaire !");
  }

  return (
    <form onSubmit={soumettreFormulaire}>

      <label htmlFor="identifiant">Identifiant :</label>
      <input required type="text" name="identifiant" value={identifiant} onChange={ (event) => { setIdentifiant(event.target.value); setIdentifiantChange(true); }  } />

      <label htmlFor="mdp">Mot de passe :</label>
      <input required={utilisateurInitial == false} type="password" name="mdp" value={mdp} onChange={(event) => { setMdp(event.target.value); setMdpChange(true); } } />
    
      <label htmlFor="email">Email :</label>
      <input required type="email" name="email" value={email} onChange={(event) => { setEmail(event.target.value); setEmailChange(true); } } />

      <label htmlFor="prenom">Prénom</label>
      <input required type="text" name="prenom" value={prenom} onChange={(event) => { setPrenom(event.target.value); setPrenomChange(true); } } />

      {!register &&
        <>
          {utilisateurInitial && !avatarChange && avatar && <img src={`http://localhost:8080/${avatar}`} />}
    
          <label htmlFor="avatar">Avatar</label>
          <input type="file" name="avatar" onChange={(event) => { setAvatar(event.target.files[0]); setAvatarChange(true); } } />

          <label htmlFor="role">Role</label>
          <select required name="role" id="role" value={role} onChange={(event) => { setRole(event.target.value); setRoleChange(true); } } >
            <option defaultValue value="user">Utilisateur</option>
            <option value="mj">Maître du Jeu</option>
            <option value="admin">Administrateur</option>
          </select>
        </>
      }

      <button type="submit">
          {!utilisateurInitial && register && <>S'inscrire</>}
          {!utilisateurInitial && !register && <>Créer l'utilisateur</>}
          {utilisateurInitial && <>Modifier l'utilisateur</>}
      </button>

    </form>
  )
}

export default FormUser;
