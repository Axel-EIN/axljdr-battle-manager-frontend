import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Template from "./components/templates/Template.jsx";
import TemplateConnecte from "./components/templates/TemplateConnecte.jsx";
import TemplatePasConnecte from "./components/templates/TemplatePasConnecte.jsx";
import PageAccueil from "./pages/PageAccueil.jsx";
import PageConnexion from "./pages/PageConnexion.jsx";
import PageInscription from "./pages/PageInscription.jsx";
import PageMonCompte from "./pages/PageMonCompte.jsx";

function App() {
  // Définition des Routes
  return (
    <>
      <Routes>

        <Route path="/">

          <Route path="/" element={<Template />} >
            <Route index element={<PageAccueil />} />
          </Route>

          <Route element={<TemplatePasConnecte />} >
            <Route path="/connexion" element={<PageConnexion />} />
            <Route path="/inscription" element={<PageInscription />} />
          </Route>

          <Route element={<TemplateConnecte />} >
            <Route path="/mon-compte" element={<PageMonCompte />} />
          </Route>

        </Route>

        <Route path="*" element={<Navigate to="/"/>}/>

      </Routes>
    </>
  );
}

export default App;
