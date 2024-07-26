import './App.css';
import { Route, Routes } from 'react-router-dom';
import Template from './components/templates/template.jsx';
import Accueil from './pages/accueil.jsx';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<Accueil />} />
        {/* <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} /> */}
      </Route>
    </Routes>
    </>
  )
}

export default App
