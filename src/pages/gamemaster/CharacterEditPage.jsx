import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLS } from '../../constants/urls.js';
import FormCharacter from "../../components/forms/FormCharacter.jsx";

const CharacterEditPage = () => {
  const [ characterToEdit, setCharacterToEdit ] = useState(null);
  const { personnageID } = useParams();
  const navigate = useNavigate();

  useEffect( () => {
    const retrieveOneCharacter = async (ID) => {
      try {
        const { data } = await axios.get(URLS.CHAR_ONE + '/' + ID);
        setCharacterToEdit(data);
      } catch ( erreur ) { console.error( erreur.message ); alert(erreur.message) };
    }
    retrieveOneCharacter(personnageID);
  }, []);

  const submitPropsEditCharacter = async (formData) => {
    try {
      await axios.put( URLS.CHAR_EDIT + '/' + personnageID, formData, { withCredentials: true });
      navigate("/mj");
      alert("L'Personnage a bien été modifié !");
    } catch ( erreur ) { console.error( erreur.message ); alert(erreur.message) };
  }

  return (
    <>
      <h1>Modifier un personnage : {characterToEdit?.name} {characterToEdit?.firstname}</h1>
      {characterToEdit ? <FormCharacter submitPropsFunction={submitPropsEditCharacter} initialCharacter={characterToEdit} /> : <p>Chargement des données du personnage...</p>}
    </>
  );
};

export default CharacterEditPage;
