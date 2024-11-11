function BattlePortrait( { personnage } ) {
  return (
    <div className="character" key={personnage.id}>
      <div className="portrait-wrapper">
        {personnage.portrait? <img className="portrait-medium" src={`http://localhost:8080/${personnage.portrait}`}  alt={personnage.prenom} /> : <img src={'https://i.pravatar.cc/96'} alt={personnage.prenom} /> }
        <strong>{personnage.prenom}</strong>
      </div>
      <div className="stats">
        <span>HP <strong>{personnage.HP}</strong></span>
        <span>Initiative <strong>{personnage.Participation.initiative}</strong></span>
      </div>
    </div>
  );
}

export default BattlePortrait;
