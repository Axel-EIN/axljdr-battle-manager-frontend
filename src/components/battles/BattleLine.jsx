import { Link } from "react-router-dom";

function BattleLine({battle}) {
    return (
        <div className='card line' key={battle.id}>
            <Link to={'/combat' + '/' + battle.id} >
                <h4>{battle.title}</h4>
            </Link>
            {battle.status != 'finished' && <button className="btn-primary btn-medium">Rejoindre</button>}
            {battle.status === 'finished' && <button className="btn-secondary btn-medium">Consulter</button>}
        </div>
    );
}

export default BattleLine;
