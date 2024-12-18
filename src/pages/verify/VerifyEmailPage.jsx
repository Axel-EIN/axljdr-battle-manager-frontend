import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { URLS } from './../../constants/urls';

function VerifyEmailPage() {
    const { token } = useParams();
    const [ message, setMessage ] = useState('');

    const updateIsVerify = async () => {
        try {
            const { data } = await axios.put(URLS.VERIFY_EMAIL + '/' + token);
            setMessage(data.message);
        } catch({response}) {
            const { message } = response.data;
            setMessage(message);
        };
    }

    useEffect(() => {
        updateIsVerify();
    }, []);

    return (
        <>
            <div>Page de Vérification du Mail</div>
            {message ? (
                <Link to="/connexion"><h3>MERCI ! Votre E-mail a été vérifié, vous pouvez vous connecter !</h3></Link>
            ) : (
                <>
                    <h3>Désolé mais votre Token est invalide !</h3>
                    <Link to="/accueil">Retour à l'accueil</Link>
                </>
            )}
        </>
    )
}

export default VerifyEmailPage;
