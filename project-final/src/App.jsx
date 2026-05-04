// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { ProtectedRoute } from './utils/ProtectedRoute';

import Home from './pages/public/Home/Home';
import DashboardEns from './pages/plateforme/Dashboard/Enseignant/DashboardEns';
import PlateformeLayout from './components/plateforme/PlateformeLayout';
import DashboardEt from './pages/plateforme/Dashboard/Etudiant/DashboardEt';
import Parametres from './pages/plateforme/Parametres/Parametres';
import RootLayout from './layouts/RootLayout';
import NotFound from './pages/shared/NotFound';
import APropos from './pages/public/APropos/APropos';
import PolitiqueConfidentialite from './pages/public/PolitiqueConfidentialite/PolitiqueConfidentialite';
import Contact from './pages/public/Contact/Contact';
import Cours from './pages/plateforme/Cours/Cours';
import Auth from './pages/plateforme/Auth/Auth';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          {/* PUBLIC ROUTES - with RootLayout */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="apropos" element={<APropos />} />
            <Route path="contact" element={<Contact />} />
            <Route path="politique-confidentialite" element={<PolitiqueConfidentialite />} />
          </Route>

          {/* AUTH ROUTE - No layout needed */}
          <Route path="/connexion" element={<Auth />} />
          <Route path="/inscription" element={<Auth defaultMode="signup" />} />

          {/* PLATEFORME ROUTES - Protected */}
          <Route 
            path="/plateforme" 
            element={
              <ProtectedRoute>
                <PlateformeLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardEt />} />
            <Route path="enseignant" element={<DashboardEns />} />
            <Route path="parametres" element={<Parametres />} />
            <Route path="cours" element={<Cours />} />
          </Route>

          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;