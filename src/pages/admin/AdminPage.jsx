import './AdminPage.css';
import axios from 'axios';
import { URLS } from '../../constants/urls.js';
import { NA } from '../../constants/na.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { FaRegTrashCan } from "react-icons/fa6";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            const { data } = await axios.get(URLS.USER_ALL);
            setUsers(data);
        }
        getUsers();
        setReload(false);
    }, [reload])


    const deleteUser = async (userID) => {
        try {
            const instance = axios.create({withCredentials: true})
            await instance.delete(URLS.USER_DELETE + '/' + userID);
            alert("L'Utilisateur a bien été supprimé !");
            setReload(true);
        } catch ({response}) {
            alert(response.data.error); }
    }

    return (
        <>
            <h1>Panneau d'administration</h1>

            <h2>Utilisateurs</h2>
            <button className="btn-primary btn-medium admin" onClick={() => navigate("/admin/utilisateur/creer")}>Ajouter un Utilisateur</button>

            <div className="flex-table"> 
                <div className="grid-row fr14 head">
                    <div className="col-avatar span2">Avatar</div>
                    <div className="span2">Identifiant</div>
                    <div className="col-firstname span2">Prénom</div>
                    <div className="col-email span3">Email</div>
                    <div className="span2">Rôle</div>
                    <div className="col-characters">Personnages</div>
                    <div></div>
                    <div></div>
                </div>
                {users.map(user =>
                    <div key={user.id} className="grid-row fr14 card row">
                        <div className="col-avatar span2">
                            {user.avatar?
                                <img className="avatar small" src={`${URLS.BACK_URL}/${user.avatar}`} />
                                : <img className="avatar small" src={`${NA.AVATAR}`} /> }
                        </div>
                        <div className="span2"><strong>{user.login}</strong></div>
                        <div className="col-firstname span2">{user.firstname}</div>
                        <div className="col-email span3">{user.email}</div>
                        <div className="span2">{user.role}</div>
                        <div className="col-characters">{user.Characters.length}</div>
                        <div><Link to={'/admin/utilisateur/modifier' + '/' + user.id}><GrEdit /></Link></div>
                        <div><Link><FaRegTrashCan onClick={() => window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?") && deleteUser(user.id)} /></Link></div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminPage;
