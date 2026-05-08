// src/components/Admin/ReportCard/ReportCard.jsx
// ─── Carte signalement ────────────────────────────────────────────────────────

import { FiUser, FiCalendar, FiAlertCircle, FiCheck, FiLock } from 'react-icons/fi';
import './reportCard.css';

const ReportCard = ({ report, onIgnore, onBlock }) => (
  <div className="report-card">
    <div className="report-card__head">
      <span className="report-card__user">
        <FiUser size={14} /> {report.userName}
      </span>
      <span className="report-card__date">
        <FiCalendar size={14} /> {report.date}
      </span>
    </div>
    <p className="report-card__reason">
      <FiAlertCircle size={14} /> {report.reason}
    </p>
    <div className="report-card__actions">
      <button onClick={onIgnore}>
        <FiCheck size={14} /> Ignorer
      </button>
      <button onClick={onBlock}>
        <FiLock size={14} /> Bloquer
      </button>
    </div>
  </div>
);

export default ReportCard;