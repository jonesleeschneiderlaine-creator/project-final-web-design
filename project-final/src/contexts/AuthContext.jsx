import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem("auth_user")
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const login = (data) => {
    setUser(data)
    localStorage.setItem("auth_user", JSON.stringify(data))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_user")
  }

  return (
    <AuthContext.Provider value={{ user, role: user?.role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)