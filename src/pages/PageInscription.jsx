import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../constants/urls.js";
import FormUser from "../components/forms/FormUser.jsx";

const PageInscription = () => {
  const navigate = useNavigate();

  const enregistrerUtilisateurSoumis = async (utilisateurSoumis) => {
    try {
      await axios.post(URLS.USER_REGISTER, utilisateurSoumis);
      navigate("/");
    } catch (erreur) {
      console.error(erreur.message);
    }
  };

  return (
    <>
      <h1>INSCRIPTION</h1>
      <FormUser fonctionPropsSoumissionFormulaire={enregistrerUtilisateurSoumis} />
    </>
  );
};

export default PageInscription;
