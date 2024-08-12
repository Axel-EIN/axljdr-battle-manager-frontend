import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../constants/urls.js";
import FormCombat from "../../components/forms/FormCombat.jsx";

const PageCombatCreer = () => {
  const navigate = useNavigate();

  const creerCombatDepuisFormulaire = async (donneesCombat) => {
    try {
      await axios.post( URLS.BATTLE_ADD, donneesCombat, { withCredentials: true } );
      alert("Le combat a bien été crée !");
      navigate("/mj");
    } catch (erreur) { alert(erreur.message); }
  };

  return (
    <>
      <h1>CRÉATION COMBAT</h1>
      <FormCombat fonctionPropsSoumissionFormulaire={creerCombatDepuisFormulaire} />
    </>
  );
};

export default PageCombatCreer;
