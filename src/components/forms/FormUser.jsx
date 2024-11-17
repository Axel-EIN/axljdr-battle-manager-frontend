import { useState } from "react";
import { URLS } from '../../constants/urls.js';

const FormUser = ({ submitPropsFunction, initialUser = false, register = false }) => {

  const [login, setLogin] = useState(initialUser.login || '');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(initialUser.email || '');
  const [firstname, setFirstname] = useState(initialUser.firstname || '');
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState(initialUser.role || '');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUserFormData = new FormData(); // Création d'un objet FormData pour l'upload de fichier
    newUserFormData.append('login', login);
    if (password && password != '') newUserFormData.append('password', password);
    if (email && email != '') newUserFormData.append('email', email);
    if (firstname && firstname != '') newUserFormData.append('firstname', firstname);
    if (avatar && avatar != '') newUserFormData.append('avatar', avatar);
    if (role && role != '') newUserFormData.append('role', role);

    if ( !newUserFormData.get('login')
      || !newUserFormData.get('email')
      || !newUserFormData.get('firstname')
      || (!initialUser && !newUserFormData.get('password')) ) {
      alert("Il manque des données de formulaire à remplir pour créer l'utilisateur !");
      return;
    }
    
    submitPropsFunction(newUserFormData);
  }

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="login">Identifiant :</label>
      <input required type="text" name="login" value={login} onChange={(event) => setLogin(event.target.value) } />

      <label htmlFor="password">Mot de passe :</label>
      <input required={initialUser == false} type="password" name="password" value={password} onChange={ (event) => setPassword(event.target.value)} />
    
      <label htmlFor="email">Email :</label>
      <input required type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />

      <label htmlFor="firstname">Prénom</label>
      <input required type="text" name="firstname" value={firstname} onChange={(event) => setFirstname(event.target.value)} />

      {!register &&
        <>
          {initialUser && initialUser.avatar && !avatar && <img src={`${URLS.BASE_URL}/${initialUser.avatar}`} />}
          <label htmlFor="avatar">Avatar</label>
          <input type="file" name="avatar" onChange={(event) => setAvatar(event.target.files[0])} />

          <label htmlFor="role">Role</label>
          <select required name="role" id="role" value={role} onChange={(event) => setRole(event.target.value)} >
            <option defaultValue value="user">Utilisateur</option>
            <option value="gamemaster">Maître du Jeu</option>
            <option value="admin">Administrateur</option>
          </select>
        </>
      }

      <button type="submit">
          {!initialUser && register && <>S'inscrire</>}
          {!initialUser && !register && <>Créer l'utilisateur</>}
          {initialUser && <>Modifier l'utilisateur</>}
      </button>

    </form>
  )
}

export default FormUser;
