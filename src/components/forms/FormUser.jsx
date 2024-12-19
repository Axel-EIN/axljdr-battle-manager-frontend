import { useState } from "react";
import { Link } from 'react-router-dom';
import { URLS } from '../../constants/urls.js';
import { NA } from '../../constants/na.js';

const FormUser = ({ submitPropsFunction, initialUser = false, register = false }) => {

    const [login, setLogin] = useState(initialUser.login || '');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(initialUser.email || '');
    const [firstname, setFirstname] = useState(initialUser.firstname || '');
    const [avatar, setAvatar] = useState(null);
    const [role, setRole] = useState(initialUser.role || '');
    const [isVerify, setIsVerify] = useState(initialUser.isVerify || '');

    const handleSubmit = (event) => {
        event.preventDefault();

        const newUserFormData = new FormData(); // Création d'un objet FormData pour l'upload de fichier
        newUserFormData.append('login', login);
        if (password && password != '') newUserFormData.append('password', password);
        if (email && email != '') newUserFormData.append('email', email);
        if (firstname && firstname != '') newUserFormData.append('firstname', firstname);
        if (avatar && avatar != '') newUserFormData.append('avatar', avatar);
        if (role && role != '') newUserFormData.append('role', role);
        if (isVerify && isVerify != '') newUserFormData.append('isVerify', isVerify);

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
        <form className="card single" onSubmit={handleSubmit}>

            <div className="label-input">
                <label htmlFor="login">Identifiant :</label>
                <input required type="text" name="login" value={login} onChange={(event) => setLogin(event.target.value) } />
            </div>

            <div className="label-input">
                <label htmlFor="password">Mot de passe :</label>
                <input required={initialUser == false} type="password" name="password" value={password} onChange={ (event) => setPassword(event.target.value)} />
            </div>

            <div className="label-input">
                <label htmlFor="email">Email :</label>
                <input required type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div className="label-input">
                <label htmlFor="firstname">Prénom</label>
                <input required type="text" name="firstname" value={firstname} onChange={(event) => setFirstname(event.target.value)} />
            </div>

            {!register &&
                <>
                    <div className="label-input">
                        <label htmlFor="role">Role</label>
                        <select required name="role" id="role" value={role} onChange={(event) => setRole(event.target.value)} >
                            <option defaultValue value="user">Utilisateur</option>
                            <option value="gamemaster">Maître du Jeu</option>
                            <option value="admin">Administrateur</option>
                        </select>
                    </div>

                    <div className="form-row">
                        {initialUser && initialUser.avatar && !avatar && <img className="avatar" src={`${URLS.BACK_URL}/${initialUser.avatar}` || NA.AVATAR} />}
                        <div className="label-input">
                            <label htmlFor="avatar">Avatar</label>
                            <input type="file" name="avatar" onChange={(event) => setAvatar(event.target.files[0])} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="label-input">
                            <label htmlFor="isVerify">Vérification Email :</label>
                            <select required name="isVerify" id="isVerify" value={isVerify} onChange={(event) => setIsVerify(event.target.value)} >
                                <option defaultValue value={false}>Non-vérifié</option>
                                <option value={true}>Vérifié</option>
                            </select>
                        </div>
                    </div>
                </>
            }

            <div className="login-register-btn-wrapper">
                <button className="btn-primary btn-large" type="submit">
                    {!initialUser && register && <>S'inscrire</>}
                    {!initialUser && !register && <>Créer l'utilisateur</>}
                    {initialUser && <>Modifier l'utilisateur</>}
                </button>
                {!initialUser && register && <Link to='/connexion'>Déjà un compte ? Connectez-vous !</Link>}
            </div>

        </form>
    )
}

export default FormUser;
