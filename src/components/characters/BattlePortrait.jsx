function BattlePortrait( { participation } ) {
  return (
    <div className="character" key={participation.Personnage.id}>
      <div className="portrait-wrapper">
        {participation.Personnage.portrait? <img className="portrait-medium" src={`http://localhost:8080/${participation.Personnage.portrait}`}  alt={participation.Personnage.prenom} /> : <img src={'https://i.pravatar.cc/96'} alt={participation.Personnage.prenom} /> }
        <strong>{participation.Personnage.prenom}</strong>
      </div>
      <div className="stats">
        <span>HP <strong>{participation.Personnage.HP}</strong></span>
        <span>Initiative <strong>{participation.initiative}</strong></span>
        <span>Posture <strong>{participation.posture}</strong></span>
        <span>A joué <strong>{participation.isPlayed? <span>Oui</span> : <span>Non</span>}</strong></span>
      </div>
    </div>
  );
}

export default BattlePortrait;
