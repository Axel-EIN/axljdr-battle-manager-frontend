import './App.css';
import { Route, Routes } from 'react-router-dom';
import Template from './components/templates/template.jsx';
import Accueil from './pages/accueil.jsx';
import Profil from './pages/profil.jsx';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<Accueil />} />
        <Route path="/profil" element={<Profil />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
