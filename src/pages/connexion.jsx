import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Import du contexte pour les utilisateurs
import { ContexteUtilisateur } from '../contexts/contexteUtilisateur.jsx';

const Connexion = () => {
    const [identifiant, setIdentifiant] = useState('');
    const [mdp, setMdp] = useState('');
    const navigate = useNavigate();

    const { connecterUtilisateur } = useContext(ContexteUtilisateur);

    const gererSoumissionFormulaire = async (event) => {
        event.preventDefault(); // On previent le fonctionnement par défaut
        try {
            await connecterUtilisateur(identifiant, mdp);
            navigate("/");
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <h1>PAGE CONNEXION</h1>
            <form onSubmit={gererSoumissionFormulaire}>
                Identifiant :<br />
                <input type="text" id="identifiant" name="identifiant" value={identifiant} onChange={ (event) => setIdentifiant(event.target.value) } /><br />
                Mot de passe :<br />
                <input type="password" name="mdp" id="mdp" value={mdp} onChange={ (event) => setMdp(event.target.value) } /><br />
                <button type="submit">Se connecter</button>
            </form>
        </>
    );
};

export default Connexion;