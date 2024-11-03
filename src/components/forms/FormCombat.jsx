import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { URLS } from '../../constants/urls.js';

const FormCombat = ({ fonctionPropsSoumissionFormulaire, combatInitial = false }) => {
  if (combatInitial.Participations) {
    combatInitial.teamA = combatInitial.Participations.filter((element) => element.team == 1).map((element) => ({ value: `${element.PersonnageId}` }));
  }

  if (combatInitial.Participations) {
    combatInitial.teamB = combatInitial.Participations.filter((element) => element.team == 2).map((element) => ({ value: `${element.PersonnageId}` }));
  }

  const [titre, setTitre] = useState(combatInitial.titre || '');
  const [statut, setStatut] = useState(combatInitial.statut || 'waiting');
  const [champsFormulaireTeamA, setChampsFormulaireTeamA] = useState( [ { value: "" } ] ); // Création d'un tableau avec une case initialisé à value = ""
  const [champsFormulaireTeamB, setChampsFormulaireTeamB] = useState( [ { value: "" } ] ); // Création d'un tableau avec une case initialisé à value = ""
  const [personnages, setPersonnages] = useState( [] );

  useEffect( () => {
    recupererPersonnages();
    initialiserTeams();
  } , [] );

  const recupererPersonnages = async () => {
    try {
      const { data } = await axios.get(URLS.CHAR_ALL);
      setPersonnages(data);
    } catch ( erreur ) { console.error( erreur.message ); alert(erreur.message) };
  }

  const initialiserTeams = () => {
    if (combatInitial.teamA)
      setChampsFormulaireTeamA(combatInitial.teamA);

    if (combatInitial.teamB)
      setChampsFormulaireTeamB(combatInitial.teamB);
  }

  const mettreAjourLeChamp = (team, index, event) => { // Fonction pour mettre à jour le champ
    if (team === 'A') {
      const copieTableauChampsFormulaire = [...champsFormulaireTeamA];
      copieTableauChampsFormulaire[index].value = event.target.value;
      setChampsFormulaireTeamA(copieTableauChampsFormulaire);
    } else if (team === 'B') {
      const copieTableauChampsFormulaire = [...champsFormulaireTeamB];
      copieTableauChampsFormulaire[index].value = event.target.value;
      setChampsFormulaireTeamB(copieTableauChampsFormulaire);
    }
  };

  const ajouterUnChamp = (team) => {  // Fonction pour ajouter un champ
    if (team === 'A')
      setChampsFormulaireTeamA( [...champsFormulaireTeamA, { value: "" }] ); // crée une copie du tableau champsFormulaire (...champsFormulaire) et ajoute une case objet { value: "" }
    else if (team === 'B')
      setChampsFormulaireTeamB( [...champsFormulaireTeamB, { value: "" }] ); // crée une copie du tableau champsFormulaire (...champsFormulaire) et ajoute une case objet { value: "" }
  };

  const retirerUnChamp = (team, index) => {  // Fonction pour effacer un champ par son index
    if (team === 'A') {
      const copieTableauChampsFormulaire = [...champsFormulaireTeamA];
      copieTableauChampsFormulaire.splice(index, 1); // retire la case spécifiée par l'index
      setChampsFormulaireTeamA(copieTableauChampsFormulaire);
    } else if (team === 'B') {
      const copieTableauChampsFormulaire = [...champsFormulaireTeamB];
      copieTableauChampsFormulaire.splice(index, 1); // retire la case spécifiée par l'index
      setChampsFormulaireTeamB(copieTableauChampsFormulaire);
    }
  };

  const soumettreFormulaire = (event) => {
    event.preventDefault();
    const donneesCombat = {
      titre: titre,
      statut: statut,
      teamA: champsFormulaireTeamA,
      teamB: champsFormulaireTeamB,
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

      <h2>Participations :</h2>
      <h3>Team A :</h3>
      {champsFormulaireTeamA?.map((unChamp, indexChamp) => (
        <div key={indexChamp}>
          <select value={unChamp.value} onChange={(event) => mettreAjourLeChamp('A', indexChamp, event)}>
          <option>Choisir un personnage</option>
            {personnages.map( (personnage, indexOption) => <option value={personnage.id} key={indexOption}>{personnage.prenom}</option>)}
          </select>

          <DeleteIcon onClick={() => retirerUnChamp('A', indexChamp)} />
        </div>
      ))}
      <AddIcon onClick={() => ajouterUnChamp('A')} />

      <h3>Team B :</h3>
      {champsFormulaireTeamB?.map((unChamp, indexChamp) => (
        <div key={indexChamp}>
          <select value={unChamp.value} onChange={(event) => mettreAjourLeChamp('B', indexChamp, event)}>
            <option>Choisir un personnage</option>
            {personnages.map( (personnage, indexOption) => <option value={personnage.id} key={indexOption}>{personnage.prenom}</option>)}
          </select>

          <DeleteIcon onClick={() => retirerUnChamp('B', indexChamp)} />
        </div>
      ))}
      <AddIcon onClick={() => ajouterUnChamp('B')} />

      <button type="submit">
          {!combatInitial && <>Créer le combat</>}
          {combatInitial && <>Modifier le combat</>}
      </button>

    </form>
  )
}

export default FormCombat;
