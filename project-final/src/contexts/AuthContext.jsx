import { useState } from "react"
import { AuthContext } from "./authContext"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("auth_user")
    return saved ? JSON.parse(saved) : null
  })

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