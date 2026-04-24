import { Outlet } from "react-router-dom"
import "./plateformeLayout.css"

const PlateformeLayout = () => {
  return (
    <div>
        <h1>Plateforme Layout</h1>
        <main>
          <Outlet />
        </main>
    </div>
  )
}

export default PlateformeLayout
