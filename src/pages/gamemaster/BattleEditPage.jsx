import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLS } from '../../constants/urls.js';
import FormBattle from "../../components/forms/FormBattle.jsx";

const BattleEditPage = () => {
  const [ battleToEdit, setBattleToEdit ] = useState(null);
  const { combatID } = useParams();
  const navigate = useNavigate();

  useEffect( () => {
    const retrieveOneBattle = async (ID) => {
      try {
        const { data } = await axios.get(URLS.BATTLE_ONE + '/' + ID);
        setBattleToEdit(data);
      } catch ( erreur ) { console.error( erreur.message ); alert(erreur.message) };
    }
    retrieveOneBattle(combatID);
  }, []);

  const submitpropsEditBattle = async (formData) => {
    try {
      await axios.put( URLS.BATTLE_EDIT + '/' + combatID, formData, { withCredentials: true });
      navigate("/mj");
      alert("Le Combat a bien été modifié !");
    } catch ( erreur ) { console.error( erreur.message ); alert(erreur.message) };
  }

  return (
    <>
      <h1>Modifier combat</h1>
      {battleToEdit ? <FormBattle submitPropsFunction={submitpropsEditBattle} initialBattle={battleToEdit} /> : <p>Chargement des données du combat...</p>}
    </>
  );
};

export default BattleEditPage;
