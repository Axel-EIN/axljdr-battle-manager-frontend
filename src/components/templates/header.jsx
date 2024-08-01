import { useContext, useEffect } from 'react';
import { useNavigate, Link, } from 'react-router-dom';
import { ContexteUtilisateur } from '../../contexts/contexteUtilisateur';

function Header() {
  // Récupération de l'utilisateur et de la fonction pour deconnecter via destructuration du contexte utilisateur
  const { utilisateur, deconnecterUtilisateur } = useContext(ContexteUtilisateur);
  const navigate = useNavigate();

  useEffect( () => {}, [utilisateur] );

  const gererDeconnexion = () => {
    deconnecterUtilisateur();
    navigate('/'); // Redirection à l'accueil
  };

  console.log('header composant variable utilisateur :', utilisateur);

  return (
    <>
      <h2>Header</h2>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/connexion">Se connecter</Link>
        <Link to="/inscription">S'inscrire</Link>
        <Link to="/mon-compte">Mon compte</Link>
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

export default Header;