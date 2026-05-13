// src/pages/plateforme/Dashboard/Etudiant/DashboardEt.jsx
// ─── Dashboard étudiant ──────────────────────────────────────────────────────

import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import { FiBell, FiChevronDown, FiLogOut } from 'react-icons/fi';
import WelcomeBanner from '../../../../components/plateforme/Etudiant/WelcomeBanner/WelcomeBanner';
import CourseCard from '../../../../components/plateforme/Etudiant/CourseCard/CourseCard';
import DevoirCard from '../../../../components/plateforme/Etudiant/DevoirCard/DevoirCard';
import ActivityItem from '../../../../components/plateforme/Etudiant/ActivityItem/ActivityItem';
import GradeTable from '../../../../components/plateforme/Etudiant/GradeTable/GradeTable';
import CertificateCard from '../../../../components/plateforme/Etudiant/CertificateCard/CertificateCard';
import { SettingsSection, SettingRow } from '../../../../components/plateforme/Etudiant/SettingsSection/SettingsSection';
import ProfileHeader from '../../../../components/plateforme/Etudiant/ProfileHeader/ProfileHeader';
import './dashboardEt.css';

// ─── Données mock ──────────────────────────────────────────────────────────

const COURSES = [
  { id: 1, title: 'Mathématiques Avancées', chapter: 'Chapitre 4 - Algèbre linéaire', progress: 75, lessons: 12, subject: 'math', teacher: 'Professeur Marie Pierre' },
  { id: 2, title: 'Sciences Naturelles', chapter: 'Chapitre 2 - La cellule', progress: 45, lessons: 8, subject: 'science', teacher: 'Professeur Jean Claude' },
  { id: 3, title: 'Français', chapter: 'Chapitre 5 - Littérature', progress: 90, lessons: 10, subject: 'french', teacher: 'Professeur Rose Delva' },
  { id: 4, title: "Histoire d'Haïti", chapter: 'Chapitre 1 - Toussaint Louverture', progress: 30, lessons: 6, subject: 'history', teacher: 'Professeur Paul Antoine' },
  { id: 5, title: 'Anglais', chapter: 'Chapitre 1 - Introduction', progress: 15, lessons: 12, subject: 'english', teacher: 'Professeur Sarah James' },
  { id: 6, title: 'Informatique', chapter: 'Chapitre 3 - Programmation', progress: 60, lessons: 7, subject: 'computer', teacher: 'Professeur Marc Wilson' },
];

const DEVOIRS = [
  { id: 1, matiere: 'Mathématiques', subject: 'math', title: 'Devoir Chapitre 4 - Algèbre linéaire', pubDate: '15 Avril 2026', deadline: '22 Avril 2026 - 23h59', statut: 'urgent', statusText: 'Délai imminent' },
  { id: 2, matiere: 'Sciences', subject: 'science', title: 'Exposé - La cellule et son fonctionnement', pubDate: '18 Avril 2026', deadline: '28 Avril 2026 - 23h59', statut: 'normal', statusText: 'À rendre' },
];

const ACTIVITIES = [
  { id: 1, icon: '📝', type: 'score', action: 'Quiz terminé', title: 'Mathématiques - Chapitre 3', time: 'Il y a 2 heures' },
  { id: 2, icon: '🎥', type: 'duration', action: 'Vidéo visionnée', title: 'Sciences - La cellule (Chapitre 2)', time: 'Hier - 14:30' },
  { id: 3, icon: '📄', type: 'status', action: 'Devoir rendu', title: 'Français - Rédaction', time: 'Hier - 09:15' },
];

const GRADES = [
  { course: 'Mathématiques Avancées', quiz1: 85, quiz2: 78, exam: 92, average: 85, status: 'success', statusText: 'Réussi' },
  { course: 'Sciences Naturelles', quiz1: 76, quiz2: 82, exam: 88, average: 82, status: 'success', statusText: 'Réussi' },
  { course: 'Français', quiz1: 94, quiz2: 91, exam: 96, average: 94, status: 'success', statusText: 'Réussi' },
  { course: "Histoire d'Haïti", quiz1: 65, quiz2: 70, exam: 72, average: 69, status: 'warning', statusText: 'En cours' },
  { course: 'Anglais', quiz1: 45, quiz2: 52, exam: null, average: 48, status: 'fail', statusText: 'À reprendre' },
];

