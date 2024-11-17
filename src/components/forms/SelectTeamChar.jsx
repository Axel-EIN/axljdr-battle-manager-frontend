import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function SelectTeamChar({ fieldsTeam, teamString, characters, propsUpdateFieldF, propsRemoveFieldF, propsAddFieldF }) {
  return (
    <>
      <h3>Team {teamString}</h3>
      {fieldsTeam?.map((oneField, indexField) =>
        <div key={indexField}>
          <select value={oneField.value} onChange={event => propsUpdateFieldF(teamString, indexField, event)}>
            <option value=''>Choisir un personnage</option>
            {characters.map(character => <option value={character.id} key={character.id}>{character.firstname}</option>)}
          </select>
          <DeleteIcon onClick={() => propsRemoveFieldF(teamString, indexField)} />
        </div>
      )}
      <Link><AddIcon onClick={() => propsAddFieldF(teamString)} /></Link>
    </>
  );
}

export default SelectTeamChar;
