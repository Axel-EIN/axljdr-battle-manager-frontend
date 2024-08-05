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

  console.log("header composant variable utilisateur :", utilisateur);

  return (
    <headerbar>
      {utilisateur && utilisateur.role == 'admin' &&
        (
          <adminbar><Link to="/admin">Panneau d'Administration</Link></adminbar>
        )
      }
      {utilisateur && utilisateur.role == 'mj' &&
        (
          <mjbar><Link to="/mj">Panneau du Maître du Jeu</Link></mjbar>
        )
      }
      <navbar>
        <logo>
          <img src="logo-axljdrbattle.png" alt="Logo AXL JDR Battle" />
        </logo>
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
          </ul>
        </nav>
        <userzone>
          {utilisateur ? (
            <logged>
              <div>Bienvenue <strong>{utilisateur.prenom}</strong> !</div>
              <Link to="/mon-compte">Mon compte</Link>
              <button onClick={gererDeconnexion}>Se deconnecter</button>
            </logged>
          ) : (
            <notlogged>
              <Link to="/connexion">
                <button>Se connecter</button>
              </Link>
              <Link to="/inscription">S'inscrire</Link>
            </notlogged>
          )}
        </userzone>
      </navbar>
    </headerbar>
  );
}

export default Header;