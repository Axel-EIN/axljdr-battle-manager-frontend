import "./Combat.css";
import { useEffect, useState, useContext } from "react";
import { ContexteUtilisateur } from "../contexts/contexteUtilisateur";
import { useParams } from "react-router-dom";
import { URLS } from '../constants/urls.js';
import axios from 'axios';
import { io } from "socket.io-client"; // Importation de la lib socketIO pour le client (et non server)
import BattlePortrait from "../components/characters/BattlePortrait.jsx";

const PageCombat = () => {
  const { utilisateur, deconnecterUtilisateur } = useContext(ContexteUtilisateur);
  const { combatID } = useParams();
  const [ combat, setCombat ] = useState(null);
  const [ isDeleted, setIsDeleted ] = useState(false);

  const recupererCombat = async (ID) => {
    const { data } = await axios.get(URLS.BATTLE_ONE + '/' + ID);
    setCombat(data);
  }

  useEffect(() => {
    const socket = io("http://localhost:8080"); // Initialisation de la connexion WebSocket avec le Back-End
    recupererCombat(combatID);
  }, []);

  const demarrerCombat = async () => {
    await axios.put(URLS.BATTLE_START + '/' + combatID);
  }

  const arreterCombat = async () => {
    await axios.put(URLS.BATTLE_STOP + '/' + combatID);
  }

  const recommencerCombat = async () => {
    await axios.put(URLS.BATTLE_RESTART + '/' + combatID);
  }

  return (
    <>
      <h1 className="battle-title">{combat?.titre}</h1>
      {isDeleted && <h1>COMBAT SUPPRIMEE</h1>}
      {!isDeleted &&
        <>
          <h2 className="battle-status">Statut : {combat?.statut}</h2>
          <h2 className="battle-status">Round Actuel : {combat?.roundCourant}</h2>
          <h2 className="battle-status">Tour Actuel : {combat?.tourcourant?.prenom}</h2>
          <div className="fight">
            <div className="team">
              {combat?.Personnages && combat?.Personnages.filter((element) => element.Participation.team === 1).map((personnage) => <BattlePortrait personnage={personnage} key={personnage.id} />)}
            </div>
            <h1>VS</h1>
            <div className="team">
              {combat?.Personnages && combat?.Personnages.filter((element) => element.Participation.team === 2).map((personnage) => <BattlePortrait personnage={personnage} key={personnage.id} />)}
            </div>
          </div>
          <div className="actions">
            {utilisateur && utilisateur.role == 'mj' && (
              <>
                {combat?.statut === 'waiting' && <button className="btn-start" onClick={demarrerCombat}>Démarrer</button>}
                {combat?.statut === 'paused' && <button className="btn-start" onClick={demarrerCombat}>Reprendre</button>}
                {combat?.statut === 'started' && <button className="btn-stop" onClick={arreterCombat}>Mettre en Pause</button>}
                {combat?.roundCourant != 0 && <button className="btn-restart" onClick={recommencerCombat}>Recommencer</button>}
              </>
            )}
          </div>
          <h2>Logs :</h2>
        </>
      }
    </>
  );
};

export default PageCombat;
