import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/public/Home/Home'
import About from './pages/public/About/About'
import DashboardEns from './pages/plateforme/Dashboard/Enseignant/DashboardEns'
import PlateformeLayout from './components/plateforme/PlateformeLayout'
import DashboardEt from './pages/plateforme/Dashboard/Etudiant/DashboardEt';
import Parametres from './pages/plateforme/Parametres/Parametres'
import RootLayout from './layouts/RootLayout';
import NotFound from './pages/shared/NotFound';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<RootLayout/>}>

          {/* PUBLIC */}
          <Route index element={<Home/>} />
          <Route path="apropos" element={<About/>} />
          
          {/* PLATEFORME */}

          <Route path="/plateforme" element={<PlateformeLayout/>}>
            <Route index element={<DashboardEt/>} />
            <Route path="enseignant" element={<DashboardEns/>} />
            <Route path="parametres" element={<Parametres/>} />
          </Route>
      
          {/* NOT FOUND */}
          <Route path="*" element={<NotFound/>} />
          
        </Route>

      </Routes>
    </BrowserRouter>
  )
}



export default App;