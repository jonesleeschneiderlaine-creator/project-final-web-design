// src/pages/plateforme/DashboardEns/DashboardEns.jsx
import { useAuth } from '../../../../hooks/useAuth';
import CarteStatistique from '../../../../components/plateforme/CarteStatistique/CarteStatistique';
import TableauCours from '../../../../components/plateforme/TableauCours/TableauCours';
import ActiviteRecente from '../../../../components/plateforme/ActiviteRecente/ActiviteRecente';
import TopEtudiants from '../../../../components/plateforme/TopEtudiants/TopEtudiants';
import './dashboardEns.css';

// ─── Données statiques (à remplacer par des appels API) ───────────────────────

const STATISTIQUES = [
  {
    id: 'cours',
    icone: '📖',
    titre: 'Cours publiés',
    valeur: '8',
    sousTitre: '+1 ce mois',
    variante: 'marine',
  },
  {
    id: 'etudiants',
    icone: '👥',
    titre: 'Étudiants',
    valeur: '342',
    sousTitre: '↑ 28 nouveaux',
    variante: 'vert',
  },
  {
    id: 'completion',
    icone: '✅',
    titre: 'Complétion',
    valeur: '74%',
    sousTitre: '↑ 5% ce mois',
    variante: 'orange',
  },
  {
    id: 'score',
    icone: '⭐',
    titre: 'Score quiz',
    valeur: '81%',
    sousTitre: 'Tous cours',
    variante: 'violet',
  },
];

const COURS = [
  {
    id: 1,
    icone: '📘',
    titre: 'Mathématiques Avancées',
    nbEtudiants: 124,
    completion: 78,
    scoreMoyen: 84,
    statut: 'publie',
  },
  {
    id: 2,
    icone: '🔬',
    titre: 'Sciences Naturelles',
    nbEtudiants: 89,
    completion: 61,
    scoreMoyen: 77,
    statut: 'publie',
  },
  {
    id: 3,
    icone: '📝',
    titre: 'Français',
    nbEtudiants: 67,
    completion: 82,
    scoreMoyen: 91,
    statut: 'publie',
  },
  {
    id: 4,
    icone: '🏛️',
    titre: "Histoire d'Haïti",
    nbEtudiants: 42,
    completion: 45,
    scoreMoyen: 73,
    statut: 'brouillon',
  },
  {
    id: 5,
    icone: '⚗️',
    titre: 'Chimie Générale',
    nbEtudiants: 20,
    completion: 30,
    scoreMoyen: null,
    statut: 'en_cours',
  },
];

const ACTIVITES = [
  {
    id: 1,
    type: 'inscription',
    texte: 'Jean Paul inscrit à Maths Avancées',
    temps: '5 min',
  },
  {
    id: 2,
    type: 'quiz',
    texte: 'Marie Louis — quiz Chapitre 3 terminé',
    temps: '22 min',
  },
  {
    id: 3,
    type: 'commentaire',
    texte: 'Commentaire sur Français leçon 2',
    temps: '1h',
  },
  {
    id: 4,
    type: 'certificat',
    texte: "5 certificats délivrés aujourd'hui",
    temps: '3h',
  },
];

const TOP_ETUDIANTS = [
  { id: 1, nom: 'Jean Paul Moreau', score: 95 },
  { id: 2, nom: 'Marie Louis', score: 88 },
  { id: 3, nom: 'Claude Fils', score: 81 },
  { id: 4, nom: 'Roseline Dorval', score: 76 },
];

// ─── Composant principal ──────────────────────────────────────────────────────

const DashboardEns = () => {
  const { user } = useAuth();

  const handleModifierCours = (cours) => {
    navigate(`/plateforme/cours/${cours.id}/modifier`);
  };

  const handleStatistiquesCours = (cours) => {
    navigate(`/plateforme/cours/${cours.id}/statistiques`);
  };

  const handleSupprimerCours = (cours) => {
    // À remplacer par une modale de confirmation
    console.log('Supprimer cours :', cours.id);
  };

  return (
    <div className="dashboard-ens">
      {/* ── Cartes statistiques ──────────────────────────────────────────── */}
      <section className="dashboard-ens__cartes">
        {STATISTIQUES.map((stat) => (
          <CarteStatistique key={stat.id} {...stat} />
        ))}
      </section>

      {/* ── Tableau des cours ────────────────────────────────────────────── */}
      <section className="dashboard-ens__section">
        <h2 className="dashboard-ens__section-titre">Mes cours</h2>
        <TableauCours
          cours={COURS}
          onModifier={handleModifierCours}
          onStatistiques={handleStatistiquesCours}
          onSupprimer={handleSupprimerCours}
        />
      </section>

      {/* ── Bas de page : activité + top étudiants ──────────────────────── */}
      <div className="dashboard-ens__bas">
        <ActiviteRecente activites={ACTIVITES} />
        <TopEtudiants etudiants={TOP_ETUDIANTS} />
      </div>
    </div>
  );
};

export default DashboardEns;