import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLS } from '../../constants/urls.js';
import FormUser from "../../components/forms/FormUser.jsx";

const PageUtilisateurModifier = () => {
  const { utilisateurID } = useParams();
  const navigate = useNavigate();
  const [ utilisateurAmodifier, setUtilisateurAmodifier ] = useState(null);

  const recupererUnUtilisateur = async (ID) => {
    const { data } = await axios.get(URLS.USER_ONE + '/' + ID);
    setUtilisateurAmodifier(data);
  }

  useEffect( () => { recupererUnUtilisateur(utilisateurID); }, []);

  const modifierUtilisateurDepuisFormulaire = async (donneesFormulaire) => {
    try {
      await axios.put( URLS.USER_EDIT + '/' + utilisateurID, donneesFormulaire, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      navigate("/admin"); // Rédirection sur la page admin
      alert("L'Utilisateur a bien été modifié !");
    } catch ({response}) {
      alert(response.data.error); }
  }

  return (
    <>
      <h1>MODIFICATION UTILISATEUR : {utilisateurAmodifier?.identifiant}</h1>
      {utilisateurAmodifier ?
        <FormUser fonctionPropsSoumissionFormulaire={modifierUtilisateurDepuisFormulaire} utilisateurInitial={utilisateurAmodifier} />
        :
        <p>Chargement des données de l'utilisateur...</p>
      }
    </>
  );
};

export default PageUtilisateurModifier;
