import { useEffect, useState, useContext } from "react";
import { ContexteUtilisateur } from "../contexts/contexteUtilisateur";
import { useParams } from "react-router-dom";
import { URLS } from '../constants/urls.js';
import axios from 'axios';

const PageCombat = () => {
  const { utilisateur, deconnecterUtilisateur } = useContext(ContexteUtilisateur);
  const { combatID } = useParams();
  const [combat, setCombat] = useState(null);

  const recupererCombat = async (ID) => {
    const { data } = await axios.get(URLS.BATTLE_ONE + '/' + ID);
    setCombat(data);
  }

  useEffect( () => { recupererCombat(combatID); }, []);

  return (
    <>
      <h1>PAGE D'UN COMBAT</h1>
      <h2>Titre : {combat?.titre}</h2>
      <h2>Statut : {combat?.statut}</h2>
      <h2>Participants :</h2>
      <ul>
        {combat?.Personnages && combat?.Personnages.map((personnage, index) => <li key={personnage.id}>{personnage.prenom}</li>)}
      </ul>
      <button>Rejoindre en tant que {utilisateur?.prenom}</button>
    </>
  );
};

export default PageCombat;
