import { useState, useEffect } from "react";
import axios from 'axios';
import { URLS } from '../../constants/urls.js';

const FormCharacter = ({ submitPropsFunction, initialCharacter = false }) => {
    const [lastname, setLastname] = useState(initialCharacter.lastname || '');
    const [firstname, setFirstname] = useState(initialCharacter.firstname || '');
    const [portrait, setPortrait] = useState(null);
    const [illustration, setIllustration] = useState(null);
    const [userID, setUserID] = useState(initialCharacter.user_id || '');
    const [users, setUsers] = useState([]);
  
    useEffect( () => {
        const retrieveAllUsers = async () => {
        try {
            const { data } = await axios.get(URLS.USER_ALL);
            setUsers(data);
        } catch ( { response } ) {
            alert(response.data.error); }
        };
        retrieveAllUsers();
    } , []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(); // Création d'un objet FormData pour l'upload de fichier

        if (lastname && lastname != '') formData.append('lastname', lastname);
        if (firstname && firstname != '') formData.append('firstname', firstname);
        if (portrait && portrait != '') formData.append('portrait', portrait);
        if (illustration && illustration != '') formData.append('illustration', illustration);
        if (userID && userID != '') formData.append('user_id', userID);
        if ( !formData.get('lastname') || !formData.get('firstname') ) {
            alert("Il manque des données de formulaire à remplir pour créer le personnage !");
            return;
        }

        submitPropsFunction(formData);
    }

  return (
    <form className="card" onSubmit={handleSubmit}>

        <div className="label-input">
            <label htmlFor="lastname">Nom :</label>
            <input required type="text" name="lastname" value={lastname} onChange={(event) => setLastname(event.target.value)} />
        </div>

        <div className="label-input">
            <label htmlFor="firstname">Prénom :</label>
            <input required type="text" name="firstname" value={firstname} onChange={(event) => setFirstname(event.target.value)} />
        </div>
    
        <div className="form-row">
            {initialCharacter && initialCharacter.portrait && !portrait &&
                <img className="portrait" src={`${URLS.BASE_URL}/${initialCharacter.portrait}`} />}
            <div className="label-input">
                <label htmlFor="portrait">Portrait</label>
                <input type="file" name="portrait" onChange={(event) => setPortrait(event.target.files[0])} />
            </div>
        </div>

        <div className="form-row">
            {initialCharacter && initialCharacter.illustration && !illustration &&
                <img className="illustration" src={`${URLS.BASE_URL}/${initialCharacter.illustration}`} />}
            <div className="label-input">
                <label htmlFor="illustration">Illustration :</label>
                <input type="file" name="illustration" onChange={(event) => setIllustration(event.target.files[0])} />
            </div>
        </div>

        <div className="label-input">
            <label htmlFor="user_id">Joueur :</label>
            <select name="user_id" id="user_id" value={userID} onChange={(event) => setUserID(event.target.value)} >
                <option>Aucun / PNJ (Maître du Jeu)</option>
                {users.map( (user) =>
                <option key={user.id} value={user.id}>{user.firstname}</option> )}
            </select>
        </div>

        <button className="btn-primary btn-large" type="submit">
            {!initialCharacter ? <span>Créer le personnage</span> : <span>Modifier le personnage</span>}
        </button>

    </form>
  )
}

export default FormCharacter;
