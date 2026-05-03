import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/public/Home/Home'
import DashboardEns from './pages/plateforme/Dashboard/Enseignant/DashboardEns'
import PlateformeLayout from './components/plateforme/PlateformeLayout'
import DashboardEt from './pages/plateforme/Dashboard/Etudiant/DashboardEt';
import Parametres from './pages/plateforme/Parametres/Parametres'
import RootLayout from './layouts/RootLayout';
import NotFound from './pages/shared/NotFound';
import APropos from './pages/public/APropos/APropos';
import PolitiqueConfidentialite from './pages/public/PolitiqueConfidentialite/PolitiqueConfidentialite';
import Contact from './pages/public/Contact/Contact';
import Cours from './pages/plateforme/Cours/Cours';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<RootLayout/>}>

          {/* PUBLIC */}
          <Route index element={<Home/>} />
          <Route path="apropos" element={<APropos/>} />
          <Route path="contact" element={<Contact/>} />
          <Route path="politique-confidentialite" element={<PolitiqueConfidentialite/>} />
          
      
          {/* NOT FOUND */}
          <Route path="*" element={<NotFound/>} />
          
        </Route>

          {/* PLATEFORME */}

          <Route path="/plateforme" element={<PlateformeLayout/>}>
            <Route index element={<DashboardEt/>} />
            <Route path="enseignant" element={<DashboardEns/>} />
            <Route path="parametres" element={<Parametres/>} />
            <Route path="cours" element={<Cours/>} />
          </Route>
          
      </Routes>
    </BrowserRouter>
  )
}



export default App;