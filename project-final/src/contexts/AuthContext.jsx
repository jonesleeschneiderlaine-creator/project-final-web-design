import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  // Charger le rôle depuis localStorage au démarrage
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole")
    if (savedRole) {
      setRole(savedRole)
      setUser({ role: savedRole })
    }
    setLoading(false)
  }, [])

  const login = (userRole) => {
    setRole(userRole)
    setUser({ role: userRole })
    localStorage.setItem("userRole", userRole)
  }

  const logout = () => {
    setRole(null)
    setUser(null)
    localStorage.removeItem("userRole")
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
