import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLS } from '../../constants/urls.js';
import FormCombat from "../../components/forms/FormCombat.jsx";

const PageCombatModifier = () => {
  const [ combatAmodifier, setCombatAmodifier ] = useState(null);
  const { combatID } = useParams();
  const navigate = useNavigate();

  useEffect( () => { recupererUnCombat(combatID); }, []);

  const recupererUnCombat = async (ID) => {
    try {
      const { data } = await axios.get(URLS.BATTLE_ONE + '/' + ID);
      setCombatAmodifier(data);
    } catch ( erreur ) { console.error( erreur.message ); alert(erreur.message) };
  }

  const modifierCombatDepuisFormulaire = async (donneesCombat) => {
    try {
      await axios.put( URLS.BATTLE_EDIT + '/' + combatID, donneesCombat, { withCredentials: true });
      navigate("/mj");
      alert("Le Combat a bien été modifié !");
    } catch ( erreur ) { console.error( erreur.message ); alert(erreur.message) };
  }

  return (
    <>
      <h1>MODIFICATION DU COMBAT : {combatAmodifier?.titre}</h1>
      {combatAmodifier ?
        <FormCombat fonctionPropsSoumissionFormulaire={modifierCombatDepuisFormulaire} combatInitial={combatAmodifier} />
        :
        <p>Chargement des données du combat...</p>
      }
    </>
  );
};

export default PageCombatModifier;
