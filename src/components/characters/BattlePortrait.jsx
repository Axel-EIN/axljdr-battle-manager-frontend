import { URLS } from '../../constants/urls.js'

function BattlePortrait( { participation } ) {
  return (
    <div className="character" key={participation.Personnage.id}>
      <div className="portrait-wrapper">
        <img className="portrait-medium" src={participation.Personnage.portrait? `${URLS.BASE_URL}/${participation.Personnage.portrait}` : 'https://i.pravatar.cc/96'}  alt={participation.Personnage.prenom} />
        <strong>{participation.Personnage.prenom}</strong>
      </div>
      <div className="stats">
        <span>HP <strong>{participation.Personnage.HP}</strong></span>
        <span>Initiative <strong>{participation.initiative}</strong></span>
        <span>Posture <strong>{participation.posture}</strong></span>
        <span>A joué <strong>{participation.is_played? <span>Oui</span> : <span>Non</span>}</strong></span>
      </div>
    </div>
  );
}

export default BattlePortrait;
