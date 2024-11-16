import { useContext } from "react";
import { ContexteUtilisateur } from "../contexts/contexteUtilisateur";
import { URLS } from "../constants/urls";

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
            {utilisateur.avatar? <img src={`${URLS.BASE_URL}/${utilisateur.avatar}`} alt="Avatar de l'Utilisateur" /> : <img src={'https://i.pravatar.cc/96'} />}
            <br/>
            {utilisateur && utilisateur.Personnages &&
                <>
                    <h2>Mes Personnages :</h2>
                    {utilisateur.Personnages.map((element) =>
                        <div key={element.id}>
                            <img src={`${URLS.BASE_URL}/${element.portrait}`} alt="Portrait du Personnage" />
                            <strong>{element.nom} {element.prenom}</strong>
                        </div>)}
                </>
            }
        </>
    );
};

export default PageMonCompte;