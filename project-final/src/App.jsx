import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/public/Home/Home'
import About from './pages/public/About/About'
import DashboardEns from './pages/plateforme/Dashboard/Enseignant/DashboardEns'
import PlateformeLayout from './components/plateforme/PlateformeLayout'
import DashboardEt from './pages/plateforme/Dashboard/Etudiant/DashboardEt';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/apropos" element={<About/>} />
        <Route path="/plateforme" element={<PlateformeLayout/>}>
          <Route index element={<DashboardEt/>} />
          <Route path="enseignant" element={<DashboardEns/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
