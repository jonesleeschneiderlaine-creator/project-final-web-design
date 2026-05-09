// src/components/plateforme/Etudiant/CertificateCard/CertificateCard.jsx
// ─── Carte certificat ────────────────────────────────────────────────────────

import { FiAward, FiDownload } from 'react-icons/fi';
import './certificateCard.css';

const CertificateCard = ({ title, date }) => (
  <div className="cert-card">
    <FiAward className="cert-card__icon" size={36} />
    <h3>{title}</h3>
    <p>Obtenu le {date}</p>
    <button className="cert-card__btn">
      <FiDownload size={14} /> Télécharger PDF
    </button>
  </div>
);

export default CertificateCard;