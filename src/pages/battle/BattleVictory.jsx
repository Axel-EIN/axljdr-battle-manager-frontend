import { URLS } from "../../constants/urls";
import { NA } from "../../constants/na";
import CharacterCard from '../../components/cards/CharacterCard.jsx';

function BattleVictory({ battle }) {
    return (
        <div className="winner-screen">

            <h2>Victoire :</h2>
            <div className="winner-list">
                {battle.Participations.filter(p => p.team === battle.winner_team).map(p =>
                    <CharacterCard character={p.Character} />
                )}
            </div>

            <h3>Défaite :</h3>
            <div className="loser-list">
                {battle.Participations.filter(p => p.team != battle.winner_team).map(p =>
                    <div className="character-portrait-name">
                        <img className="portrait" src={p.Character.portrait? `${URLS.BACK_URL}/${p.Character.portrait}` : `${NA.PORTRAIT}`}
                            alt={p.Character.firstname} title={p.Character.firstname} />
                        <div className="loser-info">
                            <strong>{p.Character.firstname}</strong>
                            <span>{p.Character.User?.firstname}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BattleVictory;
