import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../constants/urls.js";
import FormUser from "../components/forms/FormUser.jsx";

const PageInscription = () => {
  const navigate = useNavigate();

  const enregistrerUtilisateurSoumis = async (utilisateurSoumis) => {
    try {
      const reponse = await axios.post(URLS.USER_REGISTER, utilisateurSoumis);
      alert("Inscription réussie ! Vous pouvez vous connecter !");
      navigate("/");
    } catch ( {response} ) { // déconstruit l'objet habituellement catché en ne prenant que la sous-propriété response
      alert(response.data.error); }
  };

  return (
    <>
      <h1>INSCRIPTION</h1>
      <FormUser fonctionPropsSoumissionFormulaire={enregistrerUtilisateurSoumis} />
    </>
  );
};

export default PageInscription;
