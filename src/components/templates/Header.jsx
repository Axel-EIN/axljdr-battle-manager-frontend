import { useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ContexteUser } from "../../contexts/contexteUser.jsx";
import { FaScroll } from "react-icons/fa6";
import { FaScrewdriverWrench } from "react-icons/fa6";
import './Header.css';

function Header() {
    const { user, logoutUser } = useContext(ContexteUser); // Récupération utilisateur et fonction logout via destructuration du contexte utilisateur
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {}, [user]);

    const handleLogout = () => {
        logoutUser();
        navigate("/"); // Redirection à l'accueil
    };

    return (
        <header>
            {user && user.role == 'admin' &&
                <div className="topbar admin">
                    <Link to="/admin" className="icon-text-link">
                        <FaScrewdriverWrench />Panneau d'Administration
                    </Link>
                </div>
            }
            {user && user.role == 'gamemaster' &&
                <div className="topbar gamemaster">
                    <Link to="/mj" className="icon-text-link">
                        <FaScroll />Panneau du Maître du Jeu
                    </Link>
                </div>
            }
            <div className="navbar">
                <div className="navbar-container">
                    <div className="logo">
                        <Link to="/">
                            <img src="/logo-axljdrbattle.png" alt="Logo AXL JDR Battle" />
                        </Link>
                    </div>
                    <ul className="navbar-menu">
                        <li className="navbar-menu-item">
                            <Link className={location.pathname === '/' ? 'navbar-menu-link active' : 'navbar-menu-link'} to="/">Accueil</Link>
                        </li>
                        <li className="navbar-menu-item">
                            <Link className="navbar-menu-link" to="/personnages">Personnages</Link>
                        </li>
                        <li className="navbar-menu-item">
                            <Link className="navbar-menu-link" to="/combats">Combats</Link>
                        </li>
                    </ul>
                    <div className="navbar-user">
                        {user ? (
                            <div className="logged">
                                <div>Bienvenue <strong>{user.firstname}</strong> !</div>
                                <Link to="/mon-compte">Mon compte</Link>
                                <button onClick={handleLogout}>Se deconnecter</button>
                            </div>
                        ) : (
                        <div className="notlogged">
                                <Link to="/connexion">
                                    <button className="btn-primary btn-medium">Se connecter</button>
                                </Link>
                                <Link to="/inscription">S'inscrire</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
