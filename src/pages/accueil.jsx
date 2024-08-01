import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URLS } from './../constants/urls.js';
import { useNavigate } from "react-router-dom";

function accueil() {
  const [combats, setCombats] = useState([]);
  const [identifiant, setIdentifiant] = useState([]);
  const [mdp, setMdp] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    recupererCombats();
  }, []);


  const recupererCombats = async () => {
    const { data } = await axios.get(URLS.BATTLE_ALL);
    console.log(data);
    setCombats(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = {
      identifiant: identifiant,
      mdp: mdp
    }

    try {
      await axios.post(URLS.USER_LOGIN, credentials);
      navigate("/");
    } catch (erreur) {
      console.error(erreur.message);
    }
  }

  return (
    <>
      <h1>Ceci est la page d'accueil</h1>

      <h2>Connexion :</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="identifiant" id="identifiant" value={identifiant} onChange={(event) => setIdentifiant(event.target.value)} />
        <br />
        <input type="password" name="mdp" id="mdp" value={mdp} onChange={(event) => setMdp(event.target.value)} />
        <br />
        <button>Se connecter</button>
      </form>

      <h2>Combats :</h2>

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
                    (<>Il n'y a pas encore de combats ! </>)
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

export default accueil