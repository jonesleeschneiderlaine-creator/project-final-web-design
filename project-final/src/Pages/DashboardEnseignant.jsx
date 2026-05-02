import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DashboardEnseignant.css';

const DashboardEnseignant = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeCourseFilter, setActiveCourseFilter] = useState('all');
  const [studentFilter, setStudentFilter] = useState('all');
  const [studentSearch, setStudentSearch] = useState('');
  const [teacherName, setTeacherName] = useState('Marie Pierre');
  const [teacherEmail, setTeacherEmail] = useState('marie.pierre@eduhaiti.com');
  const [teacherBio, setTeacherBio] = useState('Professeure de mathématiques passionnée par l\'éducation en Haïti. Plus de 8 ans d\'expérience dans l\'enseignement secondaire et supérieur.');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);

  // État pour le formulaire de création de cours
  const [courseTitle, setCourseTitle] = useState('');
  const [courseSubtitle, setCourseSubtitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseCategory, setCourseCategory] = useState('Mathématiques');
  const [courseLevel, setCourseLevel] = useState('Débutant');
  const [courseDuration, setCourseDuration] = useState('2 - 5 heures');
  const [courseType, setCourseType] = useState('Gratuit');
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseAccess, setCourseAccess] = useState('public');
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [chapters, setChapters] = useState([
    { id: 1, title: "Introduction", lessons: [
      { title: "Bienvenue dans le cours", type: "video" },
      { title: "Les bases fondamentales", type: "text" }
    ]},
    { id: 2, title: "Fondamentaux", lessons: [
      { title: "Les concepts clés", type: "video" }
    ]}
  ]);

  // Données des étudiants
  const studentsData = [
    { id: 1, nom: "Moreau", prenom: "Jean Paul", email: "jean.moreau@email.com", cours: "maths", coursNom: "Mathématiques Avancées", progression: 85, score: 1250, status: "actif", avatar: "JP" },
    { id: 2, nom: "Louis", prenom: "Marie", email: "marie.louis@email.com", cours: "maths", coursNom: "Mathématiques Avancées", progression: 92, score: 1180, status: "actif", avatar: "ML" },
    { id: 3, nom: "Fils", prenom: "Claude", email: "claude.fils@email.com", cours: "maths", coursNom: "Mathématiques Avancées", progression: 78, score: 1090, status: "actif", avatar: "CF" },
    { id: 4, nom: "Dorval", prenom: "Roseline", email: "roseline.dorval@email.com", cours: "maths", coursNom: "Mathématiques Avancées", progression: 88, score: 980, status: "actif", avatar: "RD" },
    { id: 5, nom: "Alexandre", prenom: "Pierre", email: "pierre.alexandre@email.com", cours: "sciences", coursNom: "Sciences Naturelles", progression: 72, score: 890, status: "actif", avatar: "PA" },
    { id: 6, nom: "Bernard", prenom: "Lucien", email: "lucien.bernard@email.com", cours: "francais", coursNom: "Français", progression: 94, score: 1350, status: "actif", avatar: "LB" },
  ];

  const filteredStudents = studentsData.filter(student => {
    if (studentFilter !== 'all' && student.cours !== studentFilter) return false;
    if (studentSearch !== '') {
      const fullName = `${student.nom} ${student.prenom}`.toLowerCase();
      const email = student.email.toLowerCase();
      if (!fullName.includes(studentSearch.toLowerCase()) && !email.includes(studentSearch.toLowerCase())) return false;
    }
    return true;
  });

  const getProgressClass = (progress) => {
    if (progress >= 80) return "success";
    if (progress >= 60) return "warning";
    return "danger";
  };

  const exportToCSV = () => {
    let csvContent = "Nom,Prénom,Email,Cours,Progression,Points,Statut\n";
    filteredStudents.forEach(s => {
      csvContent += `${s.nom},${s.prenom},${s.email},${s.coursNom},${s.progression},${s.score},${s.status}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "etudiants.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Gestion de l'image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCoverImage(null);
    setImagePreview(null);
  };

  // Gestion des chapitres
  const addChapter = () => {
    const newChapter = {
      id: chapters.length + 1,
      title: "",
      lessons: [{ title: "", type: "video" }]
    };
    setChapters([...chapters, newChapter]);
  };

  const updateChapterTitle = (chapterId, newTitle) => {
    setChapters(chapters.map(ch => 
      ch.id === chapterId ? { ...ch, title: newTitle } : ch
    ));
  };

  const deleteChapter = (chapterId) => {
    if (chapters.length > 1) {
      setChapters(chapters.filter(ch => ch.id !== chapterId));
    } else {
      alert('Vous devez avoir au moins un chapitre');
    }
  };

  const addLesson = (chapterId) => {
    setChapters(chapters.map(ch =>
      ch.id === chapterId 
        ? { ...ch, lessons: [...ch.lessons, { title: "", type: "video" }] }
        : ch
    ));
  };

  const updateLesson = (chapterId, lessonIndex, field, value) => {
    setChapters(chapters.map(ch =>
      ch.id === chapterId
        ? {
            ...ch,
            lessons: ch.lessons.map((lesson, idx) =>
              idx === lessonIndex ? { ...lesson, [field]: value } : lesson
            )
          }
        : ch
    ));
  };

  const deleteLesson = (chapterId, lessonIndex) => {
    const chapter = chapters.find(ch => ch.id === chapterId);
    if (chapter.lessons.length > 1) {
      setChapters(chapters.map(ch =>
        ch.id === chapterId
          ? { ...ch, lessons: ch.lessons.filter((_, idx) => idx !== lessonIndex) }
          : ch
      ));
    } else {
      alert('Chaque chapitre doit avoir au moins une leçon');
    }
  };

  const handleSubmitCourse = (e) => {
    e.preventDefault();
    alert('✅ Votre cours a été créé avec succès !');
    // Réinitialiser le formulaire
    setCourseTitle('');
    setCourseSubtitle('');
    setCourseDescription('');
    setCoverImage(null);
    setImagePreview(null);
  };

  return (
    <div className={`dashboard-container ${darkModeEnabled ? 'dark-mode' : ''}`}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <h2>🇭🇹 EduHaïti</h2>
          <span className="user-role">Enseignant</span>
        </div>
        
        <nav className="menu">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''}>
              <a href="#" onClick={() => setActiveTab('dashboard')}>
                <span className="menu-icon">📊</span>
                <span>Tableau de bord</span>
              </a>
            </li>
            <li className={activeTab === 'profile' ? 'active' : ''}>
              <a href="#" onClick={() => setActiveTab('profile')}>
                <span className="menu-icon">👤</span>
                <span>Profil</span>
              </a>
            </li>
            <li className={activeTab === 'students' ? 'active' : ''}>
              <a href="#" onClick={() => setActiveTab('students')}>
                <span className="menu-icon">👥</span>
                <span>Mes étudiants</span>
              </a>
            </li>
            <li className={activeTab === 'createCourse' ? 'active' : ''}>
              <a href="#" onClick={() => setActiveTab('createCourse')}>
                <span className="menu-icon">➕</span>
                <span>Créer un cours</span>
              </a>
            </li>
            <li className={activeTab === 'stats' ? 'active' : ''}>
              <a href="#" onClick={() => setActiveTab('stats')}>
                <span className="menu-icon">📈</span>
                <span>Statistiques</span>
              </a>
            </li>
            <li className={activeTab === 'settings' ? 'active' : ''}>
              <a href="#" onClick={() => setActiveTab('settings')}>
                <span className="menu-icon">⚙️</span>
                <span>Paramètres</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/">
            <button className="logout-btn">🚪 Déconnexion</button>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="main-header">
          <h1>
            {activeTab === 'dashboard' && '📊 Tableau de bord Enseignant'}
            {activeTab === 'profile' && '👤 Mon profil'}
            {activeTab === 'students' && '👥 Mes étudiants'}
            {activeTab === 'createCourse' && '➕ Créer un nouveau cours'}
            {activeTab === 'stats' && '📈 Statistiques Enseignant'}
            {activeTab === 'settings' && '⚙️ Paramètres'}
          </h1>
          <div className="header-right">
            <span className="date">
              📅 {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <div className="avatar">👩‍🏫</div>
          </div>
        </header>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <>
            <div className="dashboard-stats">
              <div className="stat-mini-card">
                <span className="stat-emoji">📚</span>
                <div className="stat-mini-info">
                  <h4>6</h4>
                  <p>Cours actifs</p>
                </div>
              </div>
              <div className="stat-mini-card">
                <span className="stat-emoji">👨‍🎓</span>
                <div className="stat-mini-info">
                  <h4>342</h4>
                  <p>Étudiants</p>
                </div>
              </div>
              <div className="stat-mini-card">
                <span className="stat-emoji">⭐</span>
                <div className="stat-mini-info">
                  <h4>4.8</h4>
                  <p>Note moyenne</p>
                </div>
              </div>
              <div className="stat-mini-card">
                <span className="stat-emoji">🎓</span>
                <div className="stat-mini-info">
                  <h4>15</h4>
                  <p>Certificats délivrés</p>
                </div>
              </div>
            </div>

            <section className="section">
              <div className="section-header">
                <h2>📖 Mes cours</h2>
                <button className="btn-add" onClick={() => setActiveTab('createCourse')}>+ Ajouter un cours</button>
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
          </>
        )}

        {/* PROFILE TAB - (conserve ton code existant) */}
        {activeTab === 'profile' && (
          <>
            <div className="profile-grid">
              <div className="profile-card photo-card">
                <div className="avatar-circle">👩‍🏫</div>
                <button className="change-photo-btn">📷 Changer photo</button>
                <div className="profile-status">
                  <span className="status-badge active">✅ En ligne</span>
                  <span className="member-since">Membre depuis Janvier 2025</span>
                </div>
              </div>

              <div className="profile-card info-card">
                <h3>📋 Informations personnelles</h3>
                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom complet</label>
                      <input type="text" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Titre / Spécialité</label>
                      <input type="text" value="Professeur de Mathématiques" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email professionnel</label>
                      <input type="email" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input type="tel" value="+509 1234 5678" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Bio / Présentation</label>
                    <textarea rows="3" value={teacherBio} onChange={(e) => setTeacherBio(e.target.value)}></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="stats-cards">
              <div className="stat-mini-card"><span className="stat-emoji">📚</span><div className="stat-mini-info"><h4>6</h4><p>Cours actifs</p></div></div>
              <div className="stat-mini-card"><span className="stat-emoji">👨‍🎓</span><div className="stat-mini-info"><h4>342</h4><p>Étudiants</p></div></div>
              <div className="stat-mini-card"><span className="stat-emoji">⭐</span><div className="stat-mini-info"><h4>4.8</h4><p>Note moyenne</p></div></div>
              <div className="stat-mini-card"><span className="stat-emoji">🎓</span><div className="stat-mini-info"><h4>15</h4><p>Certificats délivrés</p></div></div>
            </div>

            <div className="two-columns">
              <div className="section"><h3>💼 Expérience professionnelle</h3>
                <div className="timeline-item"><div className="timeline-header"><span className="timeline-title">Professeur de Mathématiques</span><span className="timeline-date">2022 - Aujourd'hui</span></div><p className="timeline-place">Lycée National, Port-au-Prince</p></div>
                <button className="btn-add-item">+ Ajouter une expérience</button>
              </div>
              <div className="section"><h3>🎓 Formation & Diplômes</h3>
                <div className="timeline-item"><div className="timeline-header"><span className="timeline-title">Master en Mathématiques Appliquées</span><span className="timeline-date">2018 - 2020</span></div><p className="timeline-place">Université d'État d'Haïti</p></div>
                <button className="btn-add-item">+ Ajouter un diplôme</button>
              </div>
            </div>

            <div className="section"><h3>🔧 Compétences</h3>
              <div className="skills-container">
                <span className="skill-tag">Mathématiques</span>
                <span className="skill-tag">Pédagogie</span>
                <span className="skill-tag">Création de contenu</span>
                <span className="skill-tag-add">+ Ajouter</span>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-cancel">Annuler</button>
              <button className="btn-submit">💾 Sauvegarder les modifications</button>
            </div>
          </>
        )}

        {/* STUDENTS TAB - (conserve ton code existant) */}
        {activeTab === 'students' && (
          <>
            <section className="filters-section">
              <div className="filter-group">
                <label>📚 Filtrer par cours :</label>
                <select value={studentFilter} onChange={(e) => setStudentFilter(e.target.value)}>
                  <option value="all">Tous les cours</option>
                  <option value="maths">Mathématiques Avancées</option>
                  <option value="sciences">Sciences Naturelles</option>
                  <option value="francais">Français</option>
                </select>
              </div>
              <div className="filter-group">
                <label>🔍 Rechercher :</label>
                <input type="text" placeholder="Nom, prénom..." value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} />
              </div>
              <div className="stats-badge">📊 Total : <strong>{filteredStudents.length}</strong> étudiants</div>
            </section>

            <section className="section students-section">
              <div className="section-header"><h2>📋 Liste des étudiants</h2><button className="btn-export" onClick={exportToCSV}>📎 Exporter CSV</button></div>
              <div className="students-grid">
                {filteredStudents.map(student => (
                  <div key={student.id} className="student-card">
                    <div className="student-card-header"><div className="student-avatar">{student.avatar}</div><div className={`student-badge ${student.status}`}>{student.status === "actif" ? "Actif" : "En cours"}</div></div>
                    <h3>{student.prenom} {student.nom}</h3>
                    <p className="student-email">✉️ {student.email}</p>
                    <div className="student-course"><span className="course-tag">📚 {student.coursNom}</span></div>
                    <div className="student-stats"><div className="stat"><span className="stat-label">📊 Progression</span><span className={`stat-value ${getProgressClass(student.progression)}`}>{student.progression}%</span></div><div className="stat"><span className="stat-label">⭐ Points</span><span className="stat-value">{student.score}</span></div></div>
                    <div className="progress-bar-mini"><div className="progress-fill" style={{ width: `${student.progression}%` }}></div></div>
                    <div className="student-actions"><button className="action-btn message">💬</button><button className="action-btn view">👁️</button></div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* CREATE COURSE TAB - NOUVEAU */}
        {activeTab === 'createCourse' && (
          <form className="course-form" onSubmit={handleSubmitCourse}>
            {/* SECTION 1 : INFORMATIONS GÉNÉRALES */}
            <section className="form-section">
              <h2>📋 Informations générales</h2>
              
              <div className="form-group">
                <label>Titre du cours <span className="required">*</span></label>
                <input type="text" placeholder="Ex: Mathématiques Avancées - Niveau Secondaire" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Sous-titre / Accroche</label>
                <input type="text" placeholder="Une phrase accrocheuse pour présenter votre cours" value={courseSubtitle} onChange={(e) => setCourseSubtitle(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Description du cours <span className="required">*</span></label>
                <textarea rows="4" placeholder="Décrivez le contenu, les objectifs et ce que les étudiants vont apprendre..." value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} required></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Catégorie principale</label>
                  <select value={courseCategory} onChange={(e) => setCourseCategory(e.target.value)}>
                    <option>Mathématiques</option>
                    <option>Sciences</option>
                    <option>Français</option>
                    <option>Histoire</option>
                    <option>Langues étrangères</option>
                    <option>Informatique</option>
                    <option>Arts</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Niveau</label>
                  <select value={courseLevel} onChange={(e) => setCourseLevel(e.target.value)}>
                    <option>Débutant</option>
                    <option>Intermédiaire</option>
                    <option>Avancé</option>
                    <option>Tous niveaux</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Durée estimée</label>
                  <select value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)}>
                    <option>Moins de 2 heures</option>
                    <option>2 - 5 heures</option>
                    <option>5 - 10 heures</option>
                    <option>10 - 20 heures</option>
                    <option>Plus de 20 heures</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Catégories / Tags</label>
                <div className="categories-grid">
                  <label className="checkbox-label"><input type="checkbox" value="mathematiques" /> Mathématiques</label>
                  <label className="checkbox-label"><input type="checkbox" value="algebre" /> Algèbre</label>
                  <label className="checkbox-label"><input type="checkbox" value="geometrie" /> Géométrie</label>
                  <label className="checkbox-label"><input type="checkbox" value="video" /> Vidéo</label>
                  <label className="checkbox-label"><input type="checkbox" value="quiz" /> Quiz</label>
                  <label className="checkbox-label"><input type="checkbox" value="certificat" /> Certificat</label>
                </div>
              </div>
            </section>

            {/* SECTION 2 : IMAGE & MÉDIAS */}
            <section className="form-section">
              <h2>🖼️ Image & médias</h2>
              
              <div className="form-group">
                <label>Image de couverture</label>
                {!imagePreview ? (
                  <div className="upload-area" onClick={() => document.getElementById('coverImageInput').click()}>
                    <div className="upload-icon">📸</div>
                    <p>Glissez une image ici ou</p>
                    <button type="button" className="btn-upload">Parcourir</button>
                    <p className="upload-hint">Format recommandé : JPG, PNG. Taille max : 5MB</p>
                  </div>
                ) : (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Aperçu" style={{ maxWidth: '200px', borderRadius: '12px' }} />
                    <button type="button" className="remove-image" onClick={removeImage}>✖ Supprimer</button>
                  </div>
                )}
                <input type="file" id="coverImageInput" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
              </div>

              <div className="form-group">
                <label>Vidéo d'introduction (optionnel)</label>
                <input type="url" placeholder="Lien YouTube ou Vimeo" />
              </div>
            </section>

            {/* SECTION 3 : CONTENU DU COURS (CHAPITRES) */}
            <section className="form-section">
              <h2>📚 Contenu du cours</h2>
              <p className="section-desc">Ajoutez des chapitres et des leçons à votre cours</p>
              
              <div id="chaptersContainer">
                {chapters.map((chapter, chIdx) => (
                  <div key={chapter.id} className="chapter-item">
                    <div className="chapter-header">
                      <div className="chapter-title-group">
                        <span className="chapter-number">Chapitre {chIdx + 1}</span>
                        <input type="text" className="chapter-title-input" placeholder="Titre du chapitre" value={chapter.title} onChange={(e) => updateChapterTitle(chapter.id, e.target.value)} />
                      </div>
                      <div className="chapter-actions">
                        <button type="button" className="btn-icon" onClick={() => deleteChapter(chapter.id)}>🗑️</button>
                      </div>
                    </div>
                    <div className="lessons-container">
                      {chapter.lessons.map((lesson, lIdx) => (
                        <div key={lIdx} className="lesson-item">
                          <input type="text" className="lesson-title" placeholder="Titre de la leçon" value={lesson.title} onChange={(e) => updateLesson(chapter.id, lIdx, 'title', e.target.value)} />
                          <select className="lesson-type" value={lesson.type} onChange={(e) => updateLesson(chapter.id, lIdx, 'type', e.target.value)}>
                            <option value="video">🎥 Vidéo</option>
                            <option value="text">📄 Texte</option>
                            <option value="quiz">📝 Quiz</option>
                            <option value="resource">📎 Ressource</option>
                          </select>
                          <button type="button" className="btn-icon" onClick={() => deleteLesson(chapter.id, lIdx)}>✖</button>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="btn-add-lesson" onClick={() => addLesson(chapter.id)}>+ Ajouter une leçon</button>
                  </div>
                ))}
              </div>

              <button type="button" className="btn-add-chapter" onClick={addChapter}>+ Ajouter un chapitre</button>
            </section>

            {/* SECTION 4 : PRIX & ACCESSIBILITÉ */}
            <section className="form-section">
              <h2>💰 Prix & Accessibilité</h2>
              
              <div className="form-row">
                <div className="form-group half">
                  <label>Type de cours</label>
                  <select value={courseType} onChange={(e) => setCourseType(e.target.value)}>
                    <option>Gratuit</option>
                    <option>Payant</option>
                  </select>
                </div>
                <div className="form-group half">
                  <label>Prix (USD)</label>
                  <input type="number" placeholder="0.00" value={coursePrice} onChange={(e) => setCoursePrice(Number(e.target.value))} disabled={courseType === 'Gratuit'} />
                </div>
              </div>

              <div className="form-group">
                <label>Accessibilité</label>
                <div className="accessibility-options">
                  <label className="radio-label"><input type="radio" name="access" value="public" checked={courseAccess === 'public'} onChange={() => setCourseAccess('public')} /> Public (tout le monde peut voir)</label>
                  <label className="radio-label"><input type="radio" name="access" value="private" checked={courseAccess === 'private'} onChange={() => setCourseAccess('private')} /> Privé (sur invitation uniquement)</label>
                  <label className="radio-label"><input type="radio" name="access" value="beta" checked={courseAccess === 'beta'} onChange={() => setCourseAccess('beta')} /> Bêta (accès limité)</label>
                </div>
              </div>
            </section>

            {/* BOUTONS D'ACTION */}
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => setActiveTab('dashboard')}>Annuler</button>
              <button type="button" className="btn-draft">💾 Sauvegarder comme brouillon</button>
              <button type="submit" className="btn-submit">✅ Publier le cours</button>
            </div>
          </form>
        )}

        {/* STATISTICS TAB - (conserve ton code existant) */}
        {activeTab === 'stats' && (
          <>
            <div className="stats-cards">
              <div className="stat-card"><div className="stat-icon blue">📊</div><div className="stat-info"><span className="stat-value">4 820</span><span className="stat-label">Total</span></div></div>
              <div className="stat-card"><div className="stat-icon green">⏱️</div><div className="stat-info"><span className="stat-value">2 340h</span><span className="stat-label">Heures d'étude</span></div></div>
              <div className="stat-card"><div className="stat-icon orange">📝</div><div className="stat-info"><span className="stat-value">1 240</span><span className="stat-label">Épreuves</span></div></div>
              <div className="stat-card"><div className="stat-icon purple">👨‍🎓</div><div className="stat-info"><span className="stat-value">89</span><span className="stat-label">Candidats</span></div></div>
            </div>

            <div className="section competence-section">
              <div className="section-header"><h2>📊 Taux de compétence par cours</h2></div>
              <div className="competence-grid">
                <div className="competence-card"><div className="card-header math-bg"><h3>📐 Mathématiques</h3><span className="total-score">85%</span></div><div className="card-body"><div className="competence-item"><span>Algèbre</span><div className="progress-bar"><div className="progress-fill" style={{ width: '100%' }}></div></div><span className="percent">100%</span></div><div className="competence-item"><span>Géométrie</span><div className="progress-bar"><div className="progress-fill" style={{ width: '50%' }}></div></div><span className="percent">50%</span></div></div></div>
                <div className="competence-card"><div className="card-header french-bg"><h3>📖 Français</h3><span className="total-score">78%</span></div><div className="card-body"><div className="competence-item"><span>Grammaire</span><div className="progress-bar"><div className="progress-fill" style={{ width: '88%' }}></div></div><span className="percent">88%</span></div><div className="competence-item"><span>Littérature</span><div className="progress-bar"><div className="progress-fill" style={{ width: '72%' }}></div></div><span className="percent">72%</span></div></div></div>
              </div>
            </div>
          </>
        )}

        {/* SETTINGS TAB - CORRIGÉ */}
{activeTab === 'settings' && (
  <>
    {/* Carte Profil */}
    <div className="card">
      <div className="card-header">
        <h3>👤 Profil</h3>
        <span className="card-badge">Informations personnelles</span>
      </div>
      <div className="form-group">
        <label>Nom complet</label>
        <input type="text" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Nouveau mot de passe</label>
        <input type="password" placeholder="••••••••" />
      </div>
      <div className="form-group">
        <label>Confirmer le mot de passe</label>
        <input type="password" placeholder="••••••••" />
      </div>
      <button className="btn primary">💾 Sauvegarder</button>
    </div>

    {/* Carte Préférences - CORRIGÉE */}
    <div className="card">
      <div className="card-header">
        <h3>🎨 Préférences</h3>
        <span className="card-badge">Personnalisation</span>
      </div>
      
      <div className="setting-item">
        <div className="setting-info">
          <span>📧 Notifications email</span>
          <p className="setting-desc">Recevoir des alertes par email</p>
        </div>
        <label className="toggle-switch">
          <input type="checkbox" checked={notificationsEnabled} onChange={(e) => setNotificationsEnabled(e.target.checked)} />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="setting-item">
        <div className="setting-info">
          <span>🌙 Mode sombre</span>
          <p className="setting-desc">Thème sombre pour l'interface</p>
        </div>
        <label className="toggle-switch">
          <input type="checkbox" checked={darkModeEnabled} onChange={(e) => setDarkModeEnabled(e.target.checked)} />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="setting-item">
        <div className="setting-info">
          <span>🔔 Notifications push</span>
          <p className="setting-desc">Alertes en temps réel</p>
        </div>
        <label className="toggle-switch">
          <input type="checkbox" checked={pushEnabled} onChange={(e) => setPushEnabled(e.target.checked)} />
          <span className="toggle-slider"></span>
        </label>
      </div>
    </div>

    {/* Carte Zone dangereuse */}
    <div className="card danger">
      <div className="card-header">
        <h3>⚠️ Zone dangereuse</h3>
        <span className="card-badge danger-badge">Action irréversible</span>
      </div>
      <p>Supprimer définitivement votre compte ainsi que toutes vos données. Cette action est irréversible.</p>
      <button className="btn danger-btn" onClick={() => { if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) alert('Compte supprimé'); }}>🗑️ Supprimer mon compte</button>
    </div>
  </>
)}

      </main>
    </div>
  );
};

export default DashboardEnseignant;