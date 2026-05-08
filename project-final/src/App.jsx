// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { RoleBasedRedirect } from './utils/RoleBasedRedirect';

import Home from './pages/public/Home/Home';
import DashboardEns from './pages/plateforme/Dashboard/Enseignant/DashboardEns';
import PlateformeLayout from './components/plateforme/PlateformeLayout';
import DashboardEt from './pages/plateforme/Dashboard/Etudiant/DashboardEt';
import Parametres from './pages/plateforme/Parametres/Parametres';
import RootLayout from './layouts/RootLayout';
import NotFound from './pages/shared/NotFound';
import PolitiqueConfidentialite from './pages/public/PolitiqueConfidentialite/PolitiqueConfidentialite';
import Contact from './pages/public/Contact/Contact';
import Cours from './pages/plateforme/Cours/Cours';
import Auth from './pages/plateforme/Auth/Auth';
import ResetPassword from './pages/plateforme/Auth/ResetPassword';
import ForgotPassword from './pages/plateforme/Auth/ForgotPassword';
import APropos from './pages/public/APropos/APropos';
import Admin from './pages/Admin/Admin';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="apropos" element={<APropos />} />
              <Route path="contact" element={<Contact />} />
              <Route path="politique-confidentialite" element={<PolitiqueConfidentialite />} />
            </Route>

            {/* AUTH */}
            <Route path="/connexion" element={<Auth />} />
            <Route path="/inscription" element={<Auth defaultMode="signup" />} />
            <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ADMIN — protégé + rôle admin seulement */}
            <Route
              path="/admin"
              element={
                // <ProtectedRoute>
                  // <RoleBasedRedirect allowedRoles={['admin']}>
                    <Admin />
                  // </RoleBasedRedirect>
                // </ProtectedRoute>
              }
            />

            {/* PLATEFORME */}
            <Route 
              path="/plateforme" 
              element={
                <ProtectedRoute>
                  <PlateformeLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardEt />} />
              <Route 
                path="enseignant" 
                element={
                  <RoleBasedRedirect allowedRoles={['enseignant']}>
                    <DashboardEns />
                  </RoleBasedRedirect>
                } 
              />
              <Route path="parametres" element={<Parametres />} />
              <Route path="cours" element={<Cours />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;