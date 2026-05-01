import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { useAuth } from "./hooks/useAuth"

import Home from "./pages/public/Home/Home"
import About from "./pages/public/About/About"
import Contact from "./pages/public/Contact/Contact"
import PolitiqueConfidentialite from "./pages/public/PolitiqueConfidentialite/PolitiqueConfidentialite"
import Login from "./pages/public/Auth/Login"
import Signup from "./pages/public/Auth/Signup"

import PlateformeLayout from "./components/plateforme/PlateformeLayout"

import DashboardEtHome from "./pages/plateforme/etudiant/DashboardEtHome"
import Cours from "./pages/plateforme/etudiant/Cours"
import Progression from "./pages/plateforme/etudiant/Progression"
import Certificats from "./pages/plateforme/etudiant/Certificats"

import DashboardEnsHome from "./pages/plateforme/enseignant/DashboardEnsHome"
import DashboardEnsCours from "./pages/plateforme/enseignant/DashboardEnsCours"
import DashboardEnsCreate from "./pages/plateforme/enseignant/DashboardEnsCreate"
import DashboardEnsStats from "./pages/plateforme/enseignant/DashboardEnsStats"

import Parametres from "./pages/plateforme/parametres/Parametres"
import NotFound from "./pages/shared/NotFound"

const PlateformeDefault = () => {
  const { role, loading } = useAuth()

  if (loading) {
    return <div>Chargement...</div>
  }

  if (role === "enseignant") {
    return <Navigate to="enseignant" replace />
  }

  return <DashboardEtHome />
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/apropos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
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

            {/* ÉTUDIANT / REDIRECTION */}
            <Route
              index
              element={
                <ProtectedRoute allowedRole={null}>
                  <PlateformeDefault />
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
            <Route
              path="parametres"
              element={<Parametres />}
            />

          </Route>

          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App