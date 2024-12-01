import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ContexteUser } from "../contexts/contexteUser.jsx"; // Import du contexte pour les utilisateurs

const LoginPage = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { loginUser } = useContext(ContexteUser); // Récupération de la fonction pour connecter l'utilisateur en destructurant le ContexteUtilisateur

    const handleSubmit = async (event) => {
        event.preventDefault(); // On previent le rechargement de page par défaut
        try {
        await loginUser(login, password);
        navigate("/");
        } catch ({response}) {
        alert(response.data.error); }
    };

    return (
        <>
            <h1>CONNEXION</h1>
            <form className="card single" onSubmit={handleSubmit}>

                <div className="label-input">
                    <label htmlFor="login" >Identifiant :</label>
                    <input type="text" id="login" name="login" value={login} onChange={(event) => setLogin(event.target.value)} />
                </div>

                <div className="label-input">
                    <label htmlFor="password" >Mot de passe :</label>
                    <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <Link className="lost-password" to='/recuperation'>Mot de passe oublié ?</Link>
                </div>

                <div className="login-register-btn-wrapper">
                    <button className="btn-primary btn-large" type="submit">Se connecter</button>
                    <Link to='/inscription'>Pas de compte ? Inscrivez-vous gratuitement !</Link>
                </div>

            </form>
        </>
    );
};

export default LoginPage;
