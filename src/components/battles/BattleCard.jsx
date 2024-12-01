import { Link } from "react-router-dom";

function BattleCard({battle}) {
    return (
        <div className='card' key={battle.id}>
            <Link to={'/combat' + '/' + battle.id} >
                <h3 className="card-title">{battle.title}</h3>
            </Link>
            {battle.status != 'finished' && <button className="btn-primary btn-medium">Rejoindre</button>}
            {battle.status === 'finished' && <button className="btn-secondary btn-medium">Consulter</button>}
        </div>
    );
}

export default BattleCard;
