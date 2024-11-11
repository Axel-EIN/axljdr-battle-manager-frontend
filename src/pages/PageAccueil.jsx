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
    return () => { // Nettoyage des écouteurs d'événement lors du démontage du composant
      socket.off('newBattle');
      socket.off('editedBattle');
      socket.off('deletedBattle');
    };
  }, []);

  return (
    <>
      <h1>PAGE ACCUEIL</h1>

      <h2>Liste des Combats :</h2>

      {!combats ?
        (
          <>Les Combats n'existent pas !</>
        )
        :
        (
          <>
            {Array.isArray(combats) ?
              (
                <>
                  Les Combats sont dans un tableau !
                  {combats.length > 0 ?
                    (
                      <>
                        <ul>
                          { combats.map( (combat, cle) => ( <li key={cle}><Link to={'/combat' + '/' + combat.id} >{combat.titre} | {combat.statut}</Link></li> ) )}
                        </ul>
                      </>
                    )
                    :
                    (<><br/>Il n'y a pas encore de combats ! </>)
                  }
                </>
              )
              :
              (
                <>Ce n'est pas un tableau</>
              )
            }
          </>
        )
      }
    </>
  )
}

export default PageAccueil