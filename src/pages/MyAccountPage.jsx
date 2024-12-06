import { useState, useContext, useEffect } from "react";
import { ContexteUser } from "../contexts/contexteUser";
import { URLS } from "../constants/urls";
import { NA } from "../constants/na";
import axios from 'axios';

const MyAccountPage = () => {
    const { user } = useContext(ContexteUser);
    const [myUser, setMyUser] = useState(null);

    const getMyUser = async (ID) => {
        const { data } = await axios.get(URLS.USER_ONE  + '/' + ID);
        setMyUser(data);
    }

    useEffect(() => {
        getMyUser(user.id);
    }, []);

    return (
        <>
            <h1>Bienvenue <strong>{user.firstname}</strong> !</h1>

            <div className="layout-flex-row">
                <div className="informations">
                    <h2>Vos informations</h2>
                    <div className="card column">
                        <dl>
                            <dt>Votre Identifiant :</dt>
                            <dd><strong>{user.login}</strong></dd>

                            <br/>

                            <dt>Votre Email :</dt>
                            <dd><strong>{user.email}</strong></dd>

                            <br/>

                            <dt>Votre Prénom :</dt>
                            <dd><strong>{user.firstname}</strong></dd>

                            <br/>

                            <dt>Votre Rôle :</dt>
                            <dd><strong>{user.role}</strong></dd>

                            <br/>

                            <dt>Votre Avatar :</dt>
                            <dd>
                                {user.avatar?
                                    <img src={`${URLS.BACK_URL}/${user.avatar}`} alt="Avatar de l'Utilisateur" />
                                    : <img src={`${NA.AVATAR}`} />}
                            </dd>
                        </dl>
                       
                    </div>
                </div>

                <div className="characters">
                    <h2>Vos Personnages</h2>
                    <div>
                        {myUser?.Characters?.length > 0 ? (
                            <>
                                {myUser?.Characters?.map((character) =>
                                    <div className="card row align-center" key={character.id}>
                                        <img className="portrait" src={`${URLS.BACK_URL}/${character.portrait}` || `${NA.PORTRAIT}`} alt="Portrait du Personnage" />
                                        <strong>{character.lastname} {character.firstname}</strong>
                                    </div>
                                )}
                            </>
                        ) : (
                            <span>Vous n'avez pas encore de personnage.</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyAccountPage;
