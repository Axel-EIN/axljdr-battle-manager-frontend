import axios from 'axios';
import { URLS } from '../../constants/urls.js';
import { NA } from '../../constants/na.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { FaRegTrashCan } from "react-icons/fa6";

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
            <h1>Panneau du Maître du Jeu</h1>

            <div className="layout-flex-row">
                <div className="list-characters">

                    <h2>Personnages</h2>
                    <button className="btn-primary btn-medium" onClick={() => navigate("/mj/personnage/creer")}>Ajouter un Personnage</button>

                    <div className="flex-table">
                        <div className="grid-row fr15 head">
                            <div className="span2">Portrait</div>
                            <div className="span2">Illustration</div>
                            <div className="span3">Nom</div>
                            <div className="span3">Prénom</div>
                            <div className="span3">Joueur</div>
                            <div></div>
                            <div></div>
                        </div>

                        {characters.map(character =>
                            <div className="grid-row fr15 card row" key={character.id}>
                                <div className="span2">
                                    {character.portrait?
                                        <img className="portrait small" src={`${URLS.BACK_URL}/${character.portrait}`} />
                                        : <img className="portrait small" src={`${NA.PORTRAIT}`} /> }
                                </div>
                                <div className="span2">
                                    {character.illustration?
                                        <img className="illustration small" src={`${URLS.BACK_URL}/${character.illustration}`} />
                                        : <img className="illustration small" src={`${NA.ILLUSTRATION}`} /> }
                                </div>
                                <div className="span3">{character.lastname}</div>
                                <div className="span3">{character.firstname}</div>
                                <div className="span3">{character.User?.firstname}</div>
                                <div><Link to={'/mj/personnage/modifier' + '/' + character.id}><GrEdit /></Link></div>
                                <div><Link><FaRegTrashCan onClick={() => window.confirm("Êtes-vous sûr de vouloir supprimer ce personnage ?") && deleteCharacter(character.id)} /></Link></div>
                            </div>
                        )}
                    </div>

                </div>

                <div className="list-battles">

                    <h2>Combats</h2>
                    <button className="btn-primary btn-medium" onClick={() => navigate("/mj/combat/creer")}>Créer un Combat</button>

                    <div className="flex-table">

                        <div className="grid-row fr7 head">
                            <div className="span3">Titre</div>
                            <div className="span2">Statut</div>
                            <div></div>
                            <div></div>
                        </div>

                        {battles.map(battle =>
                            <div className="grid-row fr8 card row" key={battle.id}>
                                <div className="span4">{battle.title}</div>
                                <div className="span2">{battle.status}</div>
                                <div><Link to={'/mj/combat/modifier' + '/' + battle.id}><GrEdit /></Link></div>
                                <div><button className="btn-icon" onClick={() => window.confirm("Êtes-vous sûr de vouloir supprimer ce combat ?") && deleteBattle(battle.id)}><FaRegTrashCan /></button></div>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </>
    );
};

export default GameMasterPage;
