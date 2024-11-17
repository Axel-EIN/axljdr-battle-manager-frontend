import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URLS } from '../constants/urls.js';
import { Link } from "react-router-dom";
import { io } from "socket.io-client"; // Importation de la lib socketIO pour le client (et non server)

function HomePage() {
  const [battles, setBattles] = useState([]);

  const getAllBattles = async () => {
    const { data } = await axios.get(URLS.BATTLE_ALL);
    setBattles(data);
  };

  useEffect(() => {
    const socket = io(URLS.BASE_URL); // Initialisation connexion WebSocket avec Back-End
    getAllBattles();

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
    <>
      <h1>PAGE ACCUEIL</h1>
      <h2>Combats en cours :</h2>
      <ul>
        {battles.filter((battle) => battle.status === 'started' || battle.status === 'paused').map((battle, cle) =>
          <li key={cle}><Link to={'/combat' + '/' + battle.id} >{battle.title}</Link></li>)}
      </ul>
      <h2>Combats en attente :</h2>
      <ul>
        {battles.filter((battle) => battle.status === 'waiting').map((battle, cle) =>
          <li key={cle}><Link to={'/combat' + '/' + battle.id} >{battle.title}</Link></li>)}
      </ul>
      <h2>Combats terminés :</h2>
      <ul>
        {battles.filter((battle) => battle.status === 'finished').map((battle, cle) =>
          <li key={cle}><Link to={'/combat' + '/' + battle.id} >{battle.title}</Link></li>)}
      </ul>
    </>
  );
}

export default HomePage;
