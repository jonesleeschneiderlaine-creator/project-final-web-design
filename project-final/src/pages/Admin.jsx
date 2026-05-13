import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot } from 'firebase/firestore';
import './Admin.css';

// const studentsRef = collection(db, 'users');
// const qStudents = query(studentsRef, where('role', '==', 'student'));

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // 🔥 Firebase instances
  const auth = getAuth();
  const db = getFirestore();
  
  // 🔥 États pour les données Firestore
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [reports, setReports] = useState([]);
  const [logs, setLogs] = useState([]);

  // États pour les filtres
  const [userSearch, setUserSearch] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [teacherSearch, setTeacherSearch] = useState('');
  const [expandedTeachers, setExpandedTeachers] = useState({});

  // États pour les modals
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showWarnModal, setShowWarnModal] = useState(false);
  const [showHideVideoModal, setShowHideVideoModal] = useState(false);
  const [currentBlockUser, setCurrentBlockUser] = useState(null);
  const [currentBanUser, setCurrentBanUser] = useState(null);
  const [currentWarnTeacher, setCurrentWarnTeacher] = useState(null);
  const [currentHideVideo, setCurrentHideVideo] = useState(null);

  // États pour les formulaires modaux
  const [blockDuration, setBlockDuration] = useState('7');
  const [blockReason, setBlockReason] = useState('');
  const [banType, setBanType] = useState('email');
  const [banReason, setBanReason] = useState('');
  const [warnType, setWarnType] = useState('general');
  const [warnMessage, setWarnMessage] = useState('');
  const [hideDuration, setHideDuration] = useState('7');
  const [hideReason, setHideReason] = useState('');

  // État pour le formulaire de création d'enseignant
  const [teacherForm, setTeacherForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    specialite: '',
    bio: '',
    avatar: ''
  });
  const [teacherLoading, setTeacherLoading] = useState(false);
  const [teacherError, setTeacherError] = useState('');
  const [teacherSuccess, setTeacherSuccess] = useState(false);

  // ========== VÉRIFICATION ADMIN ==========
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      const session = JSON.parse(adminSession);
      const sessionDate = new Date(session.loginTime);
      const now = new Date();
      const hoursDiff = (now - sessionDate) / (1000 * 60 * 60);
      
      if (session.isAdmin && hoursDiff < 24) {
        setUser({ email: 'admin@gmail.com', role: 'admin' });
        setLoading(false);
        return;
      } else {
        localStorage.removeItem('adminSession');
        navigate('/connexion');
      }
    } else {
      navigate('/connexion');
    }
  }, [navigate]);

  // ========== CHARGEMENT DES DONNÉES EN TEMPS RÉEL ==========
  useEffect(() => {
    if (loading) return;

    // Charger les étudiants depuis Firestore
    const studentsRef = collection(db, 'users');
    const qStudents = query(studentsRef, where('role', '==', 'student'));
    
    const unsubscribeStudents = onSnapshot(qStudents, (snapshot) => {
      const studentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentsData);
    });

    // Charger les enseignants depuis Firestore
    const qTeachers = query(studentsRef, where('role', '==', 'teacher'));
    
    const unsubscribeTeachers = onSnapshot(qTeachers, (snapshot) => {
      const teachersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTeachers(teachersData);
    });

    // Charger les vidéos
    const videosRef = collection(db, 'videos');
    const unsubscribeVideos = onSnapshot(videosRef, (snapshot) => {
      const videosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVideos(videosData);
    });

    // Charger les signalements
    const reportsRef = collection(db, 'reports');
    const unsubscribeReports = onSnapshot(reportsRef, (snapshot) => {
      const reportsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReports(reportsData);
    });

    // Charger les logs
    const logsRef = collection(db, 'adminLogs');
    const unsubscribeLogs = onSnapshot(logsRef, (snapshot) => {
      const logsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLogs(logsData.sort((a, b) => new Date(b.time) - new Date(a.time)));
    });

    return () => {
      unsubscribeStudents();
      unsubscribeTeachers();
      unsubscribeVideos();
      unsubscribeReports();
      unsubscribeLogs();
    };
  }, [db, loading]);

  // ========== FONCTION POUR AJOUTER UN LOG ==========
  const addLog = async (action, details) => {
    try {
      await addDoc(collection(db, 'adminLogs'), {
        time: new Date().toISOString(),
        action,
        user: 'Admin',
        details
      });
    } catch (error) {
      console.error('Erreur ajout log:', error);
    }
  };

  // ========== CRÉATION D'UN ENSEIGNANT ==========
  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    
    if (teacherForm.password !== teacherForm.confirmPassword) {
      setTeacherError('Les mots de passe ne correspondent pas !');
      return;
    }
    
    if (teacherForm.password.length < 6) {
      setTeacherError('Le mot de passe doit contenir au moins 6 caractères !');
      return;
    }

    if (!teacherForm.email.includes('@')) {
      setTeacherError('Veuillez entrer un email valide');
      return;
    }
    
    setTeacherLoading(true);
    setTeacherError('');

    try {
      // 1. Créer l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        teacherForm.email, 
        teacherForm.password
      );
      
      const newUser = userCredential.user;
      
      // 2. Mettre à jour le profil avec le nom
      await updateProfile(newUser, {
        displayName: `${teacherForm.prenom} ${teacherForm.nom}`
      });

      // 3. Créer le document dans Firestore (collection users)
      const avatar = teacherForm.avatar || (teacherForm.prenom.charAt(0) + teacherForm.nom.charAt(0)).toUpperCase();
      
      await addDoc(collection(db, 'users'), {
        uid: newUser.uid,
        nom: teacherForm.nom,
        prenom: teacherForm.prenom,
        email: teacherForm.email,
        phone: teacherForm.phone,
        role: 'teacher',
        status: 'active',
        blockUntil: null,
        avatar: avatar,
        specialite: teacherForm.specialite,
        bio: teacherForm.bio,
        createdAt: new Date().toISOString()
      });

      await addLog('Création enseignant', `Enseignant ${teacherForm.prenom} ${teacherForm.nom} a été créé avec succès`);
      
      setTeacherSuccess(true);
      setTeacherForm({
        nom: '', prenom: '', email: '', phone: '', password: '', confirmPassword: '', specialite: '', bio: '', avatar: ''
      });
      
      setTimeout(() => setTeacherSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setTeacherError('Cet email est déjà utilisé par un autre compte');
      } else {
        setTeacherError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setTeacherLoading(false);
    }
  };

  const handleTeacherFormChange = (e) => {
    const { name, value } = e.target;
    setTeacherForm(prev => ({ ...prev, [name]: value }));
    setTeacherError('');
    setTeacherSuccess(false);
  };

  // ========== GESTION DES UTILISATEURS ==========
  const openBlockModal = (user) => {
    setCurrentBlockUser(user);
    setBlockReason('');
    setBlockDuration('7');
    setShowBlockModal(true);
  };

  const confirmBlock = async () => {
    if (currentBlockUser && window.confirm(`🔒 Bloquer ${currentBlockUser.prenom} ${currentBlockUser.nom} ?`)) {
      const days = blockDuration === 'permanent' ? 'Permanent' : `${blockDuration} jour(s)`;
      const until = blockDuration !== 'permanent' ? new Date(Date.now() + blockDuration * 86400000).toISOString().split('T')[0] : null;
      
      try {
        const userRef = doc(db, 'users', currentBlockUser.id);
        await updateDoc(userRef, {
          status: 'blocked',
          blockUntil: until
        });
        
        await addLog('Blocage', `Utilisateur ${currentBlockUser.prenom} ${currentBlockUser.nom} bloqué pour ${days}. Motif: ${blockReason || 'Non spécifié'}`);
        // alert(`✅ ${currentBlockUser.prenom} ${currentBlockUser.nom} a été bloqué`);
      } catch (error) {
        console.error(error);
        // alert('❌ Erreur lors du blocage');
      }
      setShowBlockModal(false);
      setCurrentBlockUser(null);
    }
  };

  const openBanModal = (user) => {
    setCurrentBanUser(user);
    setBanReason('');
    setBanType('email');
    setShowBanModal(true);
  };

  const confirmBan = async () => {
    if (currentBanUser && window.confirm(`🚫 Bannir définitivement ${currentBanUser.prenom} ${currentBanUser.nom} ?`)) {
      try {
        await deleteDoc(doc(db, 'users', currentBanUser.id));
        await addLog('Bannissement', `Utilisateur ${currentBanUser.prenom} ${currentBanUser.nom} banni définitivement. Motif: ${banReason || 'Non spécifié'}`);
        // alert(`✅ ${currentBanUser.prenom} ${currentBanUser.nom} a été banni définitivement`);
      } catch (error) {
        console.error(error);
        // alert('❌ Erreur lors du bannissement');
      }
      setShowBanModal(false);
      setCurrentBanUser(null);
    }
  };

  const deleteUser = async (user) => {
    if (window.confirm(`🗑️ Supprimer définitivement ${user.prenom} ${user.nom} ?`)) {
      try {
        await deleteDoc(doc(db, 'users', user.id));
        await addLog('Suppression', `Utilisateur ${user.prenom} ${user.nom} supprimé définitivement`);
        // alert(`✅ ${user.prenom} ${user.nom} a été supprimé`);
      } catch (error) {
        console.error(error);
        // alert('❌ Erreur lors de la suppression');
      }
    }
  };

  const openWarnModal = (teacher) => {
    setCurrentWarnTeacher(teacher);
    setWarnType('general');
    setWarnMessage('');
    setShowWarnModal(true);
  };

  const confirmWarn = async () => {
    if (currentWarnTeacher && window.confirm(`⚠️ Envoyer un avertissement à ${currentWarnTeacher.prenom} ${currentWarnTeacher.nom} ?`)) {
      await addLog('Avertissement', `Avertissement envoyé à ${currentWarnTeacher.prenom} ${currentWarnTeacher.nom} (${warnType}). Message: ${warnMessage || 'Avertissement pour non-respect des règles'}`);
      // alert(`✅ Avertissement envoyé à ${currentWarnTeacher.prenom} ${currentWarnTeacher.nom}`);
      setShowWarnModal(false);
      setCurrentWarnTeacher(null);
    }
  };

  const openHideVideoModal = (video, teacherName) => {
    setCurrentHideVideo({ ...video, teacherName });
    setHideReason('');
    setHideDuration('7');
    setShowHideVideoModal(true);
  };

  const confirmHideVideo = async () => {
    if (currentHideVideo && window.confirm(`🙈 Masquer la vidéo "${currentHideVideo.title}" ?`)) {
      const days = hideDuration === 'permanent' ? 'Permanent' : `${hideDuration} jour(s)`;
      const until = hideDuration !== 'permanent' ? new Date(Date.now() + hideDuration * 86400000).toISOString().split('T')[0] : null;
      
      try {
        const videoRef = doc(db, 'videos', currentHideVideo.id);
        await updateDoc(videoRef, {
          status: 'hidden',
          hiddenUntil: until
        });
        
        await addLog('Vidéo masquée', `Vidéo "${currentHideVideo.title}" (${currentHideVideo.teacherName}) masquée pour ${days}. Motif: ${hideReason || 'Non spécifié'}`);
        // alert(`✅ Vidéo "${currentHideVideo.title}" masquée`);
      } catch (error) {
        console.error(error);
        // alert('❌ Erreur lors du masquage');
      }
      setShowHideVideoModal(false);
      setCurrentHideVideo(null);
    }
  };

  const ignoreReport = async (reportId) => {
    if (window.confirm(`Ignorer ce signalement ?`)) {
      try {
        await deleteDoc(doc(db, 'reports', reportId));
        // alert(`Signalement ignoré`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const exportLogs = () => {
    let csvContent = "Date,Action,Utilisateur,Détails\n";
    logs.forEach(log => {
      csvContent += `"${log.time}","${log.action}","${log.user}","${log.details}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `admin_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ========== DÉCONNEXION ==========
  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/connexion');
  };

  // ========== STATISTIQUES EN TEMPS RÉEL ==========
  const totalStudents = students.length;
  const totalTeachers = teachers.filter(t => t.status === 'active').length;
  const blockedUsers = [...students, ...teachers].filter(u => u.status === 'blocked').length;
  const totalVideos = videos.length;

  // ========== FILTRAGE DES UTILISATEURS ==========
  const allUsers = [...students, ...teachers];
  
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = `${user.nom} ${user.prenom}`.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      (user.phone && user.phone.includes(userSearch));
    const matchesType = userTypeFilter === 'all' || 
      (userTypeFilter === 'student' && user.role === 'student') ||
      (userTypeFilter === 'teacher' && user.role === 'teacher') ||
      (userTypeFilter === 'blocked' && user.status === 'blocked');
    return matchesSearch && matchesType;
  });

  // ========== FILTRAGE DES ENSEIGNANTS ==========
  const filteredTeachers = teachers.filter(teacher =>
    `${teacher.nom} ${teacher.prenom}`.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  const toggleTeacherVideos = (teacherId) => {
    setExpandedTeachers(prev => ({ ...prev, [teacherId]: !prev[teacherId] }));
  };

  const currentDate = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return <div className="admin-loading">Chargement de l'administration...</div>;
  }

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <h2>🇭🇹 EduHaïti</h2>
          <span className="admin-badge">Administrateur</span>
        </div>
        
        <nav className="menu">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
              <span className="menu-icon">📊</span>
              <span>Tableau de bord</span>
            </li>
            <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
              <span className="menu-icon">👥</span>
              <span>Utilisateurs</span>
            </li>
            <li className={activeTab === 'teachers' ? 'active' : ''} onClick={() => setActiveTab('teachers')}>
              <span className="menu-icon">👨‍🏫</span>
              <span>Enseignants & Vidéos</span>
            </li>
            <li className={activeTab === 'createTeacher' ? 'active' : ''} onClick={() => setActiveTab('createTeacher')}>
              <span className="menu-icon">➕</span>
              <span>Créer un enseignant</span>
            </li>
            <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>
              <span className="menu-icon">📋</span>
              <span>Signalements</span>
            </li>
            <li className={activeTab === 'logs' ? 'active' : ''} onClick={() => setActiveTab('logs')}>
              <span className="menu-icon">📜</span>
              <span>Journaux</span>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>🚪 Déconnexion</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="main-header">
          <h1>📊 Administration EduHaïti</h1>
          <div className="header-right">
            <span className="date">📅 {currentDate}</span>
            <div className="admin-avatar">👑</div>
          </div>
        </header>

        {/* DASHBOARD TAB - STATS EN TEMPS RÉEL */}
        {activeTab === 'dashboard' && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">👨‍🎓</div>
              <div className="stat-info">
                <span className="stat-value">{totalStudents}</span>
                <span className="stat-label">Étudiants</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">👩‍🏫</div>
              <div className="stat-info">
                <span className="stat-value">{totalTeachers}</span>
                <span className="stat-label">Enseignants</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange">🔒</div>
              <div className="stat-info">
                <span className="stat-value">{blockedUsers}</span>
                <span className="stat-label">Utilisateurs bloqués</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon purple">🎥</div>
              <div className="stat-info">
                <span className="stat-value">{totalVideos}</span>
                <span className="stat-label">Vidéos totales</span>
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB - AFFICHAGE EN TEMPS RÉEL */}
        {activeTab === 'users' && (
          <>
            <div className="section-header">
              <h2>👥 Gestion des utilisateurs</h2>
              <div className="header-actions">
                <input 
                  type="text" 
                  placeholder="🔍 Rechercher (nom, email, téléphone)..." 
                  className="search-input" 
                  value={userSearch} 
                  onChange={(e) => setUserSearch(e.target.value)} 
                />
                <select className="filter-select" value={userTypeFilter} onChange={(e) => setUserTypeFilter(e.target.value)}>
                  <option value="all">Tous</option>
                  <option value="student">Étudiants</option>
                  <option value="teacher">Enseignants</option>
                  <option value="blocked">Bloqués</option>
                </select>
              </div>
            </div>

            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr><th>Avatar</th><th>Nom complet</th><th>Email</th><th>Téléphone</th><th>Rôle</th><th>Statut</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td><div className="user-avatar">{user.avatar || (user.prenom?.charAt(0) || '') + (user.nom?.charAt(0) || '')}</div></td>
                      <td>{user.prenom} {user.nom}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || 'Non renseigné'}</td>
                      <td><span className={`role-badge ${user.role}`}>{user.role === 'student' ? 'Étudiant' : 'Enseignant'}</span></td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status === 'active' ? 'Actif' : user.blockUntil ? `Bloqué jusqu'au ${user.blockUntil}` : 'Bloqué'}
                        </span>
                        </td>
                      <td>
                        <div className="action-buttons">
                          {user.status === 'active' && <button className="action-btn block" onClick={() => openBlockModal(user)}>🔒 Bloquer</button>}
                          <button className="action-btn ban" onClick={() => openBanModal(user)}>🚫 Bannir</button>
                          <button className="action-btn delete" onClick={() => deleteUser(user)}>🗑️ Supprimer</button>
                        </div>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* TEACHERS & VIDEOS TAB */}
        {activeTab === 'teachers' && (
          <>
            <div className="section-header">
              <h2>👨‍🏫 Enseignants et leurs vidéos</h2>
              <div className="header-actions">
                <input 
                  type="text" 
                  placeholder="🔍 Rechercher un enseignant..." 
                  className="search-input" 
                  value={teacherSearch} 
                  onChange={(e) => setTeacherSearch(e.target.value)} 
                />
              </div>
            </div>

            <div className="teachers-list">
              {filteredTeachers.map(teacher => {
                const teacherVideos = videos.filter(v => v.teacherId === teacher.uid);
                const visibleCount = teacherVideos.filter(v => v.status === 'visible').length;
                const hiddenCount = teacherVideos.filter(v => v.status === 'hidden').length;
                const isExpanded = expandedTeachers[teacher.id];

                return (
                  <div key={teacher.id} className="teacher-card">
                    <div className="teacher-header" onClick={() => toggleTeacherVideos(teacher.id)}>
                      <div className="teacher-info">
                        <div className="teacher-avatar">{teacher.avatar || (teacher.prenom?.charAt(0) || '') + (teacher.nom?.charAt(0) || '')}</div>
                        <div className="teacher-details">
                          <h3>{teacher.prenom} {teacher.nom}</h3>
                          <p className="teacher-email">✉️ {teacher.email}</p>
                          {teacher.specialite && <p className="teacher-specialite">📚 {teacher.specialite}</p>}
                        </div>
                      </div>
                      <div className="teacher-stats">
                        <div className="stat-badge"><span className="stat-number">{teacherVideos.length}</span><span className="stat-label">Vidéos</span></div>
                        <div className="stat-badge"><span className="stat-number visible">{visibleCount}</span><span className="stat-label">Visibles</span></div>
                        <div className="stat-badge"><span className="stat-number hidden">{hiddenCount}</span><span className="stat-label">Masquées</span></div>
                        <button className="btn-warn-teacher" onClick={(e) => { e.stopPropagation(); openWarnModal(teacher); }}>⚠️ Avertir</button>
                        <span className="expand-icon">{isExpanded ? '▲' : '▼'}</span>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="teacher-videos">
                        <div className="videos-grid">
                          {teacherVideos.length === 0 ? (
                            <div className="no-videos">📭 Aucune vidéo publiée</div>
                          ) : (
                            teacherVideos.map(video => (
                              <div key={video.id} className={`video-item ${video.status === 'hidden' ? 'hidden' : ''}`}>
                                <div className="video-thumbnail">
                                  <div className="thumbnail-placeholder">🎥</div>
                                  {video.status === 'hidden' && <div className="video-hidden-badge">🔒 Masquée</div>}
                                </div>
                                <div className="video-details">
                                  <h4>{video.title}</h4>
                                  <p className="video-meta">⏱️ {video.duration} • 👁️ {video.views} vues</p>
                                  {video.hiddenUntil && <p className="video-hidden-until">Masquée jusqu'au {video.hiddenUntil}</p>}
                                  <div className="video-admin-actions">
                                    <button className="btn-warn" onClick={() => openWarnModal(teacher)}>⚠️ Avertir</button>
                                    <button className="btn-hide" onClick={() => openHideVideoModal(video, `${teacher.prenom} ${teacher.nom}`)}>🙈 Masquer</button>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* CREATE TEACHER TAB - AVEC FIREBASE */}
        {activeTab === 'createTeacher' && (
          <div className="create-teacher-section">
            <div className="section-header">
              <h2>➕ Créer un nouveau compte enseignant</h2>
              <p className="section-desc">Remplissez le formulaire ci-dessous pour ajouter un enseignant à la plateforme</p>
            </div>

            <div className="create-teacher-form-container">
              <form className="create-teacher-form" onSubmit={handleCreateTeacher}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nom <span className="required">*</span></label>
                    <input 
                      type="text" 
                      name="nom"
                      placeholder="Nom de l'enseignant"
                      value={teacherForm.nom}
                      onChange={handleTeacherFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Prénom <span className="required">*</span></label>
                    <input 
                      type="text" 
                      name="prenom"
                      placeholder="Prénom de l'enseignant"
                      value={teacherForm.prenom}
                      onChange={handleTeacherFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email professionnel <span className="required">*</span></label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="enseignant@eduhaiti.com"
                      value={teacherForm.email}
                      onChange={handleTeacherFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Téléphone <span className="required">*</span></label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="+509 XX XX XXXX"
                      value={teacherForm.phone}
                      onChange={handleTeacherFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Mot de passe <span className="required">*</span></label>
                    <input 
                      type="password" 
                      name="password"
                      placeholder="••••••••"
                      value={teacherForm.password}
                      onChange={handleTeacherFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirmer le mot de passe <span className="required">*</span></label>
                    <input 
                      type="password" 
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={teacherForm.confirmPassword}
                      onChange={handleTeacherFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Spécialité <span className="required">*</span></label>
                    <select name="specialite" value={teacherForm.specialite} onChange={handleTeacherFormChange} required>
                      <option value="">Sélectionner une spécialité</option>
                      <option value="Mathématiques">📐 Mathématiques</option>
                      <option value="Sciences">🔬 Sciences</option>
                      <option value="Français">📖 Français</option>
                      <option value="Histoire">🏛️ Histoire</option>
                      <option value="Anglais">🇬🇧 Anglais</option>
                      <option value="Informatique">💻 Informatique</option>
                      <option value="Arts">🎨 Arts</option>
                      <option value="Philosophie">💭 Philosophie</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Avatar (initiales)</label>
                    <input 
                      type="text" 
                      name="avatar"
                      placeholder="Ex: MP (sera généré automatiquement)"
                      value={teacherForm.avatar}
                      onChange={handleTeacherFormChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Bio / Présentation</label>
                  <textarea 
                    name="bio"
                    rows="4"
                    placeholder="Présentation de l'enseignant, son parcours, ses qualifications..."
                    value={teacherForm.bio}
                    onChange={handleTeacherFormChange}
                  ></textarea>
                </div>

                {teacherError && <div className="error-message">{teacherError}</div>}
                {teacherSuccess && <div className="success-message">✅ Enseignant créé avec succès !</div>}

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => {
                    setTeacherForm({
                      nom: '', prenom: '', email: '', phone: '', password: '', confirmPassword: '', specialite: '', bio: '', avatar: ''
                    });
                    setTeacherError('');
                  }}>Annuler</button>
                  <button type="submit" className="btn-submit" disabled={teacherLoading}>
                    {teacherLoading ? 'Création en cours...' : '👨‍🏫 Créer l\'enseignant'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
          <>
            <div className="section-header">
              <h2>📋 Signalements</h2>
              <button className="btn-refresh" onClick={() => setReports([...reports])}>🔄 Actualiser</button>
            </div>
            <div className="reports-list">
              {reports.length === 0 ? (
                <div className="no-reports">🎉 Aucun signalement en attente</div>
              ) : (
                reports.map(report => (
                  <div key={report.id} className="report-card">
                    <div className="report-header">
                      <span className="report-user">👤 {report.userName || report.userId}</span>
                      <span className="report-date">📅 {new Date(report.date).toLocaleDateString()}</span>
                    </div>
                    <div className="report-reason">⚠️ Motif : {report.reason}</div>
                    <div className="report-actions">
                      <button className="btn-ignore" onClick={() => ignoreReport(report.id)}>Ignorer</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* LOGS TAB */}
        {activeTab === 'logs' && (
          <>
            <div className="section-header">
              <h2>📜 Journaux d'activité</h2>
              <button className="btn-export" onClick={exportLogs}>📎 Exporter les logs</button>
            </div>
            <div className="logs-container">
              {logs.map((log, index) => (
                <div key={index} className="log-entry">
                  <span className="log-time">📅 {new Date(log.time).toLocaleString()}</span>
                  <span className="log-action">{log.action}</span>
                  <span className="log-user">👤 {log.user}</span>
                  <span className="log-details">{log.details}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* MODALS - (garde les mêmes modals que tu avais) */}
      {showBlockModal && currentBlockUser && (
        <div className="modal show" onClick={() => setShowBlockModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h3>🔒 Bloquer l'utilisateur</h3><span className="close-modal" onClick={() => setShowBlockModal(false)}>&times;</span></div>
            <div className="modal-body">
              <p>Utilisateur : <strong>{currentBlockUser.prenom} {currentBlockUser.nom}</strong></p>
              <div className="form-group">
                <label>Durée de blocage</label>
                <select className="form-control" value={blockDuration} onChange={(e) => setBlockDuration(e.target.value)}>
                  <option value="1">1 jour</option><option value="3">3 jours</option><option value="7">7 jours</option>
                  <option value="15">15 jours</option><option value="30">30 jours</option><option value="permanent">Permanent</option>
                </select>
              </div>
              <div className="form-group">
                <label>Motif du blocage</label>
                <textarea className="form-control" rows="3" placeholder="Motif du blocage..." value={blockReason} onChange={(e) => setBlockReason(e.target.value)}></textarea>
              </div>
            </div>
            <div className="modal-footer"><button className="btn-cancel" onClick={() => setShowBlockModal(false)}>Annuler</button><button className="btn-block" onClick={confirmBlock}>Bloquer</button></div>
          </div>
        </div>
      )}

      {showBanModal && currentBanUser && (
        <div className="modal show" onClick={() => setShowBanModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h3>🚫 Bannir l'utilisateur</h3><span className="close-modal-ban" onClick={() => setShowBanModal(false)}>&times;</span></div>
            <div className="modal-body">
              <p>⚠️ <strong>Attention :</strong> Cette action est irréversible !</p>
              <p>Utilisateur : <strong>{currentBanUser.prenom} {currentBanUser.nom}</strong></p>
              <div className="form-group">
                <label>Type de bannissement</label>
                <select className="form-control" value={banType} onChange={(e) => setBanType(e.target.value)}>
                  <option value="email">Bannir par email</option><option value="phone">Bannir par numéro de téléphone</option><option value="both">Bannir par email ET téléphone</option>
                </select>
              </div>
              <div className="form-group">
                <label>Motif du bannissement</label>
                <textarea className="form-control" rows="3" placeholder="Motif du bannissement..." value={banReason} onChange={(e) => setBanReason(e.target.value)}></textarea>
              </div>
            </div>
            <div className="modal-footer"><button className="btn-cancel" onClick={() => setShowBanModal(false)}>Annuler</button><button className="btn-ban" onClick={confirmBan}>Bannir définitivement</button></div>
          </div>
        </div>
      )}

      {showWarnModal && currentWarnTeacher && (
        <div className="modal show" onClick={() => setShowWarnModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h3>⚠️ Envoyer un avertissement</h3><span className="close-modal-warn" onClick={() => setShowWarnModal(false)}>&times;</span></div>
            <div className="modal-body">
              <p>Enseignant : <strong>{currentWarnTeacher.prenom} {currentWarnTeacher.nom}</strong></p>
              <div className="form-group">
                <label>Type d'avertissement</label>
                <select className="form-control" value={warnType} onChange={(e) => setWarnType(e.target.value)}>
                  <option value="video">Avertissement pour vidéo inappropriée</option>
                  <option value="comment">Avertissement pour commentaire</option>
                  <option value="behavior">Avertissement pour comportement</option>
                  <option value="general">Avertissement général</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message d'avertissement</label>
                <textarea className="form-control" rows="3" placeholder="Message d'avertissement..." value={warnMessage} onChange={(e) => setWarnMessage(e.target.value)}></textarea>
              </div>
            </div>
            <div className="modal-footer"><button className="btn-cancel" onClick={() => setShowWarnModal(false)}>Annuler</button><button className="btn-warn-send" onClick={confirmWarn}>Envoyer l'avertissement</button></div>
          </div>
        </div>
      )}

      {showHideVideoModal && currentHideVideo && (
        <div className="modal show" onClick={() => setShowHideVideoModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h3>🙈 Masquer la vidéo</h3><span className="close-modal-hide" onClick={() => setShowHideVideoModal(false)}>&times;</span></div>
            <div className="modal-body">
              <p>Vidéo : <strong>{currentHideVideo.title}</strong></p>
              <p>Enseignant : <strong>{currentHideVideo.teacherName}</strong></p>
              <div className="form-group">
                <label>Durée de masquage</label>
                <select className="form-control" value={hideDuration} onChange={(e) => setHideDuration(e.target.value)}>
                  <option value="1">1 jour</option><option value="3">3 jours</option><option value="7">7 jours</option>
                  <option value="15">15 jours</option><option value="30">30 jours</option><option value="permanent">Permanent</option>
                </select>
              </div>
              <div className="form-group">
                <label>Motif du masquage</label>
                <textarea className="form-control" rows="3" placeholder="Motif du masquage..." value={hideReason} onChange={(e) => setHideReason(e.target.value)}></textarea>
              </div>
            </div>
            <div className="modal-footer"><button className="btn-cancel" onClick={() => setShowHideVideoModal(false)}>Annuler</button><button className="btn-hide" onClick={confirmHideVideo}>Masquer la vidéo</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;