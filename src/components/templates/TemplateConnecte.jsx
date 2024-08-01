import Template from './Template.jsx';
import { ContexteUtilisateur } from '../../contexts/contexteUtilisateur.jsx';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const TemplateConnecte = () => {

    // Récupération de l'utilsiateur connecté dans le contexte
    const { utilisateur } = useContext(ContexteUtilisateur);

    // Si l'utilisateur exite et se rend sur une page pour connecté, on affiche le template header outlet footer
    // Sinon cela veut dire que l'utilisateur n'est pas connecté et ne doit pas avoir accès à ces pages, on le redirige vers la page de connexion

    return (
        <>
            {utilisateur ?
                (
                    <Template/>
                )
                :
                ( 
                    <Navigate to="/connexion"/> 
                )
            }
        </>
    );
}

export default TemplateConnecte;