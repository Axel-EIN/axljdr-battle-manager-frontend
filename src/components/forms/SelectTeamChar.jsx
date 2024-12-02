import { FaRegTrashCan } from "react-icons/fa6";

function SelectTeamChar({ fieldsTeam, teamString, characters, propsUpdateFieldF, propsRemoveFieldF, propsAddFieldF }) {
    return (
        <>

            {fieldsTeam?.map((oneField, indexField) =>
                <div key={indexField} className="select-character">

                    <select value={oneField.value} onChange={event => propsUpdateFieldF(teamString, indexField, event)}>
                        <option value=''>Choisir un personnage</option>
                        {characters.map(character =>
                            <option value={character.id} key={character.id}>{character.firstname}</option>)}
                    </select>

                    <FaRegTrashCan className={`btn-icon-delete team${teamString}`} onClick={() => propsRemoveFieldF(teamString, indexField)} />

                </div>
            )}

            <button className={`btn-secondary btn-medium team${teamString}`} onClick={(e) => { e.preventDefault(); propsAddFieldF(teamString) }}>Ajouter</button>

        </>
    );
}

export default SelectTeamChar;
