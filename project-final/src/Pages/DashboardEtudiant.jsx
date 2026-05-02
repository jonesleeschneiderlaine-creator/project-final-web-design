import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DashboardEtudiant.css';

const DashboardEtudiant = () => {
  const [activeCourseFilter, setActiveCourseFilter] = useState('all');

  // Nom de l'étudiant connecté (à remplacer par les données Supabase plus tard)
  const studentName = "Jean-Paul Moreau";

  const courses = [
    { id: 1, title: "Mathématiques Avancées", chapter: "Chapitre 4 - Algèbre linéaire", progress: 75, lessons: 12, subject: "math", cover: "math-cover" },
    { id: 2, title: "Sciences Naturelles", chapter: "Chapitre 2 - La cellule", progress: 45, lessons: 8, subject: "science", cover: "science-cover" },
    { id: 3, title: "Français", chapter: "Chapitre 5 - Littérature", progress: 90, lessons: 10, subject: "french", cover: "french-cover" },
    { id: 4, title: "Histoire d'Haïti", chapter: "Chapitre 1 - Toussaint Louverture", progress: 30, lessons: 6, subject: "history", cover: "history-cover" }
  ];

  const filteredCourses = activeCourseFilter === 'all' 
    ? courses 
    : courses.filter(c => c.subject === activeCourseFilter);

  const devoirs = [
    { id: 1, matiere: "Mathématiques", matiereIcon: "📐", matiereClass: "math", title: "Devoir Chapitre 4 - Algèbre linéaire", pubDate: "15 Avril 2026", deadline: "22 Avril 2026 - 23h59", remaining: "2 jours 5 heures", statut: "urgent", statutText: "⚠️ Délai imminent" },
    { id: 2, matiere: "Sciences", matiereIcon: "🔬", matiereClass: "science", title: "Exposé - La cellule et son fonctionnement", pubDate: "18 Avril 2026", deadline: "28 Avril 2026 - 23h59", remaining: "8 jours 2 heures", statut: "normal", statutText: "À rendre" }
  ];

  const activities = [
    { id: 1, icon: "📝", iconBg: "blue-bg", action: "Quiz terminé", title: "Mathématiques - Chapitre 3", time: "Il y a 2 heures", score: "18/20", percent: "90%", type: "score" },
    { id: 2, icon: "🎥", iconBg: "green-bg", action: "Vidéo visionnée", title: "Sciences - La cellule (Chapitre 2)", time: "Hier - 14:30", duration: "45 min", type: "duration" },
    { id: 3, icon: "📄", iconBg: "orange-bg", action: "Devoir rendu", title: "Français - Rédaction", time: "Hier - 09:15", status: "En attente de correction ⏳", type: "status" }
  ];

  return (
    <div className="etudiant-dashboard">
      {/* HEADER */}
      <header className="etudiant-header">
        <div className="logo">
          <div className="logo-icon">🇭🇹</div>
          <h2>EduHaïti</h2>
          <span className="user-badge">Étudiant</span>
        </div>
        
        <nav className="main-nav">
          <Link to="/dashboard-etudiant" className="active">🏠 Accueil</Link>
          <Link to="/cours">📚 Mes cours</Link>
          <Link to="/parametres">⚙️ Paramètres</Link>
        </nav>
        
        <div className="header-right">
          <div className="notifications-dropdown">
            <button className="notif-btn">🔔 <span className="notif-count">4</span></button>
          </div>
          <Link to="/profil" className="user-avatar">
            <span>👨‍🎓</span>
            <span className="user-name">{studentName}</span>
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="etudiant-main">
        
        {/* Bannière de bienvenue */}
        <section className="welcome-banner">
          <div className="welcome-text">
            <div className="greeting">
              <span className="wave">👋</span>
              <h1>Bonjour, {studentName.split(' ')[0]} !</h1>
            </div>
            <p>Continuez votre apprentissage, vous êtes à <strong>65%</strong> de votre objectif cette semaine.</p>
            <div className="weekly-goal">
              <div className="goal-header">
                <span>🎯 Objectif hebdomadaire</span>
                <span>6h30 / 10h</span>
              </div>
              <div className="goal-progress">
                <div className="goal-fill" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          <div className="welcome-stats">
            <div className="stat">
              <span className="stat-value">4</span>
              <span className="stat-label">Cours actifs</span>
              <span className="stat-trend up">+1</span>
            </div>
            <div className="stat">
              <span className="stat-value">12</span>
              <span className="stat-label">Heures/semaine</span>
              <span className="stat-trend up">+3</span>
            </div>
            <div className="stat">
              <span className="stat-value">3</span>
              <span className="stat-label">Certificats</span>
            </div>
            <div className="stat">
              <span className="stat-value">92%</span>
              <span className="stat-label">Moyenne</span>
              <span className="stat-trend up">+5%</span>
            </div>
          </div>
        </section>

        {/* 4 CARTES STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-icon blue">📚</div>
            <div className="stat-card-info">
              <span className="stat-card-value">8</span>
              <span className="stat-card-label">Cours inscrits</span>
            </div>
            <div className="stat-card-change up">+2 ce mois</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon green">⏱️</div>
            <div className="stat-card-info">
              <span className="stat-card-value">47</span>
              <span className="stat-card-label">Heures d'étude</span>
            </div>
            <div className="stat-card-change up">+12 cette semaine</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon orange">🏆</div>
            <div className="stat-card-info">
              <span className="stat-card-value">3</span>
              <span className="stat-card-label">Certificats</span>
            </div>
            <div className="stat-card-change">+1 ce mois</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon purple">⭐</div>
            <div className="stat-card-info">
              <span className="stat-card-value">342</span>
              <span className="stat-card-label">Points XP</span>
            </div>
            <div className="stat-card-change up">+45 cette semaine</div>
          </div>
        </div>

        {/* DISPOSITION: GAUCHE PLUS PETITE - DROITE PLUS GRANDE */}
        <div className="two-columns">
          
          {/* COLONNE DE GAUCHE - 25% (plus petite) */}
          <div className="left-column">
            
            {/* Actualités & Devoirs */}
            <div className="section actualites-section">
              <div className="section-header">
                <h2>📢 Actualités & Devoirs</h2>
                <span className="badge-new">Nouveau</span>
              </div>
              
              <div className="devoir-list">
                {devoirs.map(devoir => (
                  <div key={devoir.id} className={`devoir-card ${devoir.statut}`}>
                    <div className="devoir-header">
                      <div className={`devoir-matiere ${devoir.matiereClass}`}>
                        {devoir.matiereIcon} {devoir.matiere}
                      </div>
                      <div className={`devoir-statut ${devoir.statut}`}>{devoir.statutText}</div>
                    </div>
                    <div className="devoir-title">{devoir.title}</div>
                    <div className="devoir-date">
                      <div className="date-block">
                        <span className="date-label">📅 Date</span>
                        <span className="date-value">{devoir.pubDate}</span>
                      </div>
                      <div className="date-block deadline">
                        <span className="date-label">⏰ Délai</span>
                        <span className="date-value deadline-value">{devoir.deadline}</span>
                      </div>
                    </div>
                    <div className="devoir-actions">
                      <button className="btn-submit-work">📤 Rendre</button>
                      <button className="btn-view-details">Voir →</button>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/devoirs" className="view-all">Voir tous les devoirs →</Link>
            </div>

            {/* Activité récente */}
            <div className="section activite-section">
              <div className="section-header">
                <h2>🕐 Activité récente</h2>
              </div>
              
              <div className="activity-timeline">
                {activities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.iconBg}`}>{activity.icon}</div>
                    <div className="activity-content">
                      <strong>{activity.action}</strong>
                      <span className="activity-title">{activity.title}</span>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/activite" className="view-all">Voir toute l'activité →</Link>
            </div>
          </div>

          {/* COLONNE DE DROITE - 75% (plus grande) AVEC MES COURS */}
          <div className="right-column">
            
            <div className="section courses-section-full">
              <div className="section-header">
                <h2>📚 Mes cours en cours</h2>
                <div className="section-controls">
                  <button 
                    className={`control-btn ${activeCourseFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveCourseFilter('all')}
                  >Tous</button>
                  <button 
                    className={`control-btn ${activeCourseFilter === 'math' ? 'active' : ''}`}
                    onClick={() => setActiveCourseFilter('math')}
                  >Maths</button>
                  <button 
                    className={`control-btn ${activeCourseFilter === 'science' ? 'active' : ''}`}
                    onClick={() => setActiveCourseFilter('science')}
                  >Sciences</button>
                  <button 
                    className={`control-btn ${activeCourseFilter === 'french' ? 'active' : ''}`}
                    onClick={() => setActiveCourseFilter('french')}
                  >Français</button>
                </div>
                <Link to="/cours" className="view-all">Voir tous →</Link>
              </div>
              
              <div className="courses-grid-full">
                {filteredCourses.map(course => (
                  <div key={course.id} className="course-card-full">
                    <div className={`course-cover-full ${course.cover}`}>
                      <div className="course-progress-circle">{course.progress}%</div>
                    </div>
                    <div className="course-info-full">
                      <h3>{course.title}</h3>
                      <p>{course.chapter}</p>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <div className="course-meta">
                        <span>📖 {course.lessons} leçons</span>
                        <span>🎯 {course.progress}%</span>
                      </div>
                      <Link to={`/cours/${course.id}`}>
                        <button className="btn-continue">Continuer →</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default DashboardEtudiant ;