import { useState, useEffect } from "react";
import axios from 'axios';
import { URLS } from '../../constants/urls.js';

const FormPersonnage = ({ fonctionPropsSoumissionFormulaire, personnageInitial = false }) => {

  const [nom, setNom] = useState(personnageInitial.nom || '');
  const [prenom, setPrenom] = useState(personnageInitial.prenom || '');
  const [portrait, setPortrait] = useState(null);
  const [illustration, setIllustration] = useState(null);
  const [utilisateurID, setUtilisateurID] = useState(personnageInitial.UtilisateurId || '');
  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect( () => { recupererUtilisateurs(); } , []);

  const recupererUtilisateurs = async () => {
    try {
      const { data } = await axios.get(URLS.USER_ALL);
      setUtilisateurs(data);
    } catch ( { response } ) {
      alert(response.data.error); }
  };

  const soumettreFormulaire = (event) => {
    event.preventDefault();

    const donneesFormulaire = new FormData(); // Création d'un objet FormData pour l'upload de fichier
    donneesFormulaire.append('nom', nom);
    donneesFormulaire.append('prenom', prenom);
    if (portrait && portrait != '') donneesFormulaire.append('portrait', portrait);
    if (illustration && illustration != '') donneesFormulaire.append('illustration', illustration);
    if (utilisateurID && utilisateurID != '') donneesFormulaire.append('UtilisateurId', utilisateurID);
    
    if ( !donneesFormulaire.get('nom') || !donneesFormulaire.get('prenom') ) {
      alert("Il manque des données de formulaire à remplir pour créer le personnage !");
      return;
    }

    fonctionPropsSoumissionFormulaire(donneesFormulaire);
  }

  return (
    <form onSubmit={soumettreFormulaire}>

      <label htmlFor="nom">Nom :</label>
      <input required type="text" name="nom" value={nom} onChange={ (event) => setNom(event.target.value) } />

      <label htmlFor="prenom">Prénom :</label>
      <input required type="text" name="prenom" value={prenom} onChange={ (event) => setPrenom(event.target.value) } />
    
      {personnageInitial && personnageInitial.portrait && !portrait && <img src={`http://localhost:8080/${personnageInitial.portrait}`} />}
      <label htmlFor="portrait">Portrait</label>
      <input type="file" name="portrait" onChange={ (event) => setPortrait(event.target.files[0]) } />

      {personnageInitial && personnageInitial.illustration && !illustration && <img src={`http://localhost:8080/${personnageInitial.illustration}`} />}
      <label htmlFor="illustration">Illustration :</label>
      <input type="file" name="illustration" onChange={ (event) => setIllustration(event.target.files[0]) } />

      <label htmlFor="UtilisateurId">Joueur :</label>
      <select name="UtilisateurId" id="UtilisateurId" value={utilisateurID} onChange={ (event) => setUtilisateurID(event.target.value) } >
        <option>Aucun / PNJ (Maître du Jeu)</option>
        {utilisateurs.map( (utilisateur, cle) => <option key={cle} value={utilisateur.id}>{utilisateur.prenom}</option> )}
      </select>

      <button type="submit">
          {!personnageInitial && <>Créer le personnage</>}
          {personnageInitial && <>Modifier le personnage</>}
      </button>

    </form>
  )
}

export default FormPersonnage;
