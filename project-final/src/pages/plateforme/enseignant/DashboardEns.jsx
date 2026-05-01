import { Outlet } from "react-router-dom"
import "./dashboardEns.css"

const DashboardEns = () => {
  return (
    <div className="dashboard-enseignant-layout">
      <Outlet />
    </div>
  )
}

export default DashboardEns
