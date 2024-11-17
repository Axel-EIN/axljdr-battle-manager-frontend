import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../constants/urls.js";
import FormCharacter from "../../components/forms/FormCharacter.jsx";

const CharacterAddPage = () => {
    const navigate = useNavigate();

    const submitPropsAddCharacter = async (formData) => {
        try {
            await axios.post( URLS.CHAR_ADD, formData, { withCredentials: true } );
            alert("Le personnage a bien été crée !");
            navigate("/mj");
        } catch (erreur) { alert(erreur.message); }
    };

    return (
        <>
            <h1>Ajouter un personnage</h1>
            <FormCharacter submitPropsFunction={submitPropsAddCharacter} />
        </>
    );
};

export default CharacterAddPage;
