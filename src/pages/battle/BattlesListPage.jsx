import axios from 'axios';
import { useEffect, useState } from 'react';
import { URLS } from '../../constants/urls.js';
import BattleRow from './BattleRow.jsx';

function BattlesListPage() {
    const [ battles, setBattles ] = useState([]);

    const getAllBattles = async () => {
        try {
            const { data } = await axios.get(URLS.BATTLE_ALL);
            setBattles(data);
        } catch ( error ) { console.error( error.message ); alert(error.message) };
    }

    useEffect(() => {
        getAllBattles();
    }, []);

    return (
        <>
            <h1>Les Combats</h1>
            <div className="flex-1-1-1">
                <div>
                    <h2>Démarrés</h2>
                    <div className="flex-wrap-col">
                        {battles.filter(battle => battle.status === 'started' || battle.status === 'paused').map(battle =>
                            <BattleRow battle={battle} key={battle.id} />
                        )}
                    </div>
                </div>
                <div>
                    <h2>Non-démarrés</h2>
                    <div className="flex-wrap-col">
                        {battles.filter(battle => battle.status === 'waiting').map(battle =>
                            <BattleRow battle={battle} key={battle.id} />
                        )}
                    </div>
                </div>
                <div>
                    <h2>Terminées</h2>
                    <div className="flex-wrap-col">
                        {battles.filter(battle => battle.status === 'finished').map(battle =>
                            <BattleRow battle={battle} key={battle.id} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BattlesListPage;
