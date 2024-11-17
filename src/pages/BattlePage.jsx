import "./Battle.css";
import { useEffect, useState, useContext } from "react";
import { ContexteUser } from "../contexts/contexteUser";
import { useParams } from "react-router-dom";
import { URLS } from '../constants/urls.js';
import axios from 'axios';
import { io } from "socket.io-client"; // Importation de la lib socketIO pour le client (et non server)
import BattlePortrait from "../components/characters/BattlePortrait.jsx";

const BattlePage = () => {
  const { user } = useContext(ContexteUser);
  const { combatID } = useParams();
  const [ battle, setBattle ] = useState(null);
  const [ logs, setLogs ] = useState([]);
  const [ isDeleted, setIsDeleted ] = useState(false);
  const [ stance, setStance ] = useState('attaque');
  const [ target1, setTarget1 ] = useState('');
  const [ target2, setTarget2 ] = useState('');
  const [ isControl, setIsControl ] = useState(false);
  
  useEffect(() => {
    const socket = io(URLS.BASE_URL); // Initialisation connexion WebSocket avec Back-End
    const retrieveOneBattle = async (ID) => {
      const { data } = await axios.get(URLS.BATTLE_ONE + '/' + ID);
      setBattle(data);
    }
    retrieveOneBattle(combatID);

    socket.on('editedBattle', () => {
      retrieveOneBattle(combatID);
      const log = 'Le combat a été modifié par le MJ !';
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('deletedBattle', () => {
      setIsDeleted(true);
      const log = 'Le combat a été supprimé par le MJ !';
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('initiativeRolled', (responseFirstname) => {
      retrieveOneBattle(combatID);
      const log = `Combat démarré par le MJ. Jets d'initiatives réalisés. Le premier joueur est ${responseFirstname} !`;
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('resumedBattle', () => {
      retrieveOneBattle(combatID);
      const log = 'Le combat a été repris par le MJ !';
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('pausedBattle', () => {
      retrieveOneBattle(combatID);
      const log = 'Le combat a été mis en pause par le MJ !';
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('restartedBattle', () => {
      retrieveOneBattle(combatID);
      const log = 'Le combat a été reinitialisé par le MJ !';
      setLogs([log]);
    });

    socket.on('nextTurn', (responseFirstname) => {
      retrieveOneBattle(combatID);
      const log = `C'est au tour de ${responseFirstname} de jouer !`;
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('newRound', (responseRoundNumber) => {
      retrieveOneBattle(combatID);
      const log = `Le Round vient de se terminer ! Le Round ${responseRoundNumber} démarre !`;
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('stanceChanged', (charFirstname, stance) => {
      retrieveOneBattle(combatID);
      const log = `Le personnage ${charFirstname} prend la posture ${stance} !`;
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('atkRoll', (atkRoll, targetTn) => {
      retrieveOneBattle(combatID);
      const log = `Le jet de dès d'attaque donne ${atkRoll} contre un TN d'esquive de ${targetTn} !`;
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('damageRolled', (atkFirstname, damage, defFirstname) => {
      retrieveOneBattle(combatID);
      const log = `${atkFirstname} inflige une attaque à ${defFirstname} qui fait ${damage} dégats !`;
      setLogs((prevState) => [...prevState, log]);
    });

    socket.on('dodgedAttack', (atkFirstname, defFirstname) => {
      retrieveOneBattle(combatID);
      const log = `${defFirstname} a esquiver l'attaque de ${atkFirstname} !`;
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
      socket.off('stanceChanged');
      socket.off('atkRoll');
      socket.off('damageRolled');
      socket.off('dodgedAttack');
    };
  }, []);

  const startBattle = async () => {
    try { await axios.put(URLS.BATTLE_START + '/' + combatID); }
    catch ({response}) { alert(response.data.error); }
  }

  const stopBattle = async () => {
    try { await axios.put(URLS.BATTLE_STOP + '/' + combatID); }
    catch ({response}) { alert(response.data.error); }
  }

  const restartBattle = async () => {
    try { await axios.put(URLS.BATTLE_RESTART + '/' + combatID); }
    catch ({response}) { alert(response.data.error); }
  }

  const playTurn = async (event) => {
    event.preventDefault();
    setIsControl(false);

    if (!stance || stance == '' || (stance != 'dodge' && stance != 'defense' && stance != 'centre' && stance != 'attack' && stance != 'assault') ) {
      alert('Veuillez choisir une stance valide !');
      return;
    }

    if (stance === 'concentration' || stance === 'dodge') {
      setTarget1('');
      setTarget2('');
    }

    if (stance === 'defense') {
      setTarget2('');
      if (!target1 || target1 == '') {
        alert('Veuillez choisir au moins une cible avec la posture défense !');
        return;
      }
    }

    if (stance === 'attack' || stance === 'assault') {
      if ( ( !target1 || target1 == '' ) || ( !target2 || target2 == '' ) ) {
        alert('Vous devez déclarer deux attaques valides !');
        return;
      }
    }
        
    try {
      await axios.put(
        URLS.BATTLE_PLAYTURN + '/' + combatID,
        { stance: stance, targetAttack1: target1, targetAttack2: target2 },
        { withCredentials: true } );
      }
    catch ({response}) { alert(response.data.error); }
    setStance('');
    setTarget1('');
    setTarget2('');
  }

  const changeStance = (event) => {
    setStance(event.target.value);
    switch (event.target.value) {
      case 'dodge':
      case 'centre':
        setTarget1('');
        setTarget2('');
        break;
      case 'defense':
        setTarget2('');
    }
  }

  return (
    <>
      <h1 className="battle-title">{battle?.title}</h1>
      {isDeleted && <h1>COMBAT SUPPRIMEE</h1>}
      {!isDeleted &&
        <>
          <h2 className="battle-status">Statut : {battle?.status}</h2>
          <h2 className="battle-status">Round Actuel : {battle?.current_round}</h2>
          <h2 className="battle-status">Tour Actuel : {battle?.CurrentTurn?.firstname}</h2>
          <div className="fight">
            <div className="team">
              {battle?.Participations && battle?.Participations.filter((participation) => participation.team === 1).map((participation) =>
                <BattlePortrait participation={participation} key={participation.Character.id} />)}
            </div>
            <h1>VS</h1>
            <div className="team">
              {battle?.Participations && battle?.Participations.filter((participation) => participation.team === 2).map((participation) =>
                <BattlePortrait participation={participation} key={participation.Character.id} />)}
            </div>
          </div>
          <div className="turn-actions">
            {user && battle && battle.status != 'paused' && battle.status != 'waiting' &&
              <>
                {user.id === battle.CurrentTurn?.user_id || isControl === true ?
                  <form>
                    Posture :
                    <select value={stance} onChange={(event) => changeStance(event)}>
                      <option value=''>Veuillez choisir une posture pour ce tour de jeu</option>
                      <option value="dodge">ESQUIVE : pas d'actions, ND Armure +15</option>
                      <option value="defense">DEFENSE : une action, ND Armure +5</option>
                      <option value="attack">ATTAQUE : deux actions</option>
                      <option value="assault">ASSAUT : deux actions, Jet Toucher +10, ND Armure -10</option>
                    </select>
                    {stance != 'dodge' && stance != 'concentration' && stance != '' &&
                      <div>
                        Cible 1ère ATTAQUE :
                        <select value={target1} onChange={(event) => setTarget1(event.target.value)}>
                          <option value=''>Choisir un personnage cible pour une première attaque</option>
                          {battle?.Participations.filter((item) => item.team != battle?.CurrentTurn.Participations[0]?.team).map((item, index) =>
                            <option value={item.Character.id} key={index}>{item.Character.firstname}</option>)}
                        </select>
                      </div>
                    }
                    {(stance == 'attack' || stance == 'assault') &&
                      <div>
                        Cible 2ème ATTAQUE :
                        <select value={target2} onChange={(event) => setTarget2(event.target.value)}>
                          <option value=''>Choisir un personnage cible pour une seconde attaque</option>
                          {battle?.Participations.filter((item) => item.team != battle?.CurrentTurn.Participations[0]?.team).map((item, index) =>
                            <option value={item.Character.id} key={index}>{item.Character.firstname}</option>)}
                        </select>
                      </div>
                    }
                    <button className="btn-start" onClick={playTurn}>Jouer son Tour</button>
                  </form>
                  :
                  <span>Ce n'est pas à votre tour de jouer !</span>
                }
              </>
            }
            {battle && battle.status === 'started' && user && user.role === 'gamemaster' && user.id != battle.CurrentTurn?.user_id &&
              <>
                {isControl === false ? <button onClick={() => setIsControl(true)}>Prendre la main</button> : <button onClick={() => setIsControl(false)}>Redonner la main</button>}
              </>
            }
          </div>
          <div className="actions">
            {user && user.role == 'gamemaster' && battle?.Participations.length > 0 && (
              <>
                {battle?.status === 'waiting' && <button className="btn-start" onClick={startBattle}>Démarrer</button>}
                {battle?.status === 'paused' && <button className="btn-start" onClick={startBattle}>Reprendre</button>}
                {battle?.status === 'started' && <button className="btn-stop" onClick={stopBattle}>Mettre en Pause</button>}
                {battle?.current_round != 0 && <button className="btn-restart" onClick={restartBattle}>Recommencer</button>}
              </>
            )}
          </div>
          <h2>Logs :</h2>
          <ul className="logs">{logs.map((log, index) => <li key={index}>{log}</li>).reverse()}</ul>
        </>
      }
    </>
  );
};

export default BattlePage;
