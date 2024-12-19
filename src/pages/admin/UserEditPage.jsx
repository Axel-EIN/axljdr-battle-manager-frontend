import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLS } from '../../constants/urls.js';
import FormUser from "../../components/forms/FormUser.jsx";

const UserEditPage = () => {
    const { utilisateurID } = useParams();
    const navigate = useNavigate();
    const [ userToEdit, setUserToEdit ] = useState(null);

    const getUser = async (ID) => {
        try {
            const { data } = await axios.get(URLS.USER_ONE + '/' + ID);
            setUserToEdit(data);
        } catch(error) {
            console.log(error);
            alert(error);
        }
    }

    useEffect(() => {
        getUser(utilisateurID);
    }, []);

    const submitPropsEditUser = async (formData) => {
        try {
            await axios.put( URLS.USER_EDIT + '/' + utilisateurID, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );
            navigate("/admin");
            alert("L'Utilisateur a bien été modifié !");
        } catch ({response}) {
            alert(response.data.error);
        }
    }

    return (
        <>
            <h1>Modifier l'utilisateur</h1>
            {userToEdit ? <FormUser submitPropsFunction={submitPropsEditUser} initialUser={userToEdit} /> : <p>Chargement des données de l'utilisateur...</p>}
        </>
    );
};

export default UserEditPage;
