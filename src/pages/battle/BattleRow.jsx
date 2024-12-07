function BattleRow({ battle }) {
    return (
        <div className="card flex-wrap-col">
            <h4>{battle.title}</h4>
            <div className="flex-wrap-row">
                {(battle.status === 'started' || battle.status === 'paused') &&
                    <div>
                        <dt>Statut :</dt>
                        <dd>{battle.status}</dd>
                    </div>
                }
                <div>
                    <dt>Participants :</dt>
                    <dd>{battle.Participations.length}</dd>
                </div>

                <div>
                    <dt>Participants :</dt>
                    <dd>{battle.Participations.length}</dd>
                </div>
                {battle.winner_team &&
                    <div>
                        <dt>Vainqueur :</dt>
                        <dd>{battle.winner_team}</dd>
                    </div>
                }
            </div>
        </div>
    );
};

export default BattleRow;
