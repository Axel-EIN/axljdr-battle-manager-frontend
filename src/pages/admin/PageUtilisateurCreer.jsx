import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../constants/urls.js";
import FormUser from "../../components/forms/FormUser.jsx";

const PageUtilisateurCreer = () => {
  const navigate = useNavigate();

  const creerUtilisateurSoumis = async (utilisateurSoumis) => {
    try {
      await axios.post( URLS.USER_CREATE, utilisateurSoumis, { withCredentials: true } );
      navigate("/admin");
    } catch (erreur) {
      console.error(erreur.message);
    }
  };

  return (
    <>
      <h1>CRÉATION UTILISATEUR</h1>
      <FormUser fonctionPropsSoumissionFormulaire={creerUtilisateurSoumis} admin={true} />
    </>
  );
};

export default PageUtilisateurCreer;
