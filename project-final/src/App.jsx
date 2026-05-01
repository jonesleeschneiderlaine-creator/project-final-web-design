import { BrowserRouter, Routes, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"

import Home from "./pages/public/Home/Home"
import About from "./pages/public/About/About"
import Login from "./pages/public/Auth/Login"
import Signup from "./pages/public/Auth/Signup"

import PlateformeLayout from "./components/plateforme/PlateformeLayout"

import DashboardEtHome from "./pages/plateforme/Dashboard/Etudiant/DashboardEtHome"
import Cours from "./pages/plateforme/Dashboard/Etudiant/Cours"
import Progression from "./pages/plateforme/Dashboard/Etudiant/Progression"
import Certificats from "./pages/plateforme/Dashboard/Etudiant/Certificats"

import DashboardEnsHome from "./pages/plateforme/Dashboard/Enseignant/DashboardEnsHome"
import DashboardEnsCours from "./pages/plateforme/Dashboard/Enseignant/DashboardEnsCours"
import DashboardEnsCreate from "./pages/plateforme/Dashboard/Enseignant/DashboardEnsCreate"
import DashboardEnsStats from "./pages/plateforme/Dashboard/Enseignant/DashboardEnsStats"

import Parametres from "./pages/plateforme/Parametres/Parametres"
import NotFound from "./pages/shared/NotFound"

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/apropos" element={<About />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Signup />} />

          {/* PLATEFORME */}
          <Route
            path="/plateforme"
            element={
              <ProtectedRoute allowedRole={null}>
                <PlateformeLayout />
              </ProtectedRoute>
            }
          >

            {/* ÉTUDIANT */}
            <Route
              index
              element={
                <ProtectedRoute allowedRole="etudiant">
                  <DashboardEtHome />
                </ProtectedRoute>
              }
            />

            <Route
              path="cours"
              element={
                <ProtectedRoute allowedRole="etudiant">
                  <Cours />
                </ProtectedRoute>
              }
            />

            <Route
              path="progression"
              element={
                <ProtectedRoute allowedRole="etudiant">
                  <Progression />
                </ProtectedRoute>
              }
            />

            <Route
              path="certificats"
              element={
                <ProtectedRoute allowedRole="etudiant">
                  <Certificats />
                </ProtectedRoute>
              }
            />

            {/* ENSEIGNANT */}
            <Route
              path="enseignant"
              element={
                <ProtectedRoute allowedRole="enseignant">
                  <DashboardEnsHome />
                </ProtectedRoute>
              }
            />

            <Route
              path="enseignant/cours"
              element={
                <ProtectedRoute allowedRole="enseignant">
                  <DashboardEnsCours />
                </ProtectedRoute>
              }
            />

            <Route
              path="enseignant/create"
              element={
                <ProtectedRoute allowedRole="enseignant">
                  <DashboardEnsCreate />
                </ProtectedRoute>
              }
            />

            <Route
              path="enseignant/stats"
              element={
                <ProtectedRoute allowedRole="enseignant">
                  <DashboardEnsStats />
                </ProtectedRoute>
              }
            />

            {/* PARAMETRES */}
            <Route path="parametres" element={<Parametres />} />

          </Route>

          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App