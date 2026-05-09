// src/components/plateforme/Etudiant/ActivityItem/ActivityItem.jsx
// ─── Ligne activité récente ─────────────────────────────────────────────────

import './activityItem.css';

const ICON_BG = { score: 'blue', duration: 'green', status: 'orange' };

const ActivityItem = ({ activity }) => (
  <div className="activity-item">
    <div className={`activity-item__icon activity-item__icon--${ICON_BG[activity.type] || 'blue'}`}>
      {activity.icon}
    </div>
    <div className="activity-item__content">
      <strong>{activity.action}</strong>
      <span className="activity-item__title">{activity.title}</span>
      <span className="activity-item__time">{activity.time}</span>
    </div>
  </div>
);

export default ActivityItem;