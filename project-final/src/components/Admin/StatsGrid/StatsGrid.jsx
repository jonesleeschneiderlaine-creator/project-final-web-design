// src/components/Admin/StatsGrid/StatsGrid.jsx
// ─── Grille statistiques ──────────────────────────────────────────────────────

import { FiUsers, FiUserCheck, FiUserX, FiVideo } from 'react-icons/fi';
import './statsGrid.css';

const STATS_CONFIG = [
  { key: 'totalStudents',  icon: FiUsers,     label: 'Étudiants',       color: 'blue' },
  { key: 'totalTeachers',  icon: FiUserCheck, label: 'Enseignants',     color: 'green' },
  { key: 'blockedUsers',   icon: FiUserX,     label: 'Bloqués',         color: 'orange' },
  { key: 'totalVideos',    icon: FiVideo,     label: 'Vidéos totales',  color: 'purple' },
];

const StatsGrid = ({ stats }) => (
  <div className="stats-grid">
    {STATS_CONFIG.map(({ key, icon: Icon, label, color }) => (
      <div key={key} className="stats-grid__card">
        <div className={`stats-grid__icon stats-grid__icon--${color}`}>
          <Icon size={28} />
        </div>
        <div className="stats-grid__info">
          <span className="stats-grid__value">{stats[key]}</span>
          <span className="stats-grid__label">{label}</span>
        </div>
      </div>
    ))}
  </div>
);

export default StatsGrid;