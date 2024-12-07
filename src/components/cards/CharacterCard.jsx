import { URLS } from "../../constants/urls";
import { NA } from "../../constants/na";
import classNames from "classnames";

function CharacterCard({ character, isPj = false, isPnj = false}) {
    return (
        <div className="character-card">
            <div className={classNames("div-image", { 'pj': isPj, 'pnj': isPnj })}>
                <img src={character.illustration? `${URLS.BACK_URL}/${character.illustration}` : `${NA.ILLUSTRATION}`} 
                    alt={character.firstname} title={character.firstname} />
            </div>       
            <div className="info-character">
                <h2>{character.lastname}</h2>
                <h2>{character.firstname}</h2>
                <h4>{character.User?.firstname}</h4>
            </div>
        </div>
    );
}

export default CharacterCard;
