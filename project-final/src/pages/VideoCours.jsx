import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './VideoCours.css';

const VideoCours = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  
  const [videoProgress, setVideoProgress] = useState(0);
  const [activeLesson, setActiveLesson] = useState('1.3');
  const [chaptersOpen, setChaptersOpen] = useState({ 1: true, 2: false, 3: false });
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([
    { id: 1, text: "À 05:30 - Formule importante : ax² + bx + c = 0", time: "Il y a 2 jours" }
  ]);
  const [comments, setComments] = useState([
    { id: 1, author: "Prof. Marie Pierre", avatar: "👩‍🏫", text: "Excellent début ! N'hésitez pas à poser vos questions ici.", time: "Il y a 2 jours", replies: [] },
    { id: 2, author: "Jean-Paul M.", avatar: "👨‍🎓", text: "Je n'ai pas bien compris la formule à 05:30, quelqu'un peut m'expliquer ?", time: "Il y a 1 jour", replies: [] }
  ]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(24);
  const [saved, setSaved] = useState(false);
  const [allExpanded, setAllExpanded] = useState(false);
  
  const [lessons] = useState([
    { id: "1.1", title: "Quoi ? Projetons", duration: "12:30", status: "completed", type: "video" },
    { id: "1.2", title: "Quel programme ?", duration: "08:15", status: "completed", type: "video" },
    { id: "1.3", title: "Quel logiciel ?", duration: "10:45", status: "active", type: "video" },
    { id: "1.4", title: "Quiz - Commentaire le quiz", duration: "15 min", status: "quiz", type: "quiz" },
    { id: "1.5", title: "Entraînement", duration: "20:00", status: "locked", type: "video" }
  ]);

  const fichiers = [
    { id: 1, name: "Cours_Chapitre1_Introduction.pdf", type: "pdf", size: "2.4 MB", date: "15/04/2026" },
    { id: 2, name: "Exercices_pratiques_chapitre1.docx", type: "word", size: "1.2 MB", date: "15/04/2026" },
    { id: 3, name: "Corrige_quiz_chapitre1.pdf", type: "pdf", size: "856 KB", date: "16/04/2026" },
    { id: 4, name: "Notes_de_cours_chapitre1.docx", type: "word", size: "3.1 MB", date: "17/04/2026" }
  ];

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(percent);
    }
  };

  const handleLessonClick = (lessonId) => {
    setActiveLesson(lessonId);
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson && lesson.status !== 'locked') {
      // Ici vous pourriez charger une nouvelle vidéo
      console.log('Chargement de la leçon:', lesson.title);
    }
  };

  const toggleChapter = (chapterId) => {
    setChaptersOpen(prev => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: newNote, time: "À l'instant" }]);
      setNewNote('');
    }
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { 
        id: Date.now(), 
        author: "Moi", 
        avatar: "👨‍🎓", 
        text: newComment, 
        time: "À l'instant",
        replies: []
      }]);
      setNewComment('');
    }
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const downloadFile = (fileName) => {
    alert(`📥 Téléchargement de "${fileName}" démarré...`);
  };

  const previewFile = (fileName) => {
    alert(`👁️ Aperçu de "${fileName}" (fonctionnalité à venir)`);
  };

  const toggleAllChapters = () => {
    const newState = {};
    Object.keys(chaptersOpen).forEach(key => {
      newState[key] = !allExpanded;
    });
    setChaptersOpen(newState);
    setAllExpanded(!allExpanded);
  };

  // Calcul du pourcentage de progression
  const completedLessons = lessons.filter(l => l.status === 'completed').length;
  const progressPercent = Math.round((completedLessons / lessons.length) * 100);

  return (
    <div className="video-container">
      {/* HEADER */}
      <div className="video-header">
        <button className="btn-retour" onClick={() => navigate(-1)}>
          <span>←</span> Retour au cours
        </button>
        <div className="header-progress">
          <div className="mini-progress">
            <div className="mini-progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <span>{progressPercent}% complété</span>
        </div>
        <div className="header-actions">
          <button className="header-btn">🔖 Signet</button>
          <button className="header-btn">💬 Commentaires</button>
          <button className="header-btn">📱 Partager</button>
        </div>
      </div>

      <div className="video-layout">
        {/* COLONNE GAUCHE : VIDÉO */}
        <div className="video-main">
          <div className="video-player-wrapper">
            <div className="video-player">
              <video 
                ref={videoRef}
                controls 
                poster="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop"
                onTimeUpdate={handleVideoTimeUpdate}
              >
                <source src="#" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
              <div className="video-controls-overlay">
                <div className="video-progress-bar">
                  <div className="video-progress-fill" style={{ width: `${videoProgress}%` }}></div>
                  <div className="video-progress-handle"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Informations du cours */}
          <div className="video-info">
            <div className="info-header">
              <h1>📹 Chapitre 1 - Introduction aux mathématiques avancées</h1>
              <div className="info-actions">
                <button className="like-btn" onClick={handleLike}>❤️ {likes}</button>
                <button className="save-btn" onClick={handleSave}>{saved ? '✅ Sauvegardé' : '📌 Sauvegarder'}</button>
              </div>
            </div>
            <div className="video-meta">
              <span className="course-badge">📐 Mathématiques Avancées</span>
              <span className="duration-badge">⏱️ 24:35 min</span>
              <span className="level-badge">🎓 Niveau Secondaire</span>
              <span className="views-badge">👁️ 1 234 vues</span>
            </div>
            <p className="video-description">
              Dans cette introduction, nous allons découvrir les bases fondamentales des mathématiques avancées.
              Ce chapitre couvre les concepts essentiels pour la suite du cours : les matrices, les vecteurs,
              et les systèmes d'équations linéaires.
            </p>

            {/* Notes personnelles */}
            <div className="notes-section">
              <div className="notes-header">
                <span>📝 Mes notes</span>
                <button className="add-note-btn" onClick={addNote}>+ Ajouter une note</button>
              </div>
              <input 
                type="text" 
                className="note-input"
                placeholder="Écrivez votre note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addNote()}
              />
              <div className="notes-list">
                {notes.map(note => (
                  <div key={note.id} className="note-item">
                    <p>📌 {note.text}</p>
                    <span className="note-time">{note.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation entre les leçons */}
          <div className="lesson-navigation">
            <button className="nav-prev"><span>◀</span> Leçon précédente</button>
            <div className="nav-center">
              <span className="current-lesson">Leçon 1.3 - Introduction</span>
              <span className="total-lessons">sur {lessons.length} leçons</span>
            </div>
            <button className="nav-next">Leçon suivante <span>▶</span></button>
          </div>
        </div>

        {/* COLONNE DROITE : SOMMAIRE */}
        <div className="video-sidebar">
          <div className="sidebar-header">
            <h3>📚 Sommaire du cours</h3>
            <div className="header-badges">
              <span className="progress-badge">{completedLessons}/{lessons.length} leçons</span>
              <button className="expand-all" onClick={toggleAllChapters}>
                {allExpanded ? '📂 Tout fermer' : '📂 Tout ouvrir'}
              </button>
            </div>
          </div>

          <div className="sidebar-search">
            <span>🔍</span>
            <input type="text" placeholder="Rechercher une leçon..." />
          </div>

          <div className="chapters-list">
            {/* Chapitre 1 */}
            <div className="chapter-group active">
              <div className="chapter-header" onClick={() => toggleChapter(1)}>
                <div className="chapter-left">
                  <span className="chapter-toggle">{chaptersOpen[1] ? '▼' : '▶'}</span>
                  <span className="chapter-number">Chapitre 1</span>
                  <span className="chapter-title">Introduction</span>
                </div>
                <div className="chapter-right">
                  <span className="chapter-duration">45 min</span>
                  <span className="chapter-progress">3/5</span>
                </div>
              </div>
              <div className="lessons-list" style={{ display: chaptersOpen[1] ? 'block' : 'none' }}>
                {lessons.map(lesson => (
                  <div 
                    key={lesson.id}
                    className={`lesson-item ${lesson.status} ${activeLesson === lesson.id ? 'active' : ''}`}
                    onClick={() => lesson.status !== 'locked' && handleLessonClick(lesson.id)}
                  >
                    <div className="lesson-left">
                      <span className="lesson-status">
                        {lesson.status === 'completed' ? '✅' : lesson.status === 'active' ? '▶' : lesson.status === 'quiz' ? '📝' : '🔒'}
                      </span>
                      <span className="lesson-name">{lesson.title}</span>
                    </div>
                    <div className="lesson-right">
                      <span className="lesson-duration">{lesson.duration}</span>
                      {lesson.status === 'active' && <span className="playing-badge">En cours</span>}
                      {lesson.status === 'completed' && <span className="lesson-check">✔️</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chapitre 2 */}
            <div className="chapter-group">
              <div className="chapter-header" onClick={() => toggleChapter(2)}>
                <div className="chapter-left">
                  <span className="chapter-toggle">{chaptersOpen[2] ? '▼' : '▶'}</span>
                  <span className="chapter-number">Chapitre 2</span>
                  <span className="chapter-title">Les opérations de base</span>
                </div>
                <div className="chapter-right">
                  <span className="chapter-duration">1h 30 min</span>
                  <span className="chapter-progress">1/3</span>
                </div>
              </div>
              <div className="lessons-list" style={{ display: chaptersOpen[2] ? 'block' : 'none' }}>
                <div className="lesson-item completed"><div className="lesson-left"><span className="lesson-status">✅</span><span className="lesson-name">2.1 - Addition et soustraction</span></div><div className="lesson-right"><span className="lesson-duration">15:00</span></div></div>
                <div className="lesson-item"><div className="lesson-left"><span className="lesson-status">📄</span><span className="lesson-name">2.2 - Multiplication et division</span></div><div className="lesson-right"><span className="lesson-duration">18:30</span></div></div>
                <div className="lesson-item"><div className="lesson-left"><span className="lesson-status">📄</span><span className="lesson-name">2.3 - Exercices pratiques</span></div><div className="lesson-right"><span className="lesson-duration">25:00</span></div></div>
              </div>
            </div>
          </div>

          {/* Progression */}
          <div className="progress-section">
            <div className="progress-header">
              <span className="progress-label">Progression du cours</span>
              <span className="progress-percent">{progressPercent}% complété</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="progress-stats">
              <span>✅ {completedLessons} leçons complétées</span>
              <span>📝 1 quiz à venir</span>
            </div>
          </div>
        </div>
      </div>

      {/* FICHIERS JOINTS */}
      <div className="fichiers-section">
        <div className="fichiers-header">
          <div className="header-left">
            <h3>📎 Fichiers joints</h3>
            <span className="fichiers-count">{fichiers.length} fichiers disponibles</span>
          </div>
          <div className="header-right">
            <button className="upload-btn">📤 Télécharger tout</button>
          </div>
        </div>
        <div className="fichiers-grid">
          {fichiers.map(file => (
            <div key={file.id} className="fichier-card">
              <div className={`fichier-icon ${file.type}`}>{file.type === 'pdf' ? '📄' : '📘'}</div>
              <div className="fichier-info">
                <h4>{file.name}</h4>
                <p>{file.type.toUpperCase()} • {file.size} • Ajouté le {file.date}</p>
              </div>
              <button className="btn-download" onClick={() => downloadFile(file.name)}>📥 Télécharger</button>
              <button className="btn-preview" onClick={() => previewFile(file.name)}>👁️ Aperçu</button>
            </div>
          ))}
        </div>
      </div>

      {/* COMMENTAIRES */}
      <div className="commentaires-section">
        <div className="commentaires-header">
          <h3>💬 Commentaires et questions</h3>
          <span className="comment-count">{comments.length} commentaires</span>
        </div>
        
        <div className="add-comment">
          <div className="comment-avatar">👨‍🎓</div>
          <input 
            type="text" 
            placeholder="Posez une question ou laissez un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addComment()}
          />
          <button className="send-comment" onClick={addComment}>Envoyer →</button>
        </div>
        
        <div className="comment-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-avatar">{comment.avatar}</div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-time">{comment.time}</span>
                </div>
                <p>{comment.text}</p>
                <button className="reply-btn">Répondre</button>
              </div>
            </div>
          ))}
        </div>
        
        <a href="#" className="view-all-comments">Voir tous les commentaires →</a>
      </div>
    </div>
  );
};

export default VideoCours;