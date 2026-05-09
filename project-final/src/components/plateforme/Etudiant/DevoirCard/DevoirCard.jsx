// src/components/plateforme/Etudiant/DevoirCard/DevoirCard.jsx
// ─── Carte devoir ────────────────────────────────────────────────────────────

import { FiCalendar, FiClock, FiSend, FiArrowRight } from 'react-icons/fi';
import './devoirCard.css';

const SUBJECT_CLASS = {
  math: 'devoir-card--math',
  science: 'devoir-card--science',
  french: 'devoir-card--french',
  history: 'devoir-card--history',
};

const DevoirCard = ({ devoir }) => (
  <div className={`devoir-card ${devoir.statut === 'urgent' ? 'devoir-card--urgent' : ''}`}>
    <div className="devoir-card__head">
      <span className={`devoir-card__subject ${SUBJECT_CLASS[devoir.subject] || ''}`}>
        {devoir.matiere}
      </span>
      <span className={`devoir-card__status ${devoir.statut === 'urgent' ? 'devoir-card__status--urgent' : ''}`}>
        {devoir.statusText}
      </span>
    </div>

    <h4 className="devoir-card__title">{devoir.title}</h4>

    <div className="devoir-card__dates">
      <span><FiCalendar size={12} /> {devoir.pubDate}</span>
      <span className="devoir-card__deadline">
        <FiClock size={12} /> {devoir.deadline}
      </span>
    </div>

    <div className="devoir-card__actions">
      <button className="devoir-card__btn devoir-card__btn--submit">
        <FiSend size={12} /> Rendre
      </button>
      <button className="devoir-card__btn devoir-card__btn--details">
        Voir <FiArrowRight size={12} />
      </button>
    </div>
  </div>
);

export default DevoirCard;