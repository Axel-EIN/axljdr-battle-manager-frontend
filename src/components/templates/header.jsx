import { Link } from 'react-router-dom';

function header() {
  return (
    <>
      <h2>Ceci est l'en-tête</h2>
      <Link to="/">Accueil</Link>
      <Link to="/connexion">Se connecter</Link>
    </>
  )
}

export default header;