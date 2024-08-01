import { useContext, useEffect } from 'react';
import { useNavigate, Link, } from 'react-router-dom';
import { ContexteUtilisateur } from '../../contexts/contexteUtilisateur';

function header() {
  const { utilisateur, deconnecterUtilisateur } = useContext(ContexteUtilisateur);
  const navigate = useNavigate();

  useEffect( () => {}, [utilisateur] );

  const gererDeconnexion = () => {
    deconnecterUtilisateur();
    navigate('/');
  };

  console.log('header composant variable utilisateur :', utilisateur);

  return (
    <>
      <h2>Ceci est l'en-tête</h2>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/connexion">Se connecter</Link>
        <Link to="/inscription">S'inscrire</Link>
      </nav>
      <br/>

      {utilisateur ? (
        <>
          Bienvenue sur AXL-JDR-BATTLE-MANAGER <strong>{utilisateur.prenom}</strong> !
          <br/>
          <button onClick={gererDeconnexion}>Se deconnecter</button>
        </>
      ) : (
        <>
          Vous n'êtes pas connecté !
        </>
      ) }
    </>
  )
}

export default header;