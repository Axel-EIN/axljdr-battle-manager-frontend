import axios from 'axios';
import { URLS } from '../../constants/urls.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const GameMasterPage = () => {
    const [characters, setCharacters] = useState([]);
    const [battles, setBattles] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const retrieveAllCharacters = async () => {
            // Try Catch ?
            const { data } = await axios.get(URLS.CHAR_ALL);
            setCharacters(data);
        }
        const retrieveAllBattles = async () => {
            // Try Catch ?
            const { data } = await axios.get(URLS.BATTLE_ALL);
            setBattles(data);
        }
        retrieveAllCharacters();
        retrieveAllBattles();
        setReload(false);
    }, [reload])

    const deleteCharacter = async (characterID) => {
        try {
            const instance = axios.create({withCredentials: true})
            await instance.delete(URLS.CHAR_DELETE + '/' + characterID);
            alert("Le personnage a bien été supprimé !");
            setReload(true);
        } catch ({response}) {
            alert(response.data.error); }
    }

    const deleteBattle = async (battleID) => {
        try {
            const instance = axios.create({withCredentials: true})
            await instance.delete(URLS.BATTLE_DELETE + '/' + battleID);
            alert("Le combat a bien été supprimé !");
            setReload(true);
        } catch ({response}) {
            alert(response.data.error); }
    }

    return (
        <>
            <h1>Le Paneau du Maître du Jeu</h1>

            <h2>characters :</h2>
            <button onClick={() => navigate("/mj/personnage/creer")}>Créer un Personnage</button>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Portrait</th>
                    <th>Illustration</th>
                    <th>Joueur</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                {characters.map(character =>
                    <tr key={character.id}>
                        <td>{character.id}</td>
                        <td>{character.name}</td>
                        <td>{character.firstname}</td>
                        <td>{character.portrait? <img src={`${URLS.BASE_URL}/${character.portrait}`} /> : <img src={'https://i.pravatar.cc/96'} /> }</td>
                        <td>{character.illustration? <img src={`${URLS.BASE_URL}/${character.illustration}`} /> : <img src={'https://i.pravatar.cc/96'} /> }</td>
                        <td>{character.User?.firstname}</td>
                        <td><Link to={'/mj/personnage/modifier' + '/' + character.id}><EditIcon /></Link></td>
                        <td><Link><DeleteIcon onClick={() => deleteCharacter(character.id)} /></Link></td>
                    </tr>
                )}
                </tbody>
                <tfoot></tfoot>
            </table>

            <h2>Combats :</h2>
            <button onClick={() => navigate("/mj/combat/creer")}>Créer un Combat</button>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Titre</th>
                    <th>Statut</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                {battles.map(battle =>
                    <tr key={battle.id}>
                        <td>{battle.id}</td>
                        <td>{battle.title}</td>
                        <td>{battle.status}</td>
                        <td><Link to={'/mj/combat/modifier' + '/' + battle.id}><EditIcon /></Link></td>
                        <td><Link><DeleteIcon onClick={() => deleteBattle(battle.id)} /></Link></td>
                    </tr>
                )}
                </tbody>
                <tfoot></tfoot>
            </table>
        </>
    );
};

export default GameMasterPage;
