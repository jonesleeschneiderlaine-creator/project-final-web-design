// src/components/Admin/LogList/LogList.jsx
// ─── Liste journaux ──────────────────────────────────────────────────────────

import { FiCalendar, FiUser } from 'react-icons/fi';
import './logList.css';

const LogList = ({ logs }) => (
  <div className="log-list">
    {logs.map((log, i) => (
      <div key={i} className="log-list__entry">
        <span className="log-list__time">
          <FiCalendar size={13} /> {log.time}
        </span>
        <span className="log-list__action">{log.action}</span>
        <span className="log-list__user">
          <FiUser size={13} /> {log.user}
        </span>
        <span className="log-list__detail">{log.details}</span>
      </div>
    ))}
    {logs.length === 0 && (
      <p className="log-list__empty">Aucune activité enregistrée</p>
    )}
  </div>
);

export default LogList;