import { useContext } from "react";
import { ContexteUtilisateur } from "../contexts/contexteUtilisateur";

const PageMonCompte = () => {
    const { utilisateur } = useContext(ContexteUtilisateur);

    return (
        <>
            <h1>Bienvenue <strong>{utilisateur.prenom}</strong>, vous êtes sur votre page de compte !</h1>

            <h2>Vos informations</h2>

            Votre Identifiant : <strong>{utilisateur.identifiant}</strong>
            <br/><br/>
            Votre Email : <strong>{utilisateur.email}</strong>
            <br/><br/>
            Votre Prénom : <strong>{utilisateur.prenom}</strong>
            <br/><br/>
            Votre Rôle : <strong>{utilisateur.role}</strong>
            <br/><br/>
            Votre Avatar : <strong>{utilisateur.avatar}</strong>
            <br/>
            {utilisateur.avatar? <img src={'http://localhost:8080/' + utilisateur.avatar} alt="Avatar de l'Utilisateur" /> : <img src={'https://i.pravatar.cc/96'} />}
        </>
    );
};

export default PageMonCompte;