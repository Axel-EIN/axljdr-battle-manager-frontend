import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { URLS } from './../constants/urls.js';

function accueil() {
  const [combats, setCombats] = useState([]);

  const recupererCombats = async () => {
    const { data } = await axios.get(URLS.BATTLE_ALL);
    setCombats(data);
  };

  useEffect( () => {
    recupererCombats();
  }, []);

  return (
    <>
      <h1>Ceci est la page d'accueil</h1>
      <ul>
        {combats?.map(
          (combat, cle) => (
            <li key={cle}>{combat.titre} | {combat.status}</li>
          )
        )}
      </ul>
    </>
  )
}

export default accueil