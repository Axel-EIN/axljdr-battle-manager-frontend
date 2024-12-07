import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { URLS } from "../../constants/urls.js";
import { NA } from "../../constants/na.js";
import axios from "axios";

function CharacterDetailPage() {
    const { personnageID } = useParams();
    const [ character, setCharacter ] = useState();

    const getCharacter = async (ID) => {
        try {
            const { data } = await axios.get(URLS.CHAR_ONE + '/' + ID);
            setCharacter(data);
        } catch ( error ) { console.error( error.message ); alert(error.message) };
    }

    useEffect(() => {
        getCharacter(personnageID);
    }, []);

    return (
        <>
            <h1>{character?.lastname} <strong>{character?.firstname}</strong></h1>
            <br/>
            <div className="flex-1-2">
                <div>
                    <img
                        className="illustration max"
                        src={character?.illustration? `${URLS.BACK_URL}/${character?.illustration}` : `${NA.ILLUSTRATION}`} 
                        alt={character?.firstname} title={character?.firstname}
                    />
                </div>
                <div className="card flex-wrap-col">
                    <section className="column">
                        <h2>Stats :</h2>
                        <div className="flex-wrap-row">
                            <dl>
                                <dt>HP :</dt>
                                <dd><h3>{character?.health}</h3></dd>
                            </dl>
                        </div>
                    </section>
                    <section className="column">
                        <h2>Informations :</h2>
                        <div className="flex-wrap-row">
                            <dl>
                                <dt>Nom :</dt>
                                <dd><h3>{character?.lastname}</h3></dd>
                            </dl>
                            <dl>
                                <dt>Prénom :</dt>
                                <dd><h3>{character?.firstname}</h3></dd>
                            </dl>
                            <dl>
                                <dt>Joueur :</dt>
                                <dd><h3>{character?.User ? <span>{character?.User.firstname}</span> : <span>MJ ou libre</span>}</h3></dd>
                            </dl>
                        </div>
                    </section>
                    <section className="column">
                        <h2>Description :</h2>
                        <p>A venir</p>
                    </section>
                    <section className="column">
                        <h2>Historique de combat :</h2>
                        <p>A venir</p>
                    </section>
                </div>
            </div>
        </>
    );
}

export default CharacterDetailPage;
