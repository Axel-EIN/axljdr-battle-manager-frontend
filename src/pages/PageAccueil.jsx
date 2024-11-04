import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URLS } from '../constants/urls.js';
import { Link } from "react-router-dom";
import { io } from "socket.io-client"; // Importation de la lib socketIO pour le client (et non server)

const socket = io("http://localhost:8080"); // Initialisation de la connexion WebSocket avec le Back-End

function PageAccueil() {
  const [combats, setCombats] = useState([]);

  useEffect(() => { // grâce à useEffect on monte au chargement la fonction recupererCombats
    recupererCombats();

    socket.on('newBattle', (reponseNewBattle) => { // écoute de l'évenement websocket newBattle et action si délenché
      setCombats((prevCombats) => [...prevCombats, reponseNewBattle]);
    });

    return () => { // Nettoyage de l'écouteur d'événement newBattle lors du démontage du composant
      socket.off('newBattle');
    };
  }, []);

  const recupererCombats = async () => {
    const { data } = await axios.get(URLS.BATTLE_ALL);
    setCombats(data);
  };

  return ( // Affichage de la vue
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