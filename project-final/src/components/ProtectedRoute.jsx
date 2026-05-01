import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { role, loading } = useAuth()

  if (loading) {
    return <div>Chargement...</div>
  }

  if (!role) {
    return <Navigate to="/connexion" replace />
  }

  // Si allowedRole est null, la route est accessible à n'importe quel rôle authentifié
  if (allowedRole !== null && role !== allowedRole) {
    // Rediriger vers le dashboard approprié si le rôle ne correspond pas
    return <Navigate to={role === "etudiant" ? "/plateforme" : "/plateforme/enseignant"} replace />
  }

  return children
}
