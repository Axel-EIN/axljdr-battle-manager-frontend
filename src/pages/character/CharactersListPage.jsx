import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { URLS } from '../../constants/urls.js';
import CharacterCard from '../../components/cards/CharacterCard.jsx';

function CharactersListPage() {
    const [ characters, setCharacters ] = useState([]);

    const getAllCharacters = async () => {
        try {
            const { data } = await axios.get(URLS.CHAR_ALL);
            setCharacters(data);
        } catch ( error ) { console.error( error.message ); alert(error.message) };
    }

    useEffect(() => {
        getAllCharacters();
    }, []);

    return (
        <>
            <h1>Les Personnages</h1>

            <div className="flex-1-1">
                <div>
                    <h2>Personnages Joueurs</h2>
                    <div className="flex-wrap-row">
                        {characters.filter(c => c.user_id).map(character =>
                            <Link to={'/personnage' + '/' + character.id} >
                                <CharacterCard character={character} key={character.id} isPj={true} />
                            </Link>
                        )}
                    </div>
                </div>
                <div>
                    <h2>Personnages Non-Joueurs</h2>
                    <div className="flex-wrap-row">
                        {characters.filter(c => !c.user_id).map(character =>
                            <Link to={'/personnage' + '/' + character.id} >
                                <CharacterCard character={character} key={character.id} isPnj={true} />
                            </Link >
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default CharactersListPage;
