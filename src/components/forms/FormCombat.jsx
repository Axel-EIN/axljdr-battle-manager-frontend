import { useState, useEffect } from "react";
import axios from 'axios';
import { URLS } from '../../constants/urls.js';

const FormCombat = ({ fonctionPropsSoumissionFormulaire, combatInitial = false }) => {

  const [titre, setTitre] = useState(combatInitial.titre || '');
  const [statut, setStatut] = useState(combatInitial.statut || 'waiting');

  const soumettreFormulaire = (event) => {
    event.preventDefault();
    const donneesCombat = {
      titre: titre,
      statut: statut
    };
    
    if ( !donneesCombat.titre ) {
      alert("Il manque des données de formulaire à remplir pour créer le combat !");
      return;
    }

    fonctionPropsSoumissionFormulaire(donneesCombat);
  }

  return (
    <form onSubmit={soumettreFormulaire}>

      <label htmlFor="titre">Titre :</label>
      <input required type="text" name="titre" value={titre} onChange={ (event) => setTitre(event.target.value) } />

      <label htmlFor="statut">Statut :</label>
      <select name="statut" id="statut" value={statut} onChange={ (event) => setStatut(event.target.value) } >
        <option value='waiting'>En attente de démarrage</option>
        <option value='started'>A démarré</option>
        <option value='finished'>Terminé</option>
      </select>

      <button type="submit">
          {!combatInitial && <>Créer le combat</>}
          {combatInitial && <>Modifier le combat</>}
      </button>

    </form>
  )
}

export default FormCombat;