const CERTIFICATES = [
  { title: 'Mathématiques Avancées', date: '15 Mars 2026' },
  { title: 'Sciences Naturelles', date: '10 Février 2026' },
  { title: 'Français', date: '05 Janvier 2026' },
];

const STUDENT = {
  prenom: 'Jean-Paul',
  nom: 'Moreau',
  email: 'jeanpaul.moreau@eduhaiti.com',
  memberSince: 'Janvier 2025',
  points: 342,
  level: 4,
};

// ─── Tabs ──────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'courses', label: 'Mes cours' },
  { id: 'grades', label: 'Grades' },
  { id: 'settings', label: 'Paramètres' },
];

// ─── Composant ─────────────────────────────────────────────────────────────

const DashboardEt = () => {
  const { role, loading, user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courseFilter, setCourseFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [quizReminders, setQuizReminders] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [shareProgress, setShareProgress] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  const prenom = user?.user_metadata?.full_name?.split(' ')[0] || STUDENT.prenom;

  // ── Filtres ────────────────────────────────────────────────────
  const filteredCourses = courseFilter === 'all'
    ? COURSES
    : COURSES.filter((c) => {
        if (courseFilter === 'ongoing') return c.progress > 0 && c.progress < 100;
        if (courseFilter === 'completed') return c.progress === 100;
        if (courseFilter === 'upcoming') return c.progress === 0;
        return true;
      });

  // ── Loading / redirect ────────────────────────────────────────
  if (loading) return <div className="dashboard-et__loading"><span className="spinner" /> Chargement...</div>;
  if (role === 'enseignant') return <Navigate to="/plateforme/enseignant" replace />;

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className={`dashboard-et ${darkMode ? 'dashboard-et--dark' : ''}`}>
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="dashboard-et__header">
        

        <nav className="dashboard-et__nav">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={activeTab === t.id ? 'active' : ''}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        
      </header>

      {/* ── Main ────────────────────────────────────────────────── */}
      <main className="dashboard-et__main">
        {activeTab === 'dashboard' && (
          <>
            <WelcomeBanner
              prenom={prenom}
              progress={65}
              stats={[
                { label: 'Cours inscrits', value: '8', trend: '+2' },
                { label: "Heures d'étude", value: '47', trend: '+12' },
                { label: 'Points XP', value: '342', trend: '+45' },
              ]}
            />

            <div className="dashboard-et__columns">
              <div className="dashboard-et__left">
                <div className="dashboard-et__section">
                  <div className="dashboard-et__section-head">
                    <h2>Actualités & Devoirs</h2>
                    <span className="dashboard-et__new-badge">Nouveau</span>
                  </div>
                  <div className="dashboard-et__devoirs">
                    {DEVOIRS.map((d) => <DevoirCard key={d.id} devoir={d} />)}
                  </div>
                  <button className="dashboard-et__view-all">Voir tous les devoirs</button>
                </div>

                <div className="dashboard-et__section">
                  <h2>Activité récente</h2>
                  <div className="dashboard-et__activities">
                    {ACTIVITIES.map((a) => <ActivityItem key={a.id} activity={a} />)}
                  </div>
                  <button className="dashboard-et__view-all">Voir toute l'activité</button>
                </div>
              </div>

              <div className="dashboard-et__right">
                <div className="dashboard-et__section dashboard-et__section--courses">
                  <div className="dashboard-et__section-head">
                    <h2>Mes cours en cours</h2>
                    <div className="dashboard-et__filters">
                      {['all', 'math', 'science', 'french'].map((f) => (
                        <button key={f} className={courseFilter === f ? 'active' : ''} onClick={() => setCourseFilter(f)}>
                          {f === 'all' ? 'Tous' : f === 'math' ? 'Maths' : f === 'science' ? 'Sciences' : 'Français'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="dashboard-et__courses-list">
                    {filteredCourses.map((c) => (
                      <CourseCard key={c.id} course={c} variant="list" onContinue={() => {}} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'courses' && (
          <>
            <h1>Mes cours</h1>
            <div className="dashboard-et__filters dashboard-et__filters--mb">
              {[
                { id: 'all', label: 'Tous' },
                { id: 'ongoing', label: 'En cours' },
                { id: 'completed', label: 'Terminés' },
                { id: 'upcoming', label: 'À venir' },
              ].map((f) => (
                <button key={f.id} className={courseFilter === f.id ? 'active' : ''} onClick={() => setCourseFilter(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
            <div className="dashboard-et__courses-list">
              {filteredCourses.map((c) => (
                <CourseCard key={c.id} course={c} variant="list" onContinue={() => {}} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'profile' && (
          <div className="dashboard-et__profile">
            <ProfileHeader student={STUDENT} />
            <div className="dashboard-et__section">
              <h2>Informations personnelles</h2>
              <div className="dashboard-et__form-row">
                <label>Nom complet <input type="text" defaultValue={STUDENT.prenom + ' ' + STUDENT.nom} /></label>
                <label>Date de naissance <input type="date" defaultValue="2005-03-15" /></label>
              </div>
              <div className="dashboard-et__form-row">
                <label>Email <input type="email" defaultValue={STUDENT.email} /></label>
                <label>Téléphone <input type="tel" defaultValue="+509 1234 5678" /></label>
              </div>
              <button className="dashboard-et__btn-primary">Mettre à jour</button>
            </div>
          </div>
        )}

        {activeTab === 'grades' && (
          <>
            <h1>Mes notes et certificats</h1>
            <div className="dashboard-et__gpa">
              <span className="dashboard-et__gpa-value">92<span>%</span></span>
              <div>
                <h3>Moyenne générale</h3>
                <p>Félicitations ! Vous êtes dans le top 15% de votre classe.</p>
              </div>
            </div>
            <div className="dashboard-et__section">
              <h2>Relevé de notes</h2>
              <GradeTable grades={GRADES} />
            </div>
            <div className="dashboard-et__section">
              <h2>Certificats obtenus</h2>
              <div className="dashboard-et__certs">
                {CERTIFICATES.map((c, i) => <CertificateCard key={i} {...c} />)}
              </div>
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <div className="dashboard-et__settings">
            <h1>Paramètres</h1>
            <SettingsSection title="Notifications">
              <SettingRow label="Notifications par email" desc="// alertes pour nouveaux cours et quiz" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
              <SettingRow label="Rappels de quiz" desc="Rappel 24h avant chaque quiz" checked={quizReminders} onChange={(e) => setQuizReminders(e.target.checked)} />
              <SettingRow label="Newsletter pédagogique" desc="Conseils et ressources éducatives" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
            </SettingsSection>
            <SettingsSection title="Apparence">
              <SettingRow label="Mode sombre" desc="Changez l'apparence de l'interface" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
            </SettingsSection>
            <SettingsSection title="Confidentialité">
              <SettingRow label="Profil public" desc="Permettre aux autres étudiants de voir mon profil" checked={publicProfile} onChange={(e) => setPublicProfile(e.target.checked)} />
              <SettingRow label="Partager ma progression" desc="Afficher ma progression sur le classement" checked={shareProgress} onChange={(e) => setShareProgress(e.target.checked)} />
              <button className="dashboard-et__btn-outline">Changer le mot de passe</button>
            </SettingsSection>
            <SettingsSection title="Zone dangereuse" danger>
              <p>Supprimer définitivement votre compte et toutes vos données</p>
              <button className="dashboard-et__btn-danger">Supprimer mon compte</button>
            </SettingsSection>
            <div className="dashboard-et__settings-actions">
              <button className="dashboard-et__btn-cancel">Annuler</button>
              <button className="dashboard-et__btn-primary">Sauvegarder</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardEt;