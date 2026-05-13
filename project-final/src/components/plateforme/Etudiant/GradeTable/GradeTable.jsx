// src/components/plateforme/Etudiant/GradeTable/GradeTable.jsx
// ─── Tableau notes ──────────────────────────────────────────────────────────

import { FiCheckCircle, Fi// alertTriangle, FiXCircle } from 'react-icons/fi';
import './gradeTable.css';

const STATUS_ICON = {
  success: FiCheckCircle,
  warning: Fi// alertTriangle,
  fail: FiXCircle,
};

const GradeTable = ({ grades }) => (
  <table className="grade-table">
    <thead>
      <tr>
        <th>Cours</th>
        <th>Quiz 1</th>
        <th>Quiz 2</th>
        <th>Examen</th>
        <th>Moyenne</th>
        <th>Statut</th>
      </tr>
    </thead>
    <tbody>
      {grades.map((g, i) => {
        const Icon = STATUS_ICON[g.status];
        return (
          <tr key={i}>
            <td><strong>{g.course}</strong></td>
            <td>{g.quiz1}%</td>
            <td>{g.quiz2}%</td>
            <td>{g.exam ? `${g.exam}%` : '—'}</td>
            <td>{g.average}%</td>
            <td>
              <span className={`grade-table__status grade-table__status--${g.status}`}>
                <Icon size={14} /> {g.statusText}
              </span>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default GradeTable;