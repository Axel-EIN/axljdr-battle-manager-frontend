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
  const [ logs, setLogs ] = useState([]);
  const [ isDeleted, setIsDeleted ] = useState(false);
  const [ posture, setPosture ] = useState('attaque');
  const [ cibleAttaque1, setCibleAttaque1 ] = useState('');
  const [ cibleAttaque2, setCibleAttaque2 ] = useState('');
  const [ isPrendreControle, setIsPrendreControle ] = useState(false);

  const recupererCombat = async (ID) => {
    const { data } = await axios.get(URLS.BATTLE_ONE + '/' + ID);
    setCombat(data);
  }

  useEffect(() => {
    const socket = io(URLS.BASE_URL); // Initialisation connexion WebSocket avec Back-End
    recupererCombat(combatID);

    socket.on('editedBattle', () => {
      recupererCombat(combatID);
      const log = 'Le combat a été modifié par le MJ !';
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('deletedBattle', () => {
      setIsDeleted(true);
      const log = 'Le combat a été supprimé par le MJ !';
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('initiativeRolled', (reponsePrenom) => {
      recupererCombat(combatID);
      const log = `Combat démarré par le MJ. Jets d'initiatives réalisés. Le premier joueur est ${reponsePrenom} !`;
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('resumedBattle', () => {
      recupererCombat(combatID);
      const log = 'Le combat a été repris par le MJ !';
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('pausedBattle', () => {
      recupererCombat(combatID);
      const log = 'Le combat a été mis en pause par le MJ !';
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('restartedBattle', () => {
      recupererCombat(combatID);
      const log = 'Le combat a été reinitialisé par le MJ !';
      setLogs([log]);
    });

    socket.on('nextTurn', (reponsePrenom) => {
      recupererCombat(combatID);
      const log = `C'est au tour de ${reponsePrenom} de jouer !`;
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('newRound', (reponseNumeroRound) => {
      recupererCombat(combatID);
      const log1 = 'Le Round vient de se terminer !';
      const log2 = `Le Round ${reponseNumeroRound} démarre !`;
      setLogs((prevState) => [...prevState, log1, log2]);
    });

    socket.on('damageRolled', (reponseAttaquantPrenom, reponseDegats, reponseReceveurPrenom) => {
      recupererCombat(combatID);
      const log = `${reponseAttaquantPrenom} inflige une attaque à ${reponseReceveurPrenom} qui fait ${reponseDegats} dégats !`;
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('stanceChanged', (reponsePrenom, reponsePosture) => {
      recupererCombat(combatID);
      const log = `Le personnage ${reponsePrenom} prend la posture ${reponsePosture} !`;
      setLogs((prevState) => [...prevState, log]);
    });

    return () => { // Nettoyage dees écouteurs d'événement lors du démontage du composant
      socket.off('editedBattle');
      socket.off('deletedBattle');
      socket.off('initiativeRolled');
      socket.off('pausedBattle');
      socket.off('resumedBattle');
      socket.off('restartedBattle');
      socket.off('nextTurn');
      socket.off('newRound');
      socket.off('damageRolled');
      socket.off('stanceChanged');
    };
  }, []);

  const demarrerCombat = async () => {
    try { await axios.put(URLS.BATTLE_START + '/' + combatID); }
    catch ({response}) { alert(response.data.error); }
  }

  const arreterCombat = async () => {
    try { await axios.put(URLS.BATTLE_STOP + '/' + combatID); }
    catch ({response}) { alert(response.data.error); }
  }

  const recommencerCombat = async () => {
    try { await axios.put(URLS.BATTLE_RESTART + '/' + combatID); }
    catch ({response}) { alert(response.data.error); }
  }

  const jouerTour = async (event) => {
    event.preventDefault();
    setIsPrendreControle(false);

    if (!posture || posture == '') {
      alert('Veuillez choisir une posture valide !');
      return;
    }

    if (posture === 'centre' || posture === 'esquive') {
      setCibleAttaque1('');
      setCibleAttaque2('');
    }

    if (posture === 'defense') {
      setCibleAttaque2('');
      if (!cibleAttaque1 || cibleAttaque1 == '') {
        alert('Veuillez choisir au moins une cible avec la posture défense !');
        return;
      }
    }

    if (posture === 'attaque' || posture === 'assaut') {
      if ( ( !cibleAttaque1 || cibleAttaque1 == '' ) || ( !cibleAttaque2 || cibleAttaque2 == '' ) ) {
        alert('Vous devez déclarer deux attaques valides !');
        return;
      }
    }
        
    try {
      await axios.put(
        URLS.BATTLE_PLAYTURN + '/' + combatID,
        { posture: posture, cibleAttaque1: cibleAttaque1, cibleAttaque2: cibleAttaque2 },
        { withCredentials: true } );
      }
    catch ({response}) { alert(response.data.error); }
    setPosture('');
    setCibleAttaque1('');
    setCibleAttaque2('');
  }

  return (
    <>
      <h1 className="battle-title">{combat?.titre}</h1>
      {isDeleted && <h1>COMBAT SUPPRIMEE</h1>}
      {!isDeleted &&
        <>
          <h2 className="battle-status">Statut : {combat?.statut}</h2>
          <h2 className="battle-status">Round Actuel : {combat?.round_courant}</h2>
          <h2 className="battle-status">Tour Actuel : {combat?.TourCourant?.Personnage?.prenom}</h2>
          <div className="fight">
            <div className="team">
              {combat?.Participations && combat?.Participations.filter((participation) => participation.team === 1).map((participation) => <BattlePortrait participation={participation} key={participation.Personnage.id} />)}
            </div>
            <h1>VS</h1>
            <div className="team">
              {combat?.Participations && combat?.Participations.filter((participation) => participation.team === 2).map((participation) => <BattlePortrait participation={participation} key={participation.Personnage.id} />)}
            </div>
          </div>
          <div className="turn-actions">
            {utilisateur && combat &&
              <>
                {utilisateur.id === combat.TourCourant?.Personnage.utilisateur_id || isPrendreControle === true ?
                  <form>
                    Posture :
                    <select value={posture} onChange={(event) => setPosture(event.target.value)}>
                      <option value=''>Veuillez choisir une posture pour ce tour de jeu</option>
                      <option value="esquive">ESQUIVE : pas d'actions, ND Armure +15</option>
                      <option value="defense">DEFENSE : une action, ND Armure +5</option>
                      <option value="attaque">ATTAQUE : deux actions</option>
                      <option value="assaut">ASSAUT : deux actions, Jet Toucher +10, ND Armure -10</option>
                    </select>
                    {posture != 'esquive' && posture != 'centre' &&
                      <div>
                        Cible 1ère ATTAQUE :
                        <select value={cibleAttaque1} onChange={(event) => setCibleAttaque1(event.target.value)}>
                          <option value=''>Choisir un personnage cible pour une première attaque</option>
                          {combat?.Participations.filter((item) => item.team != combat?.TourCourant?.team).map((item, index) =>
                            <option value={item.Personnage.id} key={index}>{item.Personnage.prenom}</option>)}
                        </select>
                      </div>
                    }
                    {(posture == 'attaque' || posture == 'assaut') &&
                      <div>
                        Cible 2ème ATTAQUE :
                        <select value={cibleAttaque2} onChange={(event) => setCibleAttaque2(event.target.value)}>
                          <option value=''>Choisir un personnage cible pour une seconde attaque</option>
                          {combat?.Participations.filter((item) => item.team != combat?.TourCourant?.team).map((item, index) =>
                            <option value={item.Personnage.id} key={index}>{item.Personnage.prenom}</option>)}
                        </select>
                      </div>
                    }
                    <button className="btn-start" onClick={jouerTour}>Jouer son Tour</button>
                  </form>
                  :
                  <span>Ce n'est pas à votre tour de jouer !</span>
                }
              </>
            }
            {combat && combat.statut === 'started' && utilisateur && utilisateur.role === 'mj' && utilisateur.id != combat.TourCourant?.Personnage.utilisateur_id &&
              <>
                {isPrendreControle === false ?
                  <button onClick={() => setIsPrendreControle(true)}>Prendre le contrôle</button>
                  :
                  <button onClick={() => setIsPrendreControle(false)}>Redonner la main</button>}
              </>
            }
          </div>
          <div className="actions">
            {utilisateur && utilisateur.role == 'mj' && combat?.Participations.length > 0 && (
              <>
                {combat?.statut === 'waiting' && <button className="btn-start" onClick={demarrerCombat}>Démarrer</button>}
                {combat?.statut === 'paused' && <button className="btn-start" onClick={demarrerCombat}>Reprendre</button>}
                {combat?.statut === 'started' && <button className="btn-stop" onClick={arreterCombat}>Mettre en Pause</button>}
                {combat?.round_courant != 0 && <button className="btn-restart" onClick={recommencerCombat}>Recommencer</button>}
              </>
            )}
          </div>
          <h2>Logs :</h2>
          <ul className="logs">
            {logs.map((element, index) => <li key={index}>{element}</li>).reverse()}
          </ul>
        </>
      }
    </>
  );
};

export default PageCombat;
