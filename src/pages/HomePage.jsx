import './HomePage.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BigBattleCard from '../components/battles/BigBattleCard.jsx';
import { URLS } from '../constants/urls.js';
import { io } from "socket.io-client"; // Importation de la lib socketIO pour le client (et non server)
import { BsBroadcast } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [battles, setBattles] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [lastActiveBattle, setLastActiveBattle] = useState(null);
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
        const socket = io(URLS.BASE_URL); // Initialisation connexion WebSocket avec Back-End
        getAllCharacters();
        getAllBattles();
        getLastActivedBattle();

        socket.on('newBattle', () => { getAllBattles(); });
        socket.on('editedBattle', () => { getAllBattles(); });
        socket.on('deletedBattle', async () => { getAllBattles(); });
        socket.on('initiativeRolled', async () => { getAllBattles(); });
        socket.on('pausedBattle', async () => { getAllBattles(); });
        socket.on('resumedBattle', async () => { getAllBattles(); });
        socket.on('restartedBattle', async () => { getAllBattles(); });

        return () => { // Nettoyage des écouteurs d'événement lors du démontage du composant
            socket.off('newBattle');
            socket.off('editedBattle');
            socket.off('deletedBattle');
            socket.off('initiativeRolled');
            socket.off('pausedBattle');
            socket.off('resumedBattle');
            socket.off('restartedBattle');
        };
    }, []);

    return (
        <div className="home-grid">

            <div className="battle-current">
                <h2 className="live">En Direct<BsBroadcast /></h2>
                <BigBattleCard battle={lastActiveBattle} />
           </div>

           <div className='char-ranking'>
                <h2>Classement</h2>
                <div className="list-character">
                    <div className="grid-row fr7 head">
                        <div></div>
                        <div className="span2">Prénom</div>
                        <div className="span2">Joueur</div>
                        <div className="span2">Victoires</div>
                    </div>
                    {characters.slice(0,5).map(c =>
                        <div className="card row grid-row fr7" key={c.id}>
                            <div>{c.portrait? <img className="portrait xsmall" src={`${URLS.BASE_URL}/${c.portrait}`} /> : <img className="portrait small" src={'https://i.pravatar.cc/96'} /> }</div>
                            <div className="span2"><strong>{c.firstname}</strong></div>
                            <div className="span2">{c.User?.firstname}</div>
                            <div></div>
                        </div>)}
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
                            <div><FaRegEye className="btn-icon" onClick={() =>navigate('/combat' + '/' + b.id)}/></div>
                        </div>)}
                </div>
            </div>

        </div>
    );
};

export default HomePage;
