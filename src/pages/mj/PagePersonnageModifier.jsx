import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLS } from '../../constants/urls.js';
import FormPersonnage from "../../components/forms/FormPersonnage.jsx";

const PagePersonnageModifier = () => {
  const [ personnageAmodifier, setPersonnageAmodifier ] = useState(null);
  const { personnageID } = useParams();
  const navigate = useNavigate();

  useEffect( () => { recupererUnPersonnage(personnageID); }, []);

  const recupererUnPersonnage = async (ID) => {
    try {
      const { data } = await axios.get(URLS.CHAR_ONE + '/' + ID);
      setPersonnageAmodifier(data);
    } catch ( erreur ) { console.error( erreur.message ); alert(erreur.message) };
  }

  const modifierPersonnageDepuisFormulaire = async (donneesFormulaire) => {
    try {
      await axios.put( URLS.CHAR_EDIT + '/' + personnageID, donneesFormulaire, { withCredentials: true });
      navigate("/mj");
      alert("L'Personnage a bien été modifié !");
    } catch ( erreur ) { console.error( erreur.message ); alert(erreur.message) };
  }

  return (
    <>
      <h1>MODIFICATION DU PERSONNAGE : {personnageAmodifier?.nom} {personnageAmodifier?.prenom}</h1>
      {personnageAmodifier ?
        <FormPersonnage fonctionPropsSoumissionFormulaire={modifierPersonnageDepuisFormulaire} personnageInitial={personnageAmodifier} />
        :
        <p>Chargement des données du personnage...</p>
      }
    </>
  );
};

export default PagePersonnageModifier;
