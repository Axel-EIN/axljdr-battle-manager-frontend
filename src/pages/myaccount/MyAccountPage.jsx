import './MyAccountPage.css';
import { useState, useContext, useEffect } from "react";
import { ContexteUser } from "../../contexts/contexteUser";
import { URLS } from "../../constants/urls";
import { NA } from "../../constants/na";
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

            <div className="flex-2-1">
                <div className="informations">
                    <h2>Vos informations</h2>
                    <div className="card column">
                        <dl className="flex-1-1">
                            <div>
                                <dt>Votre Identifiant :</dt>
                                <dd><strong>{user.login}</strong></dd>
                            </div>

                            <div>
                                <dt>Votre Email :</dt>
                                <dd><strong>{user.email}</strong></dd>
                            </div>

                            <div>
                                <dt>Votre Prénom :</dt>
                                <dd><strong>{user.firstname}</strong></dd>
                            </div>

                            <div>
                                <dt>Votre Rôle :</dt>
                                <dd><strong>{user.role}</strong></dd>
                            </div>

                            <div>
                                <dt>Votre Avatar :</dt>
                                <dd>
                                    {user.avatar?
                                        <img className="avatar" src={`${URLS.BACK_URL}/${user.avatar}`} alt="Avatar de l'Utilisateur" title="Avatar" />
                                        : <img src={`${NA.AVATAR}`} />}
                                </dd>
                            </div>
                        </dl>
                       
                    </div>
                </div>

                <div className="characters">
                    <h2>Vos Personnages</h2>
                    <div class="flex-list">
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
