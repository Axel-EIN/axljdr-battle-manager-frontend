import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../constants/urls.js";
import FormBattle from "../../components/forms/FormBattle.jsx";

const BattleAddPage = () => {
  const navigate = useNavigate();

  const submitPropsAddBattle = async (formData) => {
    try {
      await axios.post( URLS.BATTLE_ADD, formData, { withCredentials: true } );
      alert("Le combat a bien été crée !");
      navigate("/mj");
    } catch (erreur) { alert(erreur.message); }
  };

  return (
    <>
      <h1>Créer un combat</h1>
      <FormBattle submitPropsFunction={submitPropsAddBattle} />
    </>
  );
};

export default BattleAddPage;
