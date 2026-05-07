import React from 'react';
import { FaGraduationCap, FaHandshake, FaMobileAlt, FaTrophy, FaUserTie, FaChalkboardTeacher, FaLaptopCode, FaUsers } from 'react-icons/fa';
import { GiWorld } from 'react-icons/gi';
import './aPropos.css';

const APropos = () => {
  return (
    <div className="apropos-container">

      <section className="banner">
        <h1> À propos d'EduHaïti</h1>
        <p>Notre mission, notre histoire et nos valeurs</p>
      </section>


      <section className="mission">
        <div className="mission-text">
          <h2><GiWorld className="section-icon" /> Notre mission</h2>
          <p>EduHaïti est né d'une conviction : <strong>l'éducation est la clé du développement d'Haïti</strong>. Notre plateforme vise à rendre l'apprentissage accessible à tous les Haïtiens, où qu'ils se trouvent.</p>
          <p>Nous proposons des cours de qualité, créés par des enseignants haïtiens, pour des apprenants haïtiens. Chaque cours est adapté au programme national et aux réalités du pays.</p>
        </div>
        <div className="mission-img">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop" alt="Étudiants haïtiens apprenant ensemble" />
        </div>
      </section>

      
      <section className="values">
        <h2>Nos valeurs</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <FaGraduationCap />
            </div>
            <h3>Accessibilité</h3>
            <p>Des cours gratuits et payants pour tous les budgets</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <FaHandshake />
            </div>
            <h3>Communauté</h3>
            <p>Une plateforme collaborative entre élèves et professeurs</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <FaMobileAlt />
            </div>
            <h3>Innovation</h3>
            <p>Des outils modernes pour un apprentissage efficace</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <FaTrophy />
            </div>
            <h3>Excellence</h3>
            <p>Des contenus de qualité certifiés par des experts</p>
          </div>
        </div>
      </section>

      {/* Team section - the people making this happen */}
      <section className="team">
        <h2><FaUsers className="section-icon" /> Notre équipe</h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-img"></div>
            <h3><FaUserTie className="team-icon" /> Jean-Pierre Dupont</h3>
            <p>Fondateur & CEO</p>
          </div>
          <div className="team-card">
            <div className="team-img2"></div>
            <h3><FaChalkboardTeacher className="team-icon" /> Marie-Claire Joseph</h3>
            <p>Directrice pédagogique</p>
          </div>
          <div className="team-card">
            <div className="team-img3"></div>
            <h3><FaLaptopCode className="team-icon" /> Paul André</h3>
            <p>Responsable technique</p>
          </div>
          <div className="team-card">
            <div className="team-img4"></div>
            <h3><FaUsers className="team-icon" /> Sophie Baptiste</h3>
            <p>Coordinatrice des cours</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APropos;