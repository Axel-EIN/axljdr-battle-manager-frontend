import { useContext } from "react";
import { ContexteUser } from "../contexts/contexteUser";
import { URLS } from "../constants/urls";

const AccountPage = () => {
    const { user } = useContext(ContexteUser);

    return (
        <>
            <h1>Bienvenue <strong>{user.firstname}</strong>, vous êtes sur votre page de compte !</h1>

            <h2>Vos informations</h2>

            Votre Identifiant : <strong>{user.login}</strong>
            <br/><br/>
            Votre Email : <strong>{user.email}</strong>
            <br/><br/>
            Votre Prénom : <strong>{user.firstname}</strong>
            <br/><br/>
            Votre Rôle : <strong>{user.role}</strong>
            <br/><br/>
            Votre Avatar : <strong>{user.avatar}</strong>
            <br/>
            {user.avatar? <img src={`${URLS.BASE_URL}/${user.avatar}`} alt="Avatar de l'Utilisateur" /> : <img src={'https://i.pravatar.cc/96'} />}
            <br/>
            {user && user.Characters &&
                <>
                    <h2>Mes Personnages :</h2>
                    {user.Characters.map((character) =>
                        <div key={character.id}>
                            <img src={`${URLS.BASE_URL}/${character.portrait}`} alt="Portrait du Personnage" />
                            <strong>{character.name} {character.firstname}</strong>
                        </div>)}
                </>
            }
        </>
    );
};

export default AccountPage;
