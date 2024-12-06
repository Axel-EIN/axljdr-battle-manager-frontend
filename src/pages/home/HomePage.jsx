import './HomePage.css';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BigBattleCard from './BigBattleCard.jsx';
import { URLS } from '../../constants/urls.js';
import { NA } from '../../constants/na.js';
import { io } from "socket.io-client"; // Importation de la lib socketIO pour le client (et non server)
import { FaRegEye } from "react-icons/fa6";
import { ContexteUser } from "../../contexts/contexteUser";
import classNames from 'classnames';

function HomePage() {
    const [battles, setBattles] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [lastActiveBattle, setLastActiveBattle] = useState(null);
    const { user } = useContext(ContexteUser);
    const navigate = useNavigate();

    const getAllCharacters = async () => {
        // Try Catch ?
        const { data } = await axios.get(URLS.CHAR_ALL);
        setCharacters(data);
    }

    const getAllBattles = async () => {
        const { data } = await axios.get(URLS.BATTLE_ALL);
        setBattles(data);
    };

    const getLastActivedBattle = async () => {
        const { data } = await axios.get(URLS.BATTLE_LASTACTIVE);
        setLastActiveBattle(data);
    };

    useEffect(() => {
        const socket = io(URLS.BACK_URL); // Initialisation connexion WebSocket avec Back-End
        getAllCharacters();
        getAllBattles();
        getLastActivedBattle();

        socket.on('newBattle', () => { getAllBattles(); getLastActivedBattle(); });
        socket.on('editedBattle', () => { getAllBattles(); getLastActivedBattle(); });
        socket.on('deletedBattle', async () => { getAllBattles(); getLastActivedBattle(); });
        socket.on('initiativeRolled', async () => { getAllBattles(); getLastActivedBattle(); });
        socket.on('pausedBattle', async () => { getAllBattles(); getLastActivedBattle(); });
        socket.on('resumedBattle', async () => { getAllBattles(); getLastActivedBattle(); });
        socket.on('restartedBattle', async () => { getAllBattles(); getLastActivedBattle(); });
        socket.on('nextTurn', async () => { getLastActivedBattle(); });
        socket.on('newRound', async () => { getLastActivedBattle(); });
        socket.on('teamVictory', async () => { getAllBattles(); getLastActivedBattle(); });

        return () => { // Nettoyage des écouteurs d'événement lors du démontage du composant
            socket.off('newBattle');
            socket.off('editedBattle');
            socket.off('deletedBattle');
            socket.off('initiativeRolled');
            socket.off('pausedBattle');
            socket.off('resumedBattle');
            socket.off('restartedBattle');
            socket.off('nextTurn');
            socket.off('newRound');
            socket.off('teamVictory');
        };
    }, []);

    return (
        <div className="home-grid">

            <div className="battle-current">
                <BigBattleCard battle={lastActiveBattle} />
            </div>

            <div className="ranking-battles">
                <div className='char-ranking'>
                    <h2>Classement</h2>
                    <div className="list-character">
                        <div className={classNames('grid-row head', {
                                'fr5': !user,
                                'fr7' : user,
                            })}>
                            <div></div>
                            <div className="span2">Personnage</div>
                            {user && <div className="span2">Joueur</div>}
                            <div>Victoires</div>
                        </div>
                        {characters.slice(0,7).map(c =>
                            <div className={classNames('card row grid-row', {
                                'fr5': !user,
                                'fr7' : user,
                            })} >
                                <div>{c.portrait?
                                    <img className="portrait xsmall" src={`${URLS.BACK_URL}/${c.portrait}`} />
                                    : <img className="portrait small" src={`${NA.PORTRAIT}`} /> }
                                </div>
                                <div className="span2"><strong>{c.firstname}</strong></div>
                                {user && <div className="span2">{c.User?.firstname}</div>}
                                <div></div>
                            </div>)
                        }
                    </div>
                </div>
                <div className='battle-history'>
                    <h2>Combats terminées</h2>
                    <div className="list-battle">
                        <div className="grid-row fr7 head">
                            <div className="span4">Titre</div>
                            <div className="span2">Participants</div>
                            <div></div>
                        </div>
                        {battles.filter(b => b.status === 'finished').slice(0,5).map(b =>
                            <div className="card row grid-row fr7" key={b.id}>
                                <div className="span4"><strong>{b.title}</strong></div>
                                <div className="span2">{b.Participations.length}</div>
                                <div>
                                    <button onClick={() =>navigate('/combat' + '/' + b.id)} title="Voir le combat" alt="Voir le combat">
                                        <FaRegEye className="btn-icon" />
                                    </button>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
