import { Outlet } from "react-router-dom"

const DashboardEt = () => {
  return (
    <div>
      <h1>Dashboard Étudiant</h1>

      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardEt