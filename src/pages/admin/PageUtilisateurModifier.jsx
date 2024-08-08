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

  const modifierUtilisateurSoumis = async (utilisateurSoumis) => {
    try {
      await axios.put( URLS.USER_EDIT + '/' + utilisateurID, utilisateurSoumis, { withCredentials: true } );
      navigate("/admin"); // Rédirection sur la page admin
    } catch (erreur) {
      console.error(erreur.message);
    }
  }

  return (
    <>
      <h1>MODIFICATION UTILISATEUR</h1>
      {utilisateurAmodifier ?
        <>
          TEST avec identifiant {utilisateurAmodifier.identifiant}
          <FormUser fonctionPropsSoumissionFormulaire={modifierUtilisateurSoumis} utilisateurInitial={utilisateurAmodifier} admin={true} />
        </>
        :
        <p>Chargement des données de l'utilisateur...</p>
      }
    </>
  );
};

export default PageUtilisateurModifier;
