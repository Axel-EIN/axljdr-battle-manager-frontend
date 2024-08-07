import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { URLS } from './../constants/urls.js';
// import { UserContext } from "../../contexts/userContext";

const Connexion = () => {
    const [identifiant, setIdentifiant] = useState("");
    const [mdp, setMdp] = useState("");
    const navigate = useNavigate();
    //   const { login } = useContext(UserContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const utilisateur = await axios.post(URLS.USER_LOGIN, { identifiant: identifiant, mdp: mdp });
            navigate("/");
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
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