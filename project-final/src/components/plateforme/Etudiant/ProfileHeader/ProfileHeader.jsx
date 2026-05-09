// src/components/plateforme/Etudiant/ProfileHeader/ProfileHeader.jsx
// ─── En-tête profil ─────────────────────────────────────────────────────────

import { FiCalendar, FiStar, FiAward } from 'react-icons/fi';
import './profileHeader.css';

const ProfileHeader = ({ student }) => (
  <div className="profile-header">
    <div className="profile-header__cover" />
    <div className="profile-header__info">
      <div className="profile-header__avatar">
        {student.prenom[0]}{student.nom[0]}
      </div>
      <h1>{student.prenom} {student.nom}</h1>
      <p className="profile-header__email">{student.email}</p>
      <div className="profile-header__badges">
        <span><FiCalendar size={14} /> Membre depuis {student.memberSince}</span>
        <span><FiStar size={14} /> {student.points} points</span>
        <span><FiAward size={14} /> Niveau {student.level}</span>
      </div>
    </div>
  </div>
);

export default ProfileHeader;