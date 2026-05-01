import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

const PlateformeLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  )
}

export default PlateformeLayout