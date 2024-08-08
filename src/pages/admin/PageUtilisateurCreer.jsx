import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../constants/urls.js";
import FormUser from "../../components/forms/FormUser.jsx";

const PageUtilisateurCreer = () => {
  const navigate = useNavigate();

  const creerUtilisateurDepuisFormulaire = async (donneesFormulaire) => {
    try {
      await axios.post( URLS.USER_CREATE, donneesFormulaire, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      alert("L'utilisateur a bien été crée !");
      navigate("/admin");
    } catch ({response}) {
      alert(response.data.error); }
  };

  return (
    <>
      <h1>CRÉATION UTILISATEUR</h1>
      <FormUser fonctionPropsSoumissionFormulaire={creerUtilisateurDepuisFormulaire} />
    </>
  );
};

export default PageUtilisateurCreer;
