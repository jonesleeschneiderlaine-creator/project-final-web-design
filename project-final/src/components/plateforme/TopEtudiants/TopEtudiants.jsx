// src/components/plateforme/TopEtudiants/TopEtudiants.jsx
import './topEtudiants.css';

const COULEURS_AVATAR = ['#1a5cb8', '#7c3aed', '#e07820', '#1e9e5c', '#e53e3e'];

const LigneEtudiant = ({ etudiant, rang }) => {
  const couleur = COULEURS_AVATAR[rang % COULEURS_AVATAR.length];
  const initiales = etudiant.nom
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const scoreColor =
    etudiant.score >= 90
      ? '#1e9e5c'
      : etudiant.score >= 80
      ? '#2ecc71'
      : '#1a9e55';

  return (
    <div className="top-etudiants__ligne">
      <div className="top-etudiants__avatar" style={{ background: couleur }}>
        {initiales}
      </div>
      <div className="top-etudiants__info">
        <p className="top-etudiants__nom">{etudiant.nom}</p>
        <div className="top-etudiants__barre-conteneur">
          <div className="top-etudiants__barre">
            <div
              className="top-etudiants__barre-remplissage"
              style={{ width: `${etudiant.score}%` }}
            />
          </div>
        </div>
      </div>
      <span className="top-etudiants__score" style={{ color: scoreColor }}>
        {etudiant.score}%
      </span>
    </div>
  );
};

const TopEtudiants = ({ etudiants }) => {
  return (
    <div className="top-etudiants">
      <h3 className="top-etudiants__titre">Top étudiants cette semaine</h3>
      <div className="top-etudiants__liste">
        {etudiants.map((etudiant, index) => (
          <LigneEtudiant key={etudiant.id} etudiant={etudiant} rang={index} />
        ))}
      </div>
    </div>
  );
};

export default TopEtudiants;
