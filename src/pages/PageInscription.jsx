import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../constants/urls.js";
import FormUtilisateur from "../components/forms/FormUtilisateur.jsx";

const PageInscription = () => {
  const navigate = useNavigate();

  const enregistrerUtilisateurDepuisFormulaire = async (donneesFormulaire) => {
    try {
      const newRegistredUser = {
        identifiant: donneesFormulaire.get('identifiant'),
        mdp: donneesFormulaire.get('mdp'),
        email: donneesFormulaire.get('email'),
        prenom: donneesFormulaire.get('prenom')
      }
      await axios.post(URLS.USER_REGISTER, newRegistredUser);
      alert("Inscription réussie ! Vous pouvez vous connecter !");
      navigate("/");
    } catch ({response}) {
      alert(response.data.error); }
  }

  return (
    <>
      <h1>INSCRIPTION</h1>
      <FormUtilisateur fonctionPropsSoumissionFormulaire={enregistrerUtilisateurDepuisFormulaire} register={true} />
    </>
  );
};

export default PageInscription;
