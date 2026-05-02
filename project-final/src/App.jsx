import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Cours from './Pages/Cours';
import Apropos from './Pages/Apropos';
import Contact from './Pages/Contact';
import Connexion from './Component/Connexion';
import CreateAccount from './Component/CreateAccount';
import DashboardEtudiant from './Pages/DashboardEtudiant';
import DashboardEnseignant from './Pages/DashboardEnseignant';
import VideoCours from './Pages/VideoCours';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cours" element={<Cours />} />
        <Route path="/apropos" element={<Apropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/dashboard-etudiant" element={<DashboardEtudiant />} />
        <Route path="/dashboard-enseignant" element={<DashboardEnseignant />} />
        <Route path="/video-cours/:courseId/:lessonId" element={<VideoCours />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;