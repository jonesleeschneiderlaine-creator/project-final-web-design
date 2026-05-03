import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DashboardEtudiant.css';

const DashboardEtudiant = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeCourseFilter, setActiveCourseFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [quizReminders, setQuizReminders] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [shareProgress, setShareProgress] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  // Nom de l'étudiant connecté (à remplacer par les données Supabase plus tard)
  const studentName = "Jean-Paul Moreau";
  const studentFirstName = studentName.split(' ')[0];
  const studentLastName = studentName.split(' ')[1];

  const courses = [
    { id: 1, title: "Mathématiques Avancées", chapter: "Chapitre 4 - Algèbre linéaire", progress: 75, lessons: 12, subject: "math", cover: "math-bg", teacher: "Professeur Marie Pierre" },
    { id: 2, title: "Sciences Naturelles", chapter: "Chapitre 2 - La cellule", progress: 45, lessons: 8, subject: "science", cover: "science-bg", teacher: "Professeur Jean Claude" },
    { id: 3, title: "Français", chapter: "Chapitre 5 - Littérature", progress: 90, lessons: 10, subject: "french", cover: "french-bg", teacher: "Professeur Rose Delva" },
    { id: 4, title: "Histoire d'Haïti", chapter: "Chapitre 1 - Toussaint Louverture", progress: 30, lessons: 6, subject: "history", cover: "history-bg", teacher: "Professeur Paul Antoine" },
    { id: 5, title: "Anglais", chapter: "Chapitre 1 - Introduction", progress: 15, lessons: 12, subject: "english", cover: "english-bg", teacher: "Professeur Sarah James" },
    { id: 6, title: "Informatique", chapter: "Chapitre 3 - Programmation", progress: 60, lessons: 7, subject: "computer", cover: "computer-bg", teacher: "Professeur Marc Wilson" }
  ];

  const filteredCourses = activeCourseFilter === 'all' 
    ? courses 
    : courses.filter(c => c.subject === activeCourseFilter);

  const filteredFullCourses = courseFilter === 'all' 
    ? courses 
    : courses.filter(c => {
        if (courseFilter === 'ongoing') return c.progress > 0 && c.progress < 100;
        if (courseFilter === 'completed') return c.progress === 100;
        if (courseFilter === 'upcoming') return c.progress === 0;
        return true;
      });

  const devoirs = [
    { id: 1, matiere: "Mathématiques", matiereIcon: "📐", matiereClass: "math", title: "Devoir Chapitre 4 - Algèbre linéaire", pubDate: "15 Avril 2026", deadline: "22 Avril 2026 - 23h59", remaining: "2 jours 5 heures", statut: "urgent", statutText: "⚠️ Délai imminent" },
    { id: 2, matiere: "Sciences", matiereIcon: "🔬", matiereClass: "science", title: "Exposé - La cellule et son fonctionnement", pubDate: "18 Avril 2026", deadline: "28 Avril 2026 - 23h59", remaining: "8 jours 2 heures", statut: "normal", statutText: "À rendre" }
  ];

  const activities = [
    { id: 1, icon: "📝", iconBg: "blue-bg", action: "Quiz terminé", title: "Mathématiques - Chapitre 3", time: "Il y a 2 heures", score: "18/20", percent: "90%", type: "score" },
    { id: 2, icon: "🎥", iconBg: "green-bg", action: "Vidéo visionnée", title: "Sciences - La cellule (Chapitre 2)", time: "Hier - 14:30", duration: "45 min", type: "duration" },
    { id: 3, icon: "📄", iconBg: "orange-bg", action: "Devoir rendu", title: "Français - Rédaction", time: "Hier - 09:15", status: "En attente de correction ⏳", type: "status" }
  ];

  const gradesData = [
    { course: "Mathématiques Avancées", quiz1: 85, quiz2: 78, exam: 92, average: 85, status: "success", statusText: "✅ Réussi" },
    { course: "Sciences Naturelles", quiz1: 76, quiz2: 82, exam: 88, average: 82, status: "success", statusText: "✅ Réussi" },
    { course: "Français", quiz1: 94, quiz2: 91, exam: 96, average: 94, status: "success", statusText: "✅ Réussi" },
    { course: "Histoire d'Haïti", quiz1: 65, quiz2: 70, exam: 72, average: 69, status: "warning", statusText: "⚠️ En cours" },
    { course: "Anglais", quiz1: 45, quiz2: 52, exam: null, average: 48, status: "fail", statusText: "❌ À reprendre" }
  ];

  const certificates = [
    { title: "Mathématiques Avancées", date: "15 Mars 2026", icon: "📜" },
    { title: "Sciences Naturelles", date: "10 Février 2026", icon: "📜" },
    { title: "Français", date: "05 Janvier 2026", icon: "📜" }
  ];

  const overallAverage = 92;

  return (
    <div className={`etudiant-dashboard ${darkMode ? 'dark-mode' : ''}`}>
      {/* HEADER */}
      <header className="etudiant-header">
        <div className="logo">
          <div className="logo-icon">🇭🇹</div>
          <h2>EduHaïti</h2>
          <span className="user-badge">Étudiant</span>
        </div>
        
        <nav className="main-nav">
          <a href="#" onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>🏠 Dashboard</a>
          <a href="#" onClick={() => setActiveTab('courses')} className={activeTab === 'courses' ? 'active' : ''}>📚 Mes cours</a>

          {/* <a href="#" onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>👤 Profil</a> */}
          
          <a href="#" onClick={() => setActiveTab('grades')} className={activeTab === 'grades' ? 'active' : ''}>🎓 Grades</a>
          <a href="#" onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>⚙️ Paramètres</a>
        </nav>
        
        <div className="header-right">
          <div className="notifications-dropdown">
            <button className="notif-btn">🔔 <span className="notif-count">4</span></button>
          </div>
          <a href="#" onClick={() => setActiveTab('profile')} className="user-avatar">
            <span>👨‍🎓</span>
            <span className="user-name">{studentName}</span>
          </a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="etudiant-main">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <>
            {/* Bannière de bienvenue */}
            <section className="welcome-banner">
              <div className="welcome-text">
                <div className="greeting">
                  <span className="wave">👋</span>
                  <h1>Bonjour, {studentFirstName} !</h1>
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
                <div className="stat"><span className="stat-value">8</span><span className="stat-label">Cours inscrits</span><span className="stat-trend up">+2</span></div>
                <div className="stat"><span className="stat-value">47</span><span className="stat-label">Heures d'étude</span><span className="stat-trend up">+12</span></div>
                <div className="stat"><span className="stat-value">342</span><span className="stat-label">Points XP</span><span className="stat-trend up">+45</span></div>
              </div>
            </section>

            {/* DISPOSITION: GAUCHE + DROITE */}
            <div className="two-columns">
              {/* COLONNE DE GAUCHE */}
              <div className="left-column">
                <div className="section actualites-section">
                  <div className="section-header"><h2>📢 Actualités & Devoirs</h2><span className="badge-new">Nouveau</span></div>
                  <div className="devoir-list">
                    {devoirs.map(devoir => (
                      <div key={devoir.id} className={`devoir-card ${devoir.statut}`}>
                        <div className="devoir-header">
                          <div className={`devoir-matiere ${devoir.matiereClass}`}>{devoir.matiereIcon} {devoir.matiere}</div>
                          <div className={`devoir-statut ${devoir.statut}`}>{devoir.statutText}</div>
                        </div>
                        <div className="devoir-title">{devoir.title}</div>
                        <div className="devoir-date">
                          <div className="date-block"><span className="date-label">📅 Date</span><span className="date-value">{devoir.pubDate}</span></div>
                          <div className="date-block deadline"><span className="date-label">⏰ Délai</span><span className="date-value deadline-value">{devoir.deadline}</span></div>
                        </div>
                        <div className="devoir-actions">
                          <button className="btn-submit-work">📤 Rendre</button>
                          <button className="btn-view-details">Voir →</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a href="#" className="view-all">Voir tous les devoirs →</a>
                </div>

                <div className="section activite-section">
                  <div className="section-header"><h2>🕐 Activité récente</h2></div>
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
                  <a href="#" className="view-all">Voir toute l'activité →</a>
                </div>
              </div>

              {/* COLONNE DE DROITE - MES COURS */}
              <div className="right-column">
                <div className="section courses-section-full">
                  <div className="section-header">
                    <h2>📚 Mes cours en cours</h2>
                    <div className="section-controls">
                      <button className={`control-btn ${activeCourseFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveCourseFilter('all')}>Tous</button>
                      <button className={`control-btn ${activeCourseFilter === 'math' ? 'active' : ''}`} onClick={() => setActiveCourseFilter('math')}>Maths</button>
                      <button className={`control-btn ${activeCourseFilter === 'science' ? 'active' : ''}`} onClick={() => setActiveCourseFilter('science')}>Sciences</button>
                      <button className={`control-btn ${activeCourseFilter === 'french' ? 'active' : ''}`} onClick={() => setActiveCourseFilter('french')}>Français</button>
                    </div>
                    <a href="#" onClick={() => setActiveTab('courses')} className="view-all">Voir tous →</a>
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
                          <div className="progress-bar"><div className="progress-fill" style={{ width: `${course.progress}%` }}></div></div>
                          <div className="course-meta"><span>📖 {course.lessons} leçons</span><span>🎯 {course.progress}%</span></div>
                          <Link to={`/video-cours/${course.id}/1.3`}>
                            <button className="btn-continue">Continuer →</button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* MES COURS TAB */}
        {activeTab === 'courses' && (
          <>
            <h1>📚 Mes cours</h1>
            <div className="filters">
              <button className={`filter-btn ${courseFilter === 'all' ? 'active' : ''}`} onClick={() => setCourseFilter('all')}>Tous</button>
              <button className={`filter-btn ${courseFilter === 'ongoing' ? 'active' : ''}`} onClick={() => setCourseFilter('ongoing')}>En cours</button>
              <button className={`filter-btn ${courseFilter === 'completed' ? 'active' : ''}`} onClick={() => setCourseFilter('completed')}>Terminés</button>
              <button className={`filter-btn ${courseFilter === 'upcoming' ? 'active' : ''}`} onClick={() => setCourseFilter('upcoming')}>À venir</button>
            </div>
            <div className="courses-full-grid">
              {filteredFullCourses.map(course => (
                <div key={course.id} className="course-full-card">
                  <div className={`course-image ${course.cover}`}></div>
                  <div className="course-details">
                    <h3>{course.title}</h3>
                    <p className="course-teacher">👩‍🏫 {course.teacher}</p>
                    <div className="course-stats"><span>📊 {course.progress}% complété</span><span>🎯 Chapitre {Math.ceil(course.lessons * course.progress / 100)}/{course.lessons}</span></div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${course.progress}%` }}></div></div>
                    <div className="course-actions">
                      <Link to={`/video-cours/${course.id}/1.3`}>
                        <button className="btn-primary">Continuer</button>
                      </Link>
                      <Link to={`/cours/${course.id}`}>
                        <button className="btn-secondary">Détails</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PROFIL TAB */}
        {activeTab === 'profile' && (
          <div className="profile-container">
            <div className="profile-header-card">
              <div className="profile-cover"></div>
              <div className="profile-info">
                <div className="profile-avatar-large">👨‍🎓</div>
                <h1>{studentName}</h1>
                <p className="profile-email">jeanpaul.moreau@eduhaiti.com</p>
                <div className="profile-badges">
                  <span className="badge">📅 Membre depuis Janvier 2025</span>
                  <span className="badge">🎓 342 points</span>
                  <span className="badge">⭐ Niveau 4</span>
                </div>
              </div>
            </div>

            <div className="profile-stats-grid">
              <div className="stat-card"><span className="stat-number">6</span><span className="stat-label">Cours suivis</span></div>
              <div className="stat-card"><span className="stat-number">68</span><span className="stat-label">Heures d'étude</span></div>
              <div className="stat-card"><span className="stat-number">3</span><span className="stat-label">Certificats</span></div>
              <div className="stat-card"><span className="stat-number">92%</span><span className="stat-label">Moyenne générale</span></div>
            </div>

            <div className="profile-section">
              <h2>📋 Informations personnelles</h2>
              <div className="form-row"><div className="form-group"><label>Nom complet</label><input type="text" defaultValue={studentName} /></div><div className="form-group"><label>Date de naissance</label><input type="date" defaultValue="2005-03-15" /></div></div>
              <div className="form-row"><div className="form-group"><label>Email</label><input type="email" defaultValue="jeanpaul.moreau@eduhaiti.com" /></div><div className="form-group"><label>Téléphone</label><input type="tel" defaultValue="+509 1234 5678" /></div></div>
              <div className="form-group"><label>Adresse</label><input type="text" defaultValue="Port-au-Prince, Haïti" /></div>
              <button className="btn-primary">💾 Mettre à jour</button>
            </div>

            <div className="profile-section">
              <h2>🎯 Centres d'intérêt</h2>
              <div className="interests-list">
                <span className="interest-tag">Mathématiques</span>
                <span className="interest-tag">Sciences</span>
                <span className="interest-tag">Programmation</span>
                <span className="interest-tag">Lecture</span>
                <span className="interest-tag">Histoire</span>
                <span className="interest-tag-add">+ Ajouter</span>
              </div>
            </div>
          </div>
        )}

        {/* GRADES TAB */}
        {activeTab === 'grades' && (
          <>
            <h1>🎓 Mes notes et certificats</h1>
            <div className="gpa-card"><div className="gpa-value">{overallAverage}<span>%</span></div><div className="gpa-info"><h3>Moyenne générale</h3><p>Félicitations ! Vous êtes dans le top 15% de votre classe.</p></div></div>
            
            <div className="section"><h2>📊 Relevé de notes</h2>
              <table className="grades-table">
                <thead><tr><th>Cours</th><th>Quiz 1</th><th>Quiz 2</th><th>Examen</th><th>Moyenne</th><th>Statut</th></tr></thead>
                <tbody>
                  {gradesData.map((grade, idx) => (
                    <tr key={idx}><td><strong>{grade.course}</strong></td><td>{grade.quiz1}%</td><td>{grade.quiz2}%</td><td>{grade.exam ? `${grade.exam}%` : '—'}</td><td>{grade.average}%</td><td><span className={`status-${grade.status}`}>{grade.statusText}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="section"><h2>🏆 Certificats obtenus</h2>
              <div className="certificates-grid">
                {certificates.map((cert, idx) => (
                  <div key={idx} className="certificate-card"><div className="cert-icon">{cert.icon}</div><h3>{cert.title}</h3><p>Obtenu le {cert.date}</p><button className="btn-download-cert">Télécharger PDF</button></div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="settings-container">
            <h1>⚙️ Paramètres</h1>
            <div className="settings-section">
              <h2>🔔 Notifications</h2>
              <div className="setting-item"><div className="setting-info"><span>Notifications par email</span><p>Recevez des alertes pour les nouveaux cours et quiz</p></div><label className="switch"><input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} /><span className="slider round"></span></label></div>
              <div className="setting-item"><div className="setting-info"><span>Rappels de quiz</span><p>Recevez un rappel 24h avant chaque quiz</p></div><label className="switch"><input type="checkbox" checked={quizReminders} onChange={(e) => setQuizReminders(e.target.checked)} /><span className="slider round"></span></label></div>
              <div className="setting-item"><div className="setting-info"><span>Newsletter pédagogique</span><p>Recevez des conseils et ressources éducatives</p></div><label className="switch"><input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} /><span className="slider round"></span></label></div>
            </div>
            <div className="settings-section">
              <h2>🎨 Apparence</h2>
              <div className="setting-item"><div className="setting-info"><span>Mode sombre</span><p>Changez l'apparence de l'interface</p></div><label className="switch"><input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} /><span className="slider round"></span></label></div>
            </div>
            <div className="settings-section">
              <h2>🔒 Confidentialité</h2>
              <div className="setting-item"><div className="setting-info"><span>Profil public</span><p>Permettre aux autres étudiants de voir mon profil</p></div><label className="switch"><input type="checkbox" checked={publicProfile} onChange={(e) => setPublicProfile(e.target.checked)} /><span className="slider round"></span></label></div>
              <div className="setting-item"><div className="setting-info"><span>Partager ma progression</span><p>Afficher ma progression sur le classement</p></div><label className="switch"><input type="checkbox" checked={shareProgress} onChange={(e) => setShareProgress(e.target.checked)} /><span className="slider round"></span></label></div>
              <button className="btn-change-password">🔑 Changer le mot de passe</button>
            </div>
            <div className="settings-section danger"><h2>⚠️ Zone dangereuse</h2><p>Supprimer définitivement votre compte et toutes vos données</p><button className="btn-danger">🗑️ Supprimer mon compte</button></div>
            <div className="settings-actions"><button className="btn-cancel">Annuler</button><button className="btn-save">💾 Sauvegarder</button></div>
          </div>
        )}

      </main>
    </div>
  );
};

export default DashboardEtudiant;