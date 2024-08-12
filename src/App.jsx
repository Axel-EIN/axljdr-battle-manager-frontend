import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Template from "./components/templates/Template.jsx";
import TemplateConnecte from "./components/templates/TemplateConnecte.jsx";
import TemplatePasConnecte from "./components/templates/TemplatePasConnecte.jsx";
import TemplateMJ from "./components/templates/TemplateMJ.jsx";
import TemplateAdmin from "./components/templates/TemplateAdmin.jsx";
import PageAccueil from "./pages/PageAccueil.jsx";
import PageConnexion from "./pages/PageConnexion.jsx";
import PageInscription from "./pages/PageInscription.jsx";
import PageMonCompte from "./pages/PageMonCompte.jsx";
import PageAdmin from "./pages/admin/PageAdmin.jsx";
import PageUtilisateurCreer from "./pages/admin/PageUtilisateurCreer.jsx";
import PageUtilisateurModifier from "./pages/admin/PageUtilisateurModifier.jsx";
import PagePersonnageCreer from "./pages/mj/PagePersonnageCreer.jsx";
import PagePersonnageModifier from "./pages/mj/PagePersonnageModifier.jsx";
import PageCombatCreer from "./pages/mj/PageCombatCreer.jsx";
import PageCombatModifier from "./pages/mj/PageCombatModifier.jsx";
import PageMj from "./pages/mj/PageMj.jsx";

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

          <Route element={<TemplateMJ />} >
            <Route path="/mj" element={<PageMj />} />
            <Route path="/mj/personnage/creer" element={<PagePersonnageCreer />} />
            <Route path="/mj/personnage/modifier/:personnageID" element={<PagePersonnageModifier />} />
            <Route path="/mj/combat/creer" element={<PageCombatCreer />} />
            <Route path="/mj/combat/modifier/:combatID" element={<PageCombatModifier />} />
          </Route>

          <Route element={<TemplateAdmin />} >
            <Route path="/admin" element={<PageAdmin />} />
            <Route path="/admin/utilisateur/creer" element={<PageUtilisateurCreer />} />
            <Route path="/admin/utilisateur/modifier/:utilisateurID" element={<PageUtilisateurModifier />} />
          </Route>

        </Route>

        <Route path="*" element={<Navigate to="/"/>}/>

      </Routes>
    </>
  );
}

export default App;
