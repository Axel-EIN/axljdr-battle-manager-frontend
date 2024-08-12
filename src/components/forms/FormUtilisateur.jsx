import { useState } from "react";

const FormUtilisateur = ( { fonctionPropsSoumissionFormulaire, utilisateurInitial = false, register = false } ) => {

  const [identifiant, setIdentifiant] = useState(utilisateurInitial.identifiant || '');
  const [mdp, setMdp] = useState('');
  const [email, setEmail] = useState(utilisateurInitial.email || '');
  const [prenom, setPrenom] = useState(utilisateurInitial.prenom || '');
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState(utilisateurInitial.role || '');

  const soumettreFormulaire = (event) => {
    event.preventDefault();

    const donneesFormulaire = new FormData(); // Création d'un objet FormData pour l'upload de fichier

    donneesFormulaire.append('identifiant', identifiant);
    if (mdp && mdp != '') donneesFormulaire.append('mdp', mdp);
    donneesFormulaire.append('email', email);
    donneesFormulaire.append('prenom', prenom);
    if (avatar && avatar != '') donneesFormulaire.append('avatar', avatar);
    if (role && role != '') donneesFormulaire.append('role', role);

    if ( !donneesFormulaire.get('identifiant') || !donneesFormulaire.get('email') || !donneesFormulaire.get('prenom') || (!utilisateurInitial && !donneesFormulaire.get('mdp')) ) {
      alert("Il manque des données de formulaire à remplir pour créer l'utilisateur !");
      return;
    }
    
    fonctionPropsSoumissionFormulaire(donneesFormulaire);
  }

  return (
    <form onSubmit={soumettreFormulaire}>

      <label htmlFor="identifiant">Identifiant :</label>
      <input required type="text" name="identifiant" value={identifiant} onChange={ (event) => setIdentifiant(event.target.value)  } />

      <label htmlFor="mdp">Mot de passe :</label>
      <input required={utilisateurInitial == false} type="password" name="mdp" value={mdp} onChange={ (event) => setMdp(event.target.value) } />
    
      <label htmlFor="email">Email :</label>
      <input required type="email" name="email" value={email} onChange={ (event) => setEmail(event.target.value) } />

      <label htmlFor="prenom">Prénom</label>
      <input required type="text" name="prenom" value={prenom} onChange={ (event) => setPrenom(event.target.value) } />

      {!register &&
        <>
          {utilisateurInitial && utilisateurInitial.avatar && !avatar && <img src={`http://localhost:8080/${utilisateurInitial.avatar}`} />}
          <label htmlFor="avatar">Avatar</label>
          <input type="file" name="avatar" onChange={ (event) => setAvatar(event.target.files[0]) } />

          <label htmlFor="role">Role</label>
          <select required name="role" id="role" value={role} onChange={ (event) => setRole(event.target.value) } >
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

export default FormUtilisateur;
