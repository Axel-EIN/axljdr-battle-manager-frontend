import axios from 'axios';
import { URLS } from '../../constants/urls.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PageMj = () => {
    const [personnages, setPersonnages] = useState([]);
    const [combats, setCombats] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        recupererPersonnages();
        recupererCombats();
        setReload(false);
    }, [reload])

    const recupererPersonnages = async () => {
        // Try Catch ?
        const { data } = await axios.get(URLS.CHAR_ALL);
        setPersonnages(data);
    }

    const recupererCombats = async () => {
        // Try Catch ?
        const { data } = await axios.get(URLS.BATTLE_ALL);
        setCombats(data);
    }

    const supprimerPersonnage = async (personnageID) => {
        try {
            const instance = axios.create({withCredentials: true})
            const reponse = await instance.delete(URLS.CHAR_DELETE + '/' + personnageID);
            alert("Le personnage a bien été supprimé !");
            setReload(true);
        } catch ({response}) {
            alert(response.data.error); }
    }

    const supprimerCombat = async (combatID) => {
        try {
            const instance = axios.create({withCredentials: true})
            const reponse = await instance.delete(URLS.BATTLE_DELETE + '/' + combatID);
            alert("Le combat a bien été supprimé !");
            setReload(true);
        } catch ({response}) {
            alert(response.data.error); }
    }

    return (
        <>
            <h1>Le Paneau du Maître du Jeu</h1>

            <h2>Personnages :</h2>
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
                {personnages.map(
                        (personnage, cle) => (
                            <tr key={cle}>
                                <td>{personnage.id}</td>
                                <td>{personnage.nom}</td>
                                <td>{personnage.prenom}</td>
                                <td>{personnage.portrait? <img src={`http://localhost:8080/${personnage.portrait}`} /> : <img src={'https://i.pravatar.cc/96'} /> }</td>
                                <td>{personnage.illustration? <img src={`http://localhost:8080/${personnage.illustration}`} /> : <img src={'https://i.pravatar.cc/96'} /> }</td>
                                <td>{personnage.Utilisateur?.prenom}</td>
                                <td><Link to={'/mj/personnage/modifier' + '/' + personnage.id}><EditIcon /></Link></td>
                                <td><DeleteIcon onClick={() => supprimerPersonnage(personnage.id)} /></td>
                            </tr>
                        )
                    )
                }
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
                {combats.map( (combat, cle) => (
                    <tr key={cle}>
                        <td>{combat.id}</td>
                        <td>{combat.titre}</td>
                        <td>{combat.statut}</td>
                        <td><Link to={'/mj/combat/modifier' + '/' + combat.id}><EditIcon /></Link></td>
                        <td><DeleteIcon onClick={() => supprimerCombat(combat.id)} /></td>
                    </tr>
                ) ) }
                </tbody>
                <tfoot></tfoot>
            </table>
        </>
    );
};

export default PageMj;
