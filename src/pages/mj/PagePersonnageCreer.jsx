import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../constants/urls.js";
import FormPersonnage from "../../components/forms/FormPersonnage.jsx";

const PagePersonnageCreer = () => {
  const navigate = useNavigate();

  const creerPersonnageDepuisFormulaire = async (donneesFormulaire) => {
    try {
      await axios.post( URLS.CHAR_ADD, donneesFormulaire, { withCredentials: true } );
      alert("Le personnage a bien été crée !");
      navigate("/mj");
    } catch (erreur) { alert(erreur.message); }
  };

  return (
    <>
      <h1>CRÉATION PERSONNAGE</h1>
      <FormPersonnage
        fonctionPropsSoumissionFormulaire={creerPersonnageDepuisFormulaire}
      />
    </>
  );
};

export default PagePersonnageCreer;
