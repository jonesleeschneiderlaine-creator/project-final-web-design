import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar/Sidebar"
import "./plateformeLayout.css"

const PlateformeLayout = () => {
  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}

export default PlateformeLayout