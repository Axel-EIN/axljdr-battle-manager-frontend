import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ContexteUser } from "../../contexts/contexteUser.jsx";
import './Header.css';

function Header() {
  const { user, logoutUser } = useContext(ContexteUser); // Récupération utilisateur et fonction logout via destructuration du contexte utilisateur
  const navigate = useNavigate();

  useEffect(() => {}, [user]);

  const handleLogout = () => {
    logoutUser();
    navigate("/"); // Redirection à l'accueil
  };

  return (
    <header>
      {user && user.role == 'admin' && <div id="adminbar"><Link to="/admin">Panneau d'Administration</Link></div>}
      {user && user.role == 'gamemaster' && <div id="mjbar"><Link to="/mj">Panneau du Maître du Jeu</Link></div>}
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
          {user ? (
            <div className="logged">
              <div>Bienvenue <strong>{user.firstname}</strong> !</div>
              <Link to="/mon-compte">Mon compte</Link>
              <button onClick={handleLogout}>Se deconnecter</button>
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
