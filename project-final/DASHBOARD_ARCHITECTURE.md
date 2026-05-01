# Architecture des Dashboards - Guide pour les Collaborateurs

## 📋 Vue d'ensemble

Les dashboards étudiant et enseignant suivent une architecture modulaire et scalable. Chaque route affiche un contenu distinct avec un routage imbriqué via `<Outlet />`.

## 🏗️ Structure du Projet

```
src/
├── components/
│   ├── shared/
│   │   ├── StatCard.jsx          // Composant réutilisable pour les stats
│   │   ├── StatCard.css
│   │   ├── CourseCard.jsx        // Composant réutilisable pour les cours
│   │   └── CourseCard.css
│   └── plateforme/
│       ├── PlateformeLayout.jsx  // Layout principal avec <Outlet />
│       └── Sidebar/
│           └── Sidebar.jsx       // Navigation bleue #1E3A8A
├── pages/
│   └── plateforme/
│       ├── Dashboard/
│       │   ├── Etudiant/
│       │   │   ├── DashboardEt.jsx      // Layout étudiant
│       │   │   ├── DashboardEtHome.jsx  // Page d'accueil
│       │   │   ├── Cours.jsx            // Page mes cours
│       │   │   ├── Progression.jsx      // Page ma progression
│       │   │   ├── Certificats.jsx      // Page mes certificats
│       │   │   └── dashboardEt.css
│       │   └── Enseignant/
│       │       ├── DashboardEns.jsx     // Layout enseignant
│       │       ├── DashboardEnsHome.jsx // Page d'accueil
│       │       ├── DashboardEnsCours.jsx
│       │       ├── DashboardEnsCreate.jsx
│       │       ├── DashboardEnsStats.jsx
│       │       └── dashboardEns.css
└── lib/
    └── mockData.js  // Données mock centralisées
```

## 🎨 Design System

### Couleurs Primaires
- **Bleu Primaire**: `#1E3A8A` (titres, boutons principaux, bordures actives)
- **Orange Accent**: `#F97316` (action, hover, indicateurs)
- **Vert Succès**: `#10B981` (statut complété)
- **Gris Texte**: `#374151` (texte body)
- **Fond Clair**: `#F9FAFB` (backgrounds secondaires)

### Composants Réutilisables

#### `StatCard` - Cartes de Statistiques
```jsx
<StatCard
  icon="📚"
  label="Cours en cours"
  value={4}
  color="blue"  // blue | green | orange | purple
/>
```

#### `CourseCard` - Cartes de Cours
```jsx
<CourseCard
  title="Python pour débutants"
  instructor="Eng. Jean Sophie"
  progress={72}  // 0-100
  status="En cours"
  variant="default"  // default | orange | blue | green
/>
```

## 📂 Données Mock

Toutes les données mock sont centralisées dans `src/lib/mockData.js` pour faciliter la maintenance.

### À utiliser pour les pages
```js
import { studentStats, studentCourses, teacherStats } from "../../lib/mockData"
```

### Format des données
```js
export const studentCourses = [
  {
    id: 1,
    title: "Titre du cours",
    status: "En cours",  // En cours | Terminé | Non commencé
    progress: 46,       // 0-100 pour les étudiants
    instructor: "Nom",
    variant: "default"  // optional
  }
]
```

## 🎯 Routage

### Étudiant
- `/plateforme` → DashboardEt (Layout) → DashboardEtHome (contenu)
- `/plateforme/cours` → Cours
- `/plateforme/progression` → Progression
- `/plateforme/certificats` → Certificats

### Enseignant
- `/plateforme/enseignant` → DashboardEns (Layout) → DashboardEnsHome
- `/plateforme/enseignant/cours` → DashboardEnsCours
- `/plateforme/enseignant/create` → DashboardEnsCreate
- `/plateforme/enseignant/stats` → DashboardEnsStats

## 🔧 Comment Ajouter une Nouvelle Page

1. **Créer le fichier** dans `src/pages/plateforme/Dashboard/[ROLE]/[PageName].jsx`

2. **Importer (obligatoire)** le CSS et les composants
```jsx
import "./dashboardEt.css"  // ou dashboardEns.css
import StatCard from "../../../../components/shared/StatCard"
import { mockData } from "../../../../lib/mockData"
```

3. **Structure basique**
```jsx
const NomPage = () => {
  return (
    <div className="student-page">  {/* ou dashboard-enseignant-page */}
      <header className="page-header">
        <h2>Titre de la page</h2>
        <p>Description courte</p>
      </header>
      
      {/* Contenu */}
    </div>
  )
}

export default NomPage
```

4. **Enregistrer la route** dans `src/App.jsx`
```jsx
import NomPage from "./pages/plateforme/Dashboard/[ROLE]/NomPage"

// Dans les routes imbriquées
<Route path="route-name" element={<NomPage />} />
```

## 📏 Conventions CSS

- **Grille responsif**: `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`
- **Ombres**: `box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06)`
- **Rayons**: `border-radius: 12px` (cartes), `8px` (éléments)
- **Espacements**: `gap: 20px` entre éléments, `padding: 24px` intérieur

## 🎭 Classes CSS Disponibles

### Layouts
- `.dashboard-etudiant-home`
- `.student-page`
- `.dashboard-enseignant-home`
- `.dashboard-enseignant-page`

### Sections
- `.page-header`
- `.dashboard-header`
- `.stats-grid`
- `.course-grid`
- `.cards-section`

### Éléments
- `.stat-card`
- `.course-card`
- `.progress-card`
- `.certificate-card`
- `.primary-button`
- `.secondary-button`

## 🚀 Étapes Suivantes

1. **Intégrer Chart.js** pour les graphiques dans `DashboardEnsStats`
2. **Ajouter des icônes Font Awesome** à la sidebar avec libraire
3. **Implémenter des filtres** sur les pages de listes
4. **Connecter les données** avec Supabase (remplacer mockData)
5. **Ajouter des animations** de transition entre pages

## 💡 Bonnes Pratiques

✅ **À faire**
- Utiliser les composants réutilisables
- Importer depuis `mockData.js` (centralisé)
- Suivre la structure CSS existante
- Utiliser la palette de couleurs définie
- Tester le build avant commit

❌ **À éviter**
- CSS inline
- Données hardcodées dans les composants
- Réinventer des composants existants
- Ignorer la cohérence visuelle

---

**Dernière mise à jour**: 1 mai 2026
**Responsable**: Équipe Frontend
