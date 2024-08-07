import axios from 'axios';
import { URLS } from '../../constants/urls.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const PageAdmin = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        recupererUtilisateurs();
    }, [])

    const recupererUtilisateurs = async () => {
        const { data } = await axios.get(URLS.USER_ALL);
        setUtilisateurs(data);
    }

    const supprimerUtilisateur = async (utilisateurID) => {
        const instance = axios.create({withCredentials: true})
        const reponse = await instance.delete(URLS.USER_DELETE + '/' + utilisateurID);
    }

    return (
        <>
            <h1>Bienvenue sur la page d'administration !</h1>

            <h2>Utilisateurs :</h2>
            <button onClick={() => navigate("/admin/utilisateur/creer")}>Créer un Utilisateur</button>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Identifiant</th>
                    <th>Email</th>
                    <th>Prénom</th>
                    <th>Avatar</th>
                    <th>Role</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                {
                    utilisateurs.map(
                        (utilisateur, cle) => (
                            <tr key={cle}>
                                <td>{utilisateur.id}</td>
                                <td>{utilisateur.identifiant}</td>
                                <td>{utilisateur.email}</td>
                                <td>{utilisateur.prenom}</td>
                                <td>{utilisateur.avatar}</td>
                                <td>{utilisateur.role}</td>
                                <td><Link to="/edit">Edit</Link></td>
                                <td><button onClick={() => supprimerUtilisateur(utilisateur.id)}>Delete</button></td>
                            </tr>
                        )
                    )
                }
                </tbody>
                <tfoot></tfoot>
            </table>
        </>
    );
};

export default PageAdmin;