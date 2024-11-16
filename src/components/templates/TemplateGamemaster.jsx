import Template from "./Template.jsx";
import { ContexteUser } from "../../contexts/contexteUser.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const TemplateGamemaster = () => {
  const { user, loading } = useContext(ContexteUser); // Récupération de l'utilsiateur connecté dans le contexte et de la variable loading

  // Si le loading de l'utilisateur du context et terminé, alors on verifie si l'utilisateur existe.
  // Si oui on affiche le template, sinon on redirige vers la page de connexion
  return (
    <>
      {!loading &&
        <>
          {user && user.role == 'gamemaster' ? <Template /> : <Navigate to="/connexion" />}
        </>
      }
    </>
  );
};

export default TemplateGamemaster;
