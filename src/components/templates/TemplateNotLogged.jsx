import Template from "./Template.jsx";
import { ContexteUser } from "../../contexts/contexteUser.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const TemplateNotLogged = () => {
  const { user, loading } = useContext(ContexteUser); // Récupération de l'utilsiateur connecté dans le contexte et de la variable loading

  // Si l'utilisateur n'existe pas, en se rendant sur des pages pour non-connecté, on laisse passer et on affiche le template header outlet footer
  // Sinon cela veut dire que l'utilisateur est connecté et il ne doit pas avoir accès à ces pages, on le redirige vers la page mon-compte

  return (
    <>
      {!loading && (
        <>
          {!user ? <Template /> : <Navigate to="/mon-compte" />}
        </>
      )}
    </>
  );
};

export default TemplateNotLogged;
