import "./BattlePage.css";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { ContexteUser } from "../../contexts/contexteUser";
import { useParams } from "react-router-dom";
import { URLS } from '../../constants/urls.js';
import { NA } from '../../constants/na.js';
import { io } from "socket.io-client"; // Importation de la lib socketIO pour le client (et non server)
import BattlePortrait from "../../components/characters/BattlePortrait.jsx";
import { FaRegPauseCircle } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";

const BattlePage = () => {
    const { user } = useContext(ContexteUser);
    const { combatID } = useParams();
    const [ battle, setBattle ] = useState(null);
    const [ logs, setLogs ] = useState([]);
    const [ isDeleted, setIsDeleted ] = useState(false);
    const [ isFinished, setIsFinished ] = useState(false);
    const [ stance, setStance ] = useState('attaque');
    const [ target1, setTarget1 ] = useState('');
    const [ target2, setTarget2 ] = useState('');
    const [ isControl, setIsControl ] = useState(false);
    const [ impactedCharacterAtk1, setImpactedCharacterAtk1 ] = useState(null);
    const [ impactedCharacterAtk2, setImpactedCharacterAtk2 ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ playedFront, setPlayedFront ] = useState(null);

    const getOneBattle = async (ID) => {
        try {
            const { data } = await axios.get(URLS.BATTLE_ONE + '/' + ID);
            setBattle(data);
            if (data.status === 'finished') setIsFinished(true);
        } catch ( error ) { console.error( error.message ); alert(error.message) };
    }
  
    useEffect(() => {
        const socket = io(URLS.BACK_URL); // Initialisation connexion WebSocket avec Back-End
        document.body.classList.add('active-battle-bg');

        const mainElement = document.querySelector('main');
        if (mainElement) { mainElement.classList.add('active-battle-container'); }

        getOneBattle(combatID);

        // Ecouteurs d'événements websockets

        socket.on('editedBattle', () => {
            getOneBattle(combatID);
            const log = 'Le combat a été modifié par le MJ !';
            setLogs((prevState) => [...prevState, log]);
        });

        socket.on('deletedBattle', () => {
            setIsDeleted(true);
            const log = 'Le combat a été supprimé par le MJ !';
            setLogs((prevState) => [...prevState, log]);
        });

        socket.on('initiativeRolled', (responseFirstname) => {
            getOneBattle(combatID);
            const log = `🎲 Combat démarré par le MJ. Jets d'initiatives réalisés. Le premier joueur est ${responseFirstname} !`;
            setLogs((prevState) => [...prevState, log]);
        });

        socket.on('resumedBattle', () => {
            getOneBattle(combatID);
            const log = 'Le combat a été repris par le MJ !';
            setLogs((prevState) => [...prevState, log]);
        });

        socket.on('pausedBattle', () => {
            getOneBattle(combatID);
            const log = 'Le combat a été mis en pause par le MJ !';
            setLogs((prevState) => [...prevState, log]);
        });

        socket.on('restartedBattle', () => {
            getOneBattle(combatID);
            const log = 'Le combat a été reinitialisé par le MJ !';
            setLogs([log]);
        });

        socket.on('restoredCharacters', () => {
            getOneBattle(combatID);
            const log = '❤️ Les personnages du combat ont été restaurés par le MJ !';
            setLogs([log]);
        });

        socket.on('nextTurn', (responseFirstname) => {
            getOneBattle(combatID);
            const log = `C'est au tour de ${responseFirstname} de jouer !`;
            setLogs((prevState) => [...prevState, log]);
            setImpactedCharacterAtk1(null);
            setImpactedCharacterAtk2(null);
            setIsLoading(false);
        });

        socket.on('newRound', (responseRoundNumber) => {
            getOneBattle(combatID);
            const log = `Le Round vient de se terminer ! Le Round ${responseRoundNumber} démarre !`;
            setLogs((prevState) => [...prevState, log]);
            setIsLoading(true);
            setPlayedFront(null);
        });

        socket.on('stanceChanged', (charFirstname, stance) => {
            getOneBattle(combatID);
            const log = `Le personnage ${charFirstname} prend la posture ${stance} !`;
            setLogs((prevState) => [...prevState, log]);
            setIsLoading(true);
        });

        socket.on('damageRolled', (atkFirstname, targetFirstname, atkRoll, targetTn, damage, nthAtk, targetId) => {
            getOneBattle(combatID);
            const log = `⚔️ ${atkFirstname} attaque ${targetFirstname} avec un jet d'Atk 🎲 ${atkRoll} contre ${targetTn} et inflige 💥 ${damage} dégats !`;
            if (nthAtk === 1) setImpactedCharacterAtk1(targetId);
            if (nthAtk === 2) setImpactedCharacterAtk2(targetId);
            setLogs((prevState) => [...prevState, log]);
            setIsLoading(true);
        });

        socket.on('dodgedAttack', (atkFirstname, targetFirstname, atkRoll, targetTn) => {
            getOneBattle(combatID);
            const log = `🛡️ ${targetFirstname} esquive l'attaque de ${atkFirstname}, jet d'Atk 🎲 ${atkRoll} contre ${targetTn} !`;
            setLogs((prevState) => [...prevState, log]);
            setIsLoading(true);
        });

        socket.on('isOut', (outFirstname) => {
            getOneBattle(combatID);
            const log = `💀 ${outFirstname} est hors de combat !`;
            setLogs((prevState) => [...prevState, log]);
            setIsLoading(true);
        });

        socket.on('teamVictory', (teamStringName) => {
            getOneBattle(combatID);
            const log = `VICTOIRE ! l'équipe ${teamStringName} a gagné !`;
            setLogs((prevState) => [...prevState, log]);
        });

        return () => { // Nettoyage lors du démontage du composant
            document.body.classList.remove('active-battle-bg');
            mainElement.classList.remove('active-battle-container');

            socket.off('editedBattle');
            socket.off('deletedBattle');
            socket.off('initiativeRolled');
            socket.off('pausedBattle');
            socket.off('resumedBattle');
            socket.off('restartedBattle');
            socket.off('nextTurn');
            socket.off('newRound');
            socket.off('stanceChanged');
            socket.off('damageRolled');
            socket.off('dodgedAttack');
            socket.off('restoredCharacters');
            socket.off('teamVictory');
        };
    }, [isLoading]);

    const startBattle = async () => {
        try { await axios.put(URLS.BATTLE_START + '/' + combatID, {}, { withCredentials: true }); }
        catch ( {response} ) { alert(response.data.error); }
    }

    const pauseBattle = async () => {
        try { await axios.put(URLS.BATTLE_STOP + '/' + combatID, {}, { withCredentials: true }); }
        catch ( {response} ) { alert(response.data.error); }
    }

    const restartBattle = async () => {
        try { await axios.put(URLS.BATTLE_RESTART + '/' + combatID, {}, { withCredentials: true }); }
        catch ( {response} ) { alert(response.data.error); }
    }

    const restoreBattle = async () => {
        try { await axios.put(URLS.BATTLE_RESTORE + '/' + combatID, {}, { withCredentials: true }); }
        catch ( {response} ) { alert(response.data.error); }
    }

    const playTurn = async (event) => {
        event.preventDefault();
        setIsControl(false);

        if (!stance || stance == '') {
            alert('Veuillez choisir une posture !');
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

        if ( (stance === 'attack' || stance === 'assault') &&
            ( ( !target1 || target1 == '' ) || ( !target2 || target2 == '' ) ) ) {
            alert('Vous devez choisir deux cibles avec la posture assaut !');
            return;
        }
        
        try {
            setIsLoading(true);
            setPlayedFront(battle.CurrentTurn.id);
            await axios.put(URLS.BATTLE_PLAYTURN + '/' + combatID,
                { stance: stance, targetAttack1: target1, targetAttack2: target2 },
                { withCredentials: true } );
        } catch ({response}) { alert(response.data.error); }

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
                break;
        }
    };

    return (
        <>
            <h1 className="battle-title">{battle?.title}</h1>

            {isDeleted && <h2>Ce combat a été supprimée !</h2>}

            {isFinished && battle?.winner_team &&
                <div className="winner-screen">
                    <h2>Victoire :</h2>
                    <div className="winner-list">
                        {battle.Participations.filter(p => p.team === battle.winner_team).map(p =>
                            <div className="character-illustration-card">
                                <img className="illustration big" src={p.Character.illustration? `${URLS.BACK_URL}/${p.Character.illustration}` : `${NA.ILLUSTRATION}`} 
                                    alt={p.Character.firstname} title={p.Character.firstname} />
                                <div className="info-character">
                                    <h2>{p.Character.firstname}</h2>
                                    <h4>{p.Character.User?.firstname}</h4>
                                </div>
                            </div>
                        )}
                    </div>
                    <h3>Défaite :</h3>
                    <div className="loser-list">
                        {battle.Participations.filter(p => p.team != battle.winner_team).map(p =>
                            <div className="character-portrait-name">
                                <img className="portrait" src={p.Character.portrait? `${URLS.BACK_URL}/${p.Character.portrait}` : `${NA.PORTRAIT}`}
                                    alt={p.Character.firstname} title={p.Character.firstname} />
                                <div className="loser-info">
                                    <strong>{p.Character.firstname}</strong>
                                    <span>{p.Character.User?.firstname}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }

            {!isDeleted && !isFinished &&
                <>
                    <div className="active-status-line">
                        <h3>
                            <dt>Statut :</dt>
                            <dd>{battle?.status}</dd>
                        </h3>
                        <h3>
                            <dt>Round :</dt>
                            <dd>{battle?.current_round}</dd>
                        </h3>
                        <h3>
                            <dt>Tour :</dt>
                            <dd>{battle?.CurrentTurn?.firstname || <span>Pas commencé</span>}</dd>
                        </h3>
                        <h3>
                            <dt>isLoading :</dt>
                            <dd>{isLoading && <span>LOADING</span>}</dd>
                        </h3>
                    </div>

                    <div className="fight">
                        <div className="team">
                            {battle?.Participations && battle?.Participations.filter((p) => p.team === 1).map((p) =>
                                <BattlePortrait
                                    participation={p}
                                    key={p.Character.id}
                                    isActive={p.Character.id === battle.CurrentTurn?.id && !isLoading}
                                    isPlayed={p.is_played || (playedFront === p.character_id)}
                                    isImpacted1={p.Character.id === impactedCharacterAtk1}
                                    isImpacted2={p.Character.id === impactedCharacterAtk2}
                                />)}
                        </div>

                        <div className="center">

                            {user && user.role === 'gamemaster' && isLoading === false &&
                                <>
                                    {battle?.status === 'started' && <FaRegPauseCircle className="btn-icon large" onClick={pauseBattle} alt="Mettre en pause" title="mettre en pause" />}
                                    {battle?.status === 'paused' && <FaRegPlayCircle className="btn-icon large" onClick={startBattle} alt="Reprendre" title="Reprendre" />}
                                </>
                            }

                            <h1 className="display">VS</h1>

                            {user && user.role === 'gamemaster' && isLoading === false &&
                                <>
                                    {battle?.status === 'waiting' && battle.Participations.length > 0 && !battle.CurrentTurn && battle.current_round === 0 &&
                                        <>
                                            <button className="btn-primary btn-medium purple" onClick={startBattle}>Démarrer</button>
                                            <button className="btn-primary btn-medium purple" onClick={restoreBattle}>Soigner</button>
                                        </>
                                    }

                                    {battle?.Participations.length > 0 && battle.CurrentTurn && battle.current_round > 0 &&
                                        <>
                                            {(battle.status === 'paused' || battle.status === 'waiting') && <button className="btn-primary btn-medium blue" onClick={restartBattle}>Réinitialiser</button>}
                                            {battle.status === 'started' && user.id != battle.CurrentTurn?.user_id &&
                                                <>
                                                    {isControl === false ?
                                                        <button className="btn-primary purple btn-medium" onClick={() => setIsControl(true)}>Prendre la main</button>
                                                        : <button className="btn-primary purple btn-medium" onClick={() => setIsControl(false)}>Rendre la main</button>
                                                    }
                                                </>
                                            }
                                        </>
                                    }
                                </>
                            }

                        </div>

                        <div className="team">
                            {battle?.Participations && battle?.Participations.filter((p) => p.team === 2).map((p) =>
                                <BattlePortrait
                                    participation={p}
                                    key={p.Character.id}
                                    isActive={p.Character.id === battle.CurrentTurn?.id && !isLoading}
                                    isPlayed={p.is_played || (playedFront === p.character_id)}
                                    isImpacted1={p.Character.id === impactedCharacterAtk1}
                                    isImpacted2={p.Character.id === impactedCharacterAtk2}
                                />)}
                        </div>
                    </div>

                    <div className="play-logs-section container">
                        <div className="play-zone">
                            <h2>Actions :</h2>
                            <div className="turn-actions">
                                {user && battle && battle.status != 'paused' && battle.status != 'waiting' &&
                                    <>
                                        {user.id === battle.CurrentTurn?.user_id || isControl === true ?
                                            <form className="card">
                                                <div className="form-row">
                                                    Posture :
                                                    <select value={stance} onChange={(event) => changeStance(event)}>
                                                        <option value=''>Veuillez choisir une posture pour ce tour de jeu</option>
                                                        <option value="dodge">ESQUIVE : pas d'actions, ND Armure +15</option>
                                                        <option value="defense">DEFENSE : une action, ND Armure +5</option>
                                                        <option value="attack">ATTAQUE : deux actions</option>
                                                        <option value="assault">ASSAUT : deux actions, Jet Toucher +10, ND Armure -10</option>
                                                    </select>
                                                </div>
                                                {stance != 'dodge' && stance != 'concentration' && stance != '' &&
                                                    <div>
                                                    Cible 1ère ATTAQUE :
                                                    <select value={target1} onChange={(event) => setTarget1(event.target.value)}>
                                                        <option value=''>Choisir un personnage cible pour une première attaque</option>
                                                        {battle?.Participations.filter((item) =>
                                                            item.team != battle?.CurrentTurn.Participations[0]?.team && !item.is_out).map((item, index) =>
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
                                                <button className="btn-primary btn-medium pink" onClick={playTurn}>Jouer son Tour</button>
                                            </form>
                                            :
                                            <h3>Veuillez patienter votre tour de jeu.</h3>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                        <div className="logs-zone">
                            <h2>Battle Logs :</h2>
                            <div className="logs">
                                {logs.map((log, index) =>
                                    <div className="card row" key={index}>{log}</div>).reverse()}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default BattlePage;
