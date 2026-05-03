import React from 'react';
import { Link } from 'react-router-dom';
import './apropos.css';

const APropos = () => {
  return (
    <div className="apropos-container">
      

      <section className="banner">
        <h1>🇭🇹 À propos d'EduHaïti</h1>
        <p>Notre mission, notre histoire et nos valeurs</p>
      </section>

      <section className="mission">
        <div className="mission-text">
          <h2>Notre mission</h2>
          <p>EduHaïti est né d'une conviction : <strong>l'éducation est la clé du développement d'Haïti</strong>. Notre plateforme vise à rendre l'apprentissage accessible à tous les Haïtiens, où qu'ils se trouvent.</p>
          <p>Nous proposons des cours de qualité, créés par des enseignants haïtiens, pour des apprenants haïtiens. Chaque cours est adapté au programme national et aux réalités du pays.</p>
        </div>
        <div className="mission-img">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop" alt="Mission EduHaïti" />
        </div>
      </section>

      <section className="values">
        <h2>Nos valeurs</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🎓</div>
            <h3>Accessibilité</h3>
            <p>Des cours gratuits et payants pour tous les budgets</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Communauté</h3>
            <p>Une plateforme collaborative entre élèves et professeurs</p>
          </div>
          <div className="value-card">
            <div className="value-icon">📱</div>
            <h3>Innovation</h3>
            <p>Des outils modernes pour un apprentissage efficace</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🏆</div>
            <h3>Excellence</h3>
            <p>Des contenus de qualité certifiés par des experts</p>
          </div>
        </div>
      </section>

      <section className="team">
        <h2>Notre équipe</h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-img"></div>
            <h3>Jean-Pierre Dupont</h3>
            <p>Fondateur & CEO</p>
          </div>
          <div className="team-card">
            <div className="team-img2"></div>
            <h3>Marie-Claire Joseph</h3>
            <p>Directrice pédagogique</p>
          </div>
          <div className="team-card">
            <div className="team-img3"></div>
            <h3>Paul André</h3>
            <p>Responsable technique</p>
          </div>
          <div className="team-card">
            <div className="team-img4"></div>
            <h3>Sophie Baptiste</h3>
            <p>Coordinatrice des cours</p>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default APropos;