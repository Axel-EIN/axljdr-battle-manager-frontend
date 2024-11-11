import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URLS } from '../constants/urls.js';
import { Link } from "react-router-dom";
import { io } from "socket.io-client"; // Importation de la lib socketIO pour le client (et non server)

function PageAccueil() {
  const [combats, setCombats] = useState([]);

  const recupererCombats = async () => {
    const { data } = await axios.get(URLS.BATTLE_ALL);
    setCombats(data);
  };

  useEffect(() => {
    const socket = io("http://localhost:8080"); // Initialisation de la connexion WebSocket avec le Back-End
    recupererCombats();

    socket.on('newBattle', () => { recupererCombats(); });
    socket.on('editedBattle', () => { recupererCombats(); });
    socket.on('deletedBattle', async () => { recupererCombats(); });
    socket.on('initiativeRolled', async () => { recupererCombats(); });
    socket.on('pausedBattle', async () => { recupererCombats(); });
    socket.on('resumedBattle', async () => { recupererCombats(); });
    socket.on('restartedBattle', async () => { recupererCombats(); });

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
        {combats.filter((element) => element.statut === 'started' || element.statut === 'paused').map((combat, cle) => <li key={cle}><Link to={'/combat' + '/' + combat.id} >{combat.titre}</Link></li>)}
      </ul>
      <h2>Combats en attente :</h2>
      <ul>
        {combats.filter((element) => element.statut === 'waiting').map((combat, cle) => <li key={cle}><Link to={'/combat' + '/' + combat.id} >{combat.titre}</Link></li>)}
      </ul>
      <h2>Combats terminés :</h2>
      <ul>
        {combats.filter((element) => element.statut === 'finished').map((combat, cle) => <li key={cle}><Link to={'/combat' + '/' + combat.id} >{combat.titre}</Link></li>)}
      </ul>
    </>
  );
}

export default PageAccueil;
