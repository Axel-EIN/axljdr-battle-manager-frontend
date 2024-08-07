import './App.css';
import { Route, Routes } from 'react-router-dom';
import Template from './components/templates/Template.jsx';
import PageAccueil from './pages/PageAccueil.jsx';
import PageConnexion from './pages/PageConnexion.jsx';
import PageInscription from './pages/PageInscription.jsx';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Template />}>
<Route index element={<PageAccueil />} />
        <Route path="/connexion" element={<PageConnexion />} />
        <Route path="/inscription" element={<PageInscription />} />
      </Route>
    </Routes>
    </>
  )
}

export default App;