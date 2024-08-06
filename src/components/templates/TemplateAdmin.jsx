import Template from "./Template.jsx";
import { ContexteUtilisateur } from "../../contexts/contexteUtilisateur.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const TemplateMJ = () => {
  const { utilisateur, loading } = useContext(ContexteUtilisateur); // Récupération de l'utilsiateur connecté dans le contexte et de la variable loading

  // Si le loading de l'utilisateur du context et terminé, alors on verifie si l'utilisateur existe.
  // Si oui on affiche le template, sinon on redirige vers la page de connexion
  return (
    <>
      {!loading && (
        <>{utilisateur && utilisateur.role == 'admin' ? <Template /> : <Navigate to="/connexion" />}</>
      )}
    </>
  );
};

export default TemplateMJ;
