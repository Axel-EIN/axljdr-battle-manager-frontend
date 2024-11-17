import axios from 'axios';
import { URLS } from '../../constants/urls.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
                {users.map((user) =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.login}</td>
                        <td>{user.email}</td>
                        <td>{user.firstname}</td>
                        <td>{user.avatar? <img src={`${URLS.BASE_URL}/${user.avatar}`} /> : <img src={'https://i.pravatar.cc/96'} /> }</td>
                        <td>{user.role}</td>
                        <td><Link to={'/admin/utilisateur/modifier' + '/' + user.id}><EditIcon /></Link></td>
                        <td><Link><DeleteIcon onClick={() => deleteUser(user.id)} /></Link></td>
                    </tr>
                )}
                </tbody>
                <tfoot></tfoot>
            </table>
        </>
    );
};

export default AdminPage;
