// src/components/plateforme/TableauCours/TableauCours.jsx
import { FiEdit2, FiTrash2, FiBarChart2 } from 'react-icons/fi';
import './tableauCours.css';

const STATUT_CONFIG = {
  publie: { label: 'Publié', classe: 'badge--publie' },
  brouillon: { label: 'Brouillon', classe: 'badge--brouillon' },
  en_cours: { label: 'En cours', classe: 'badge--en-cours' },
};

const LigneCours = ({ cours, onModifier, onStatistiques, onSupprimer }) => {
  const statut = STATUT_CONFIG[cours.statut] || STATUT_CONFIG.brouillon;

  return (
    <tr className="tableau-cours__ligne">
      <td className="tableau-cours__cellule tableau-cours__cellule--titre">
        <span className="tableau-cours__icone-cours">{cours.icone}</span>
        <span className="tableau-cours__nom">{cours.titre}</span>
      </td>
      <td className="tableau-cours__cellule">
        <span className="tableau-cours__etudiants">
          👥 {cours.nbEtudiants}
        </span>
      </td>
      <td className="tableau-cours__cellule">
        <div className="tableau-cours__completion">
          <div className="barre-progression">
            <div
              className="barre-progression__remplissage"
              style={{ width: `${cours.completion}%` }}
            />
          </div>
          <span className="tableau-cours__pourcentages">
            {cours.completion}%
            {cours.scoreMoyen !== null ? (
              <span className="tableau-cours__score-secondaire">{cours.scoreMoyen}%</span>
            ) : (
              <span className="tableau-cours__score-secondaire">—</span>
            )}
          </span>
        </div>
      </td>
      <td className="tableau-cours__cellule">
        {cours.scoreMoyen !== null ? `${cours.scoreMoyen}%` : '—'}
      </td>
      <td className="tableau-cours__cellule">
        <span className={`badge ${statut.classe}`}>{statut.label}</span>
      </td>
      <td className="tableau-cours__cellule tableau-cours__cellule--actions">
        <button
          className="action-btn action-btn--modifier"
          onClick={() => onModifier?.(cours)}
          title="Modifier"
        >
          <FiEdit2 size={15} />
        </button>
        <button
          className="action-btn action-btn--statistiques"
          onClick={() => onStatistiques?.(cours)}
          title="Statistiques"
        >
          <FiBarChart2 size={15} />
        </button>
        <button
          className="action-btn action-btn--supprimer"
          onClick={() => onSupprimer?.(cours)}
          title="Supprimer"
        >
          <FiTrash2 size={15} />
        </button>
      </td>
    </tr>
  );
};

const TableauCours = ({ cours, onModifier, onStatistiques, onSupprimer }) => {
  return (
    <div className="tableau-cours__conteneur">
      <table className="tableau-cours">
        <thead className="tableau-cours__entete">
          <tr>
            <th className="tableau-cours__en-tete-cellule">Titre du cours</th>
            <th className="tableau-cours__en-tete-cellule">Étudiants</th>
            <th className="tableau-cours__en-tete-cellule">Complétion</th>
            <th className="tableau-cours__en-tete-cellule">Score moy.</th>
            <th className="tableau-cours__en-tete-cellule">Statut</th>
            <th className="tableau-cours__en-tete-cellule">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cours.map((c) => (
            <LigneCours
              key={c.id}
              cours={c}
              onModifier={onModifier}
              onStatistiques={onStatistiques}
              onSupprimer={onSupprimer}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableauCours;
