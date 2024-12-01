import { useContext } from "react";
import { ContexteUser } from "../../contexts/contexteUser";
import { Link } from "react-router-dom";
import { URLS } from "../../constants/urls";

function BigBattleCard({battle}) {
    const { user } = useContext(ContexteUser);

    return (
        <div className='card big column align-center'>
            {battle ? (
                <>
                    <Link to={'/combat' + '/' + battle.id} >
                        <h3 className="card-title">{battle.title}</h3>
                    </Link>
                    <div className="status-line">
                        <div>
                            <h4>Statut : </h4>
                            {battle.status}
                        </div>
                        <div>
                            <h4>Round : </h4>
                            {battle.current_round}
                        </div>
                        <div>
                            <h4>Tour : </h4>
                            {battle.CurrentTurn?.firstname}
                        </div>
                        <div>
                            <h4>Participants : </h4>
                            {battle.Participations.length}
                        </div>
                    </div>

                    <div className="versus">

                        <div className="team teamA">
                            {battle.Participations.filter(p => p.team === 1).map(p =>
                                <div>
                                    <img
                                        className="portrait"
                                        src={p.Character.portrait? `${URLS.BASE_URL}/${p.Character.portrait}` : 'https://i.pravatar.cc/96'} 
                                        alt={p.Character.firstname}
                                        title={p.Character.firstname}
                                    />
                                </div>
                            )}
                        </div>

                        <div className='display'>VS</div>

                        <div className="team teamB">
                            {battle.Participations.filter(p => p.team === 2).map(p =>
                                <div>
                                    <img
                                        className="portrait"
                                        src={p.Character.portrait? `${URLS.BASE_URL}/${p.Character.portrait}` : 'https://i.pravatar.cc/96'} 
                                        alt={p.Character.firstname}
                                        title={p.Character.firstname}
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                    
                    {battle.status != 'finished' && <button className="btn-primary btn-large">Rejoindre</button>}
                    {battle.status === 'finished' && <button className="btn-secondary btn-large">Consulter</button>}
                </>
            ) : (
                <>
                    <h3 className="card-title">Aucun combat actif !</h3>
                    {user && user.role === 'gamemaster' && <button className="btn-primary btn-large">Créer un combat</button>}
                </>
            )}
        </div>
    );
}

export default BigBattleCard;
