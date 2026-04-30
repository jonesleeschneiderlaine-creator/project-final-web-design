import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/public/Home/Home"
import About from "./pages/public/About/About"

import PlateformeLayout from "./components/plateforme/PlateformeLayout"

// Étudiant
import DashboardEt from "./pages/plateforme/Dashboard/Etudiant/DashboardEt"

// Enseignant
import DashboardEns from "./pages/plateforme/Dashboard/Enseignant/DashboardEns"

// Pages simples (mock ou à compléter)
import Parametres from "./pages/plateforme/Parametres/Parametres"

import NotFound from "./pages/shared/NotFound"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/apropos" element={<About />} />

        {/* PLATEFORME */}
        <Route path="/plateforme" element={<PlateformeLayout />}>

          {/* ETUDIANT */}
          <Route index element={<DashboardEt />} />
          <Route path="cours" element={<DashboardEt />} />
          <Route path="progression" element={<DashboardEt />} />
          <Route path="certificats" element={<DashboardEt />} />
          <Route path="parametres" element={<Parametres />} />

          {/* ENSEIGNANT */}
          <Route path="enseignant" element={<DashboardEns />} />
          <Route path="enseignant/cours" element={<DashboardEns />} />
          <Route path="enseignant/create" element={<DashboardEns />} />
          <Route path="enseignant/stats" element={<DashboardEns />} />

        </Route>

        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App