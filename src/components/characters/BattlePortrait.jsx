import { URLS } from '../../constants/urls.js'

function BattlePortrait( { participation } ) {
  return (
    <div className="character" key={participation.Character.id}>
      <div className="portrait-wrapper">
        <img
          className="portrait-medium"
          src={participation.Character.portrait? `${URLS.BASE_URL}/${participation.Character.portrait}` : 'https://i.pravatar.cc/96'} 
          alt={participation.Character.firstname}
          title={participation.Character.firstname}
        />
        <strong>{participation.Character.firstname}</strong>
      </div>
      <div className="stats">
        <span>HP <strong>{participation.Character.health}</strong></span>
        <span>Initiative <strong>{participation.initiative}</strong></span>
        <span>Posture <strong>{participation.stance}</strong></span>
        <span>A joué <strong>{participation.is_played? <span>Oui</span> : <span>Non</span>}</strong></span>
      </div>
    </div>
  );
}

export default BattlePortrait;
