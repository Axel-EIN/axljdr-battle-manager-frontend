import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URLS } from '../constants/urls.js';

function PageAccueil() {
  const [combats, setCombats] = useState([]);

  useEffect(() => { // grâce à useEffect on monte au chargement la fonction recupererCombats
    recupererCombats();
  }, []);

  const recupererCombats = async () => {
    const { data } = await axios.get(URLS.BATTLE_ALL);
    console.log(data);
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
                          { combats.map( (combat, cle) => ( <li key={cle}>{combat.titre} | {combat.status}</li> ) )}
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