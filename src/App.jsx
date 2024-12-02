import './assets/styles/base.css';
import './assets/styles/colors.css';
import './assets/styles/fonts.css';
import './assets/styles/buttons.css';
import './assets/styles/cards.css';
import './assets/styles/images.css';
import './assets/styles/animations.css';
import './assets/styles/forms.css';
import './assets/styles/tables.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Template from "./components/templates/Template.jsx";
import TemplateLogged from "./components/templates/TemplateLogged.jsx";
import TemplateNotLogged from "./components/templates/TemplateNotLogged.jsx";
import TemplateGamemaster from "./components/templates/TemplateGamemaster.jsx";
import TemplateAdmin from "./components/templates/TemplateAdmin.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import MyAccountPage from "./pages/MyAccountPage.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import UserAddPage from "./pages/admin/UserAddPage.jsx";
import UserEditPage from "./pages/admin/UserEditPage.jsx";
import GameMasterPage from "./pages/gamemaster/GameMasterPage.jsx";
import CharacterAddPage from "./pages/gamemaster/CharacterAddPage.jsx";
import CharacterEditPage from "./pages/gamemaster/CharacterEditPage.jsx";
import BattleAddPage from "./pages/gamemaster/BattleAddPage.jsx";
import BattleEditPage from "./pages/gamemaster/BattleEditPage.jsx";
import BattlePage from "./pages/BattlePage.jsx";

function App() {
  return ( // Définition des Routes
    <>
      <Routes>

        <Route path="/">

          <Route path="/" element={<Template />} >
            <Route index element={<HomePage />} />
            <Route path="/combat/:combatID" element={<BattlePage />} />
          </Route>

          <Route element={<TemplateNotLogged />} >
            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/inscription" element={<RegisterPage />} />       
          </Route>

          <Route element={<TemplateLogged />} >
            <Route path="/mon-compte" element={<MyAccountPage />} />
          </Route>

          <Route element={<TemplateGamemaster />} >
            <Route path="/mj" element={<GameMasterPage />} />
            <Route path="/mj/personnage/creer" element={<CharacterAddPage />} />
            <Route path="/mj/personnage/modifier/:personnageID" element={<CharacterEditPage />} />
            <Route path="/mj/combat/creer" element={<BattleAddPage />} />
            <Route path="/mj/combat/modifier/:combatID" element={<BattleEditPage />} />
          </Route>

          <Route element={<TemplateAdmin />} >
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/utilisateur/creer" element={<UserAddPage />} />
            <Route path="/admin/utilisateur/modifier/:utilisateurID" element={<UserEditPage />} />
          </Route>

        </Route>

        <Route path="*" element={<Navigate to="/"/>}/>

      </Routes>
    </>
  );
}

export default App;
