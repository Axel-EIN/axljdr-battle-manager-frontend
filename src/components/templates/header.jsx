import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ContexteUtilisateur } from "../../contexts/contexteUtilisateur";
import './header.css';

function Header() {
  // Récupération de l'utilisateur et de la fonction pour deconnecter via destructuration du contexte utilisateur
  const { utilisateur, deconnecterUtilisateur } =
    useContext(ContexteUtilisateur);
  const navigate = useNavigate();

  useEffect(() => {}, [utilisateur]);

  const gererDeconnexion = () => {
    deconnecterUtilisateur();
    navigate("/"); // Redirection à l'accueil
  };

  return (
    <header>
      {utilisateur && utilisateur.role == 'admin' &&
        (
          <div id="adminbar"><Link to="/admin">Panneau d'Administration</Link></div>
        )
      }
      {utilisateur && utilisateur.role == 'mj' &&
        (
          <div id="mjbar"><Link to="/mj">Panneau du Maître du Jeu</Link></div>
        )
      }
      <div id="navbar">
        <div id="logo">
          <img src="/logo-axljdrbattle.png" alt="Logo AXL JDR Battle" />
        </div>
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
          </ul>
        </nav>
        <div id="userzone">
          {utilisateur ? (
            <div className="logged">
              <div>Bienvenue <strong>{utilisateur.prenom}</strong> !</div>
              <Link to="/mon-compte">Mon compte</Link>
              <button onClick={gererDeconnexion}>Se deconnecter</button>
            </div>
          ) : (
            <div className="notlogged">
              <Link to="/connexion">
                <button>Se connecter</button>
              </Link>
              <Link to="/inscription">S'inscrire</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;