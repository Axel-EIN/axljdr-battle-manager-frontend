import './App.css';
import { Route, Routes } from 'react-router-dom';
import PageInscription from './pages/PageInscription.jsx';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Template />}>
        <Route path="/inscription" element={<PageInscription />} />
      </Route>
    </Routes>
    </>
  )
}

export default App;