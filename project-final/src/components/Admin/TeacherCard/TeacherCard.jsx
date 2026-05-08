// src/components/Admin/TeacherCard/TeacherCard.jsx
// ─── Carte enseignant + vidéos ────────────────────────────────────────────────

import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiAlertTriangle, FiEyeOff, FiTrash2 } from 'react-icons/fi';
import './teacherCard.css';

const TeacherCard = ({ teacher, videos, onWarn, onWarnVideo, onHideVideo, onDeleteVideo }) => {
  const [expanded, setExpanded] = useState(false);

  const teacherVideos = videos.filter((v) => v.teacherId === teacher.id);
  const visibleCount = teacherVideos.filter((v) => v.status === 'visible').length;
  const hiddenCount = teacherVideos.filter((v) => v.status === 'hidden').length;

  return (
    <div className="teacher-card">
      {/* ── En-tête ──────────────────────────────────────────────── */}
      <div className="teacher-card__header" onClick={() => setExpanded(!expanded)}>
        <div className="teacher-card__info">
          <div className="teacher-card__avatar">{teacher.avatar}</div>
          <div>
            <h3>{teacher.prenom} {teacher.nom}</h3>
            <p className="teacher-card__email">{teacher.email}</p>
          </div>
        </div>

        <div className="teacher-card__stats">
          <div className="teacher-card__stat">
            <span className="teacher-card__stat-num">{teacherVideos.length}</span>
            <span className="teacher-card__stat-label">Vidéos</span>
          </div>
          <div className="teacher-card__stat">
            <span className="teacher-card__stat-num teacher-card__stat-num--green">{visibleCount}</span>
            <span className="teacher-card__stat-label">Visibles</span>
          </div>
          <div className="teacher-card__stat">
            <span className="teacher-card__stat-num teacher-card__stat-num--orange">{hiddenCount}</span>
            <span className="teacher-card__stat-label">Masquées</span>
          </div>
          <button
            className="teacher-card__warn-btn"
            onClick={(e) => { e.stopPropagation(); onWarn(teacher); }}
          >
            <FiAlertTriangle size={14} />
            <span>Avertir</span>
          </button>
          {expanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </div>

      {/* ── Vidéos ────────────────────────────────────────────────── */}
      {expanded && (
        <div className="teacher-card__videos">
          {teacherVideos.length === 0 ? (
            <p className="teacher-card__empty">Aucune vidéo publiée</p>
          ) : (
            teacherVideos.map((v) => (
              <div key={v.id} className={`teacher-card__video ${v.status === 'hidden' ? 'teacher-card__video--hidden' : ''}`}>
                <div className="teacher-card__video-thumb">
                  <span>🎥</span>
                  {v.status === 'hidden' && <span className="teacher-card__video-badge">Masquée</span>}
                </div>
                <div className="teacher-card__video-info">
                  <h4>{v.title}</h4>
                  <p>{v.duration} • {v.views} vues</p>
                  {v.hiddenUntil && <p className="teacher-card__video-until">Masquée jusqu'au {v.hiddenUntil}</p>}
                  <div className="teacher-card__video-actions">
                    <button onClick={() => onWarnVideo(v.id, v.title, teacher.id)}>
                      <FiAlertTriangle size={13} /> Avertir
                    </button>
                    <button onClick={() => onHideVideo(v, `${teacher.prenom} ${teacher.nom}`)}>
                      <FiEyeOff size={13} /> Masquer
                    </button>
                    <button onClick={() => onDeleteVideo(v, `${teacher.prenom} ${teacher.nom}`)}>
                      <FiTrash2 size={13} /> Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherCard;