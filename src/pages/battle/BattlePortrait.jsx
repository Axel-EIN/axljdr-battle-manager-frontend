import { URLS } from '../../constants/urls.js';
import { NA } from '../../constants/na.js';
import { FaHeartPulse } from "react-icons/fa6";
import { FaRunning } from "react-icons/fa";
import { IoSpeedometerSharp } from "react-icons/io5";
import classNames from 'classnames';

function BattlePortrait( { participation, key, isActive = false, isPlayed = false, isImpacted1 = false, isImpacted2 = false } ) {
    return (
        <div key={key} className={classNames('character-wrapper', {'impact1' : isImpacted1, 'impact2' : isImpacted2,})} >
            <div className={participation.is_out ? 'slash visible' : 'slash hidden'}><img src="/ui/out.png" /></div>
            <div className={classNames('character card', {
                'active': isActive,
                'played': isPlayed,
                'teamA' : participation.team === 1,
                'teamB' : participation.team === 2,
                'out' : participation.is_out,
                'impact1' : isImpacted1,
                'impact2' : isImpacted2,
            })} key={participation.Character.id}>
                <div className={classNames('firstname', {
                    'active': isActive,
                    'teamA' : participation.team === 1,
                    'teamB' : participation.team === 2,
                })} >{participation.Character.firstname}</div>
                <div className="portrait-wrapper">
                    <img
                        className="portrait medium"
                        src={participation.Character.portrait? `${URLS.BACK_URL}/${participation.Character.portrait}` : `${NA.PORTRAIT}`} 
                        alt={participation.Character.firstname}
                        title={participation.Character.firstname}
                    />
                </div>
                <div  className={classNames('stats', {'hidden' : participation.is_out})}>
                    <div className="stat-row"><FaHeartPulse className='heart' /> HP <strong className="value">{participation.Character.health}</strong></div>
                    <div className="stat-row"><FaRunning /> Evasion <strong className="value">{participation.current_tn}</strong></div>
                    <div className="stat-row"><IoSpeedometerSharp /> Initiative <strong className="value">{participation.initiative}</strong></div>
                    <div className="stat-row">Posture <strong className="value">{participation.stance}</strong></div>
                </div>
            </div>
        </div>
    );
}

export default BattlePortrait;
