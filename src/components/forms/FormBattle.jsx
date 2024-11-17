import { useState, useEffect } from "react";
import axios from 'axios';
import { URLS } from '../../constants/urls.js';
import SelectTeamChar from "./SelectTeamChar.jsx";

const FormBattle = ({ submitPropsFunction, initialBattle = false }) => {

  const setTeam = (teamNumber) => 
    initialBattle.Participations
      .filter(element => element.team === teamNumber)
      .map(element => ({ value: `${element.character_id}` }));
  
  if (initialBattle.Participations) {
    initialBattle.teamA = setTeam(1);
    initialBattle.teamB = setTeam(2);
  }

  const [title, setTitle] = useState(initialBattle.title || '');
  const [status, setStatus] = useState(initialBattle.status || 'waiting');
  const [fieldsTeamA, setFieldsTeamA] = useState( [ { value: "" } ] ); // Création d'un tableau avec une case initialisé à value = ""
  const [fieldsTeamB, setFieldsTeamB] = useState( [ { value: "" } ] ); // Création d'un tableau avec une case initialisé à value = ""
  const [characters, setCharacters] = useState( [] );

  useEffect( () => {
    const getAllCharacters = async () => {
      try {
        const { data } = await axios.get(URLS.CHAR_ALL);
        setCharacters(data);
      } catch ( erreur ) { console.error( erreur.message ); alert(erreur.message) };
    };

    const initTeam = () => {
      if (initialBattle.teamA) setFieldsTeamA(initialBattle.teamA);
      if (initialBattle.teamB) setFieldsTeamB(initialBattle.teamB);
    };

    getAllCharacters();
    initTeam();
  } , [] );

  const updateField = (team, index, event) => { // Met à jour le tableau pour générer les champs d'équipe
    const fieldKey = team === 'A' ? fieldsTeamA : fieldsTeamB;
    const setField = team === 'A' ? setFieldsTeamA : setFieldsTeamB;
    setField(fieldKey.map((field, idx) =>
      idx === index ? { ...field, value: event.target.value } : field
    ));
    console.log('ploup');
  };

  const addField = (team) => {
    const setFields = team === 'A' ? setFieldsTeamA : setFieldsTeamB;
    setFields((prevState) => [...prevState, { value: "" }]);
  };

  const removeField = (team, index) => {
    const fields = team === 'A' ? fieldsTeamA : fieldsTeamB;
    const setFields = team === 'A' ? setFieldsTeamA : setFieldsTeamB;
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const battleData = {
      title: title,
      status: status,
      teamA: fieldsTeamA,
      teamB: fieldsTeamB,
    };
    
    if ( !battleData.title ) {
      alert("Il manque des données de formulaire à remplir pour créer le combat !");
      return;
    }
    submitPropsFunction(battleData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Titre :</label>
      <input required type="text" name="title" value={title} onChange={ (event) => setTitle(event.target.value) } />

      <label htmlFor="status">Statut :</label>
      <select name="status" id="status" value={status} onChange={ (event) => setStatus(event.target.value) } >
        <option value='waiting'>En attente de démarrage</option>
        <option value='started'>A démarré</option>
        <option value='paused'>En pause</option>
        <option value='finished'>Terminé</option>
      </select>

      <h2>Participations :</h2>
      <SelectTeamChar fieldsTeam={fieldsTeamA} teamString='A' characters={characters} propsUpdateFieldF={updateField} propsRemoveFieldF={removeField} propsAddFieldF={addField} />
      <SelectTeamChar fieldsTeam={fieldsTeamB} teamString='B' characters={characters} propsUpdateFieldF={updateField} propsRemoveFieldF={removeField} propsAddFieldF={addField} />
      <button type="submit">{!initialBattle ? <span>Créer le combat</span> : <span>Modifier le combat</span>}</button>

    </form>
  )
}

export default FormBattle;
