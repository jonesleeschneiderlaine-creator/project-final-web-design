import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardEnseignant.css';

const DashboardEnseignant = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <h2>🇭🇹 EduHaïti</h2>
          <span className="user-role">Enseignant</span>
        </div>
        
        <nav className="menu">
          <ul>
            <li className="active">
              <Link to="/dashboard-enseignant">
                <span className="menu-icon">📊</span>
                <span>Tableau de bord</span>
              </Link>
            </li>
            <li>
              <Link to="/profil">
                <span className="menu-icon">👤</span>
                <span>Profil</span>
              </Link>
            </li>
            <li>
              <Link to="/mes-etudiants">
                <span className="menu-icon">👥</span>
                <span>Mes étudiants</span>
              </Link>
            </li>
            <li>
              <Link to="/statistiques">
                <span className="menu-icon">📈</span>
                <span>Statistiques</span>
              </Link>
            </li>
            <li>
              <Link to="/parametres">
                <span className="menu-icon">⚙️</span>
                <span>Paramètres</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/">
            <button className="logout-btn">🚪 Déconnexion</button>
          </Link>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h1>Tableau de bord Enseignant</h1>
          <div className="header-right">
            <span className="date">
              📅 {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <div className="avatar">👩‍🏫</div>
          </div>
        </header>

        <section className="section">
          <div className="section-header">
            <h2>📖 Mes cours</h2>
            <button className="btn-add">+ Ajouter un cours</button>
          </div>
          
          <div className="courses-grid">
            <div className="course-card">
              <div className="course-icon">📐</div>
              <h3>Mathématiques Avancées</h3>
              <p>12 étudiants • 8 modules</p>
              <span className="course-badge">Actif</span>
            </div>
            <div className="course-card">
              <div className="course-icon">🔬</div>
              <h3>Sciences Naturelles</h3>
              <p>8 étudiants • 6 modules</p>
              <span className="course-badge">Actif</span>
            </div>
            <div className="course-card">
              <div className="course-icon">📖</div>
              <h3>Français</h3>
              <p>15 étudiants • 5 modules</p>
              <span className="course-badge">Actif</span>
            </div>
            <div className="course-card">
              <div className="course-icon">🏛️</div>
              <h3>Histoire d'Haïti</h3>
              <p>10 étudiants • 7 modules</p>
              <span className="course-badge">Actif</span>
            </div>
          </div>
        </section>

        <div className="two-columns">
          <section className="section recent-articles">
            <h2>📰 Articles récents</h2>
            <ul className="articles-list">
              <li><input type="checkbox" id="art1" /><label htmlFor="art1">École de la culture des arts visuels</label></li>
              <li><input type="checkbox" id="art2" /><label htmlFor="art2">Musée Culturel et Artistique à Jérusalem</label></li>
              <li><input type="checkbox" id="art3" /><label htmlFor="art3">Centres de Formation</label></li>
              <li><input type="checkbox" id="art4" /><label htmlFor="art4">Bibliothèque des Arts Visuels</label></li>
            </ul>
            <button className="btn-secondary">Voir tous les articles →</button>
          </section>

          <section className="section top-students">
            <h2>🏆 Top étudiants cette semaine</h2>
            <div className="students-ranking">
              <div className="student-item rank-1"><span className="rank">1</span><span className="student-name">Jean Paul Marsan</span><span className="points">⭐ 1250 pts</span></div>
              <div className="student-item rank-2"><span className="rank">2</span><span className="student-name">Marie-Louise</span><span className="points">⭐ 1180 pts</span></div>
              <div className="student-item rank-3"><span className="rank">3</span><span className="student-name">Claude Fils</span><span className="points">⭐ 1090 pts</span></div>
              <div className="student-item rank-4"><span className="rank">4</span><span className="student-name">Roseline Govaill</span><span className="points">⭐ 980 pts</span></div>
            </div>
            <button className="btn-secondary">Voir classement complet →</button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardEnseignant;