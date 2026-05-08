// src/pages/plateforme/Admin/Admin.jsx
// ─── Page admin ──────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiRotateCw } from 'react-icons/fi';
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar';
import StatsGrid from '../../components/Admin/StatsGrid/StatsGrid';
import UsersTable from '../../components/Admin/UsersTable/UsersTable';
import TeacherCard from '../../components/Admin/TeacherCard/TeacherCard';
import TeacherForm from '../../components/Admin/TeacherForm/TeacherForm';
import ReportCard from '../../components/Admin/ReportCard/ReportCard';
import LogList from '../../components/Admin/LogList/LogList';
import Modal from '../../components/Admin/Modal/Modal';
import './admin.css';

// ── Données mock temporaires ────────────────────────────────────────────────
const USERS_MOCK = [
  { id: 1, nom: 'Moreau', prenom: 'Jean Paul', email: 'jean.moreau@email.com', phone: '+509 1234 5678', role: 'student', status: 'active', blockUntil: null, avatar: 'JP' },
  { id: 2, nom: 'Louis', prenom: 'Marie', email: 'marie.louis@email.com', phone: '+509 2345 6789', role: 'student', status: 'active', blockUntil: null, avatar: 'ML' },
  { id: 3, nom: 'Pierre', prenom: 'Marie', email: 'marie.pierre@eduhaiti.com', phone: '+509 3456 7890', role: 'teacher', status: 'active', blockUntil: null, avatar: 'MP' },
  { id: 4, nom: 'Bernard', prenom: 'Lucien', email: 'lucien.bernard@email.com', phone: '+509 4567 8901', role: 'student', status: 'active', blockUntil: null, avatar: 'LB' },
  { id: 5, nom: 'Joseph', prenom: 'Jean Claude', email: 'jeanclaude.joseph@email.com', phone: '+509 5678 9012', role: 'teacher', status: 'active', blockUntil: null, avatar: 'JC' },
  { id: 6, nom: 'Delva', prenom: 'Rose', email: 'rose.delva@eduhaiti.com', phone: '+509 6789 0123', role: 'teacher', status: 'active', blockUntil: null, avatar: 'RD' },
  { id: 7, nom: 'Antoine', prenom: 'Paul', email: 'paul.antoine@eduhaiti.com', phone: '+509 7890 1234', role: 'teacher', status: 'blocked', blockUntil: '2026-05-15', avatar: 'PA' },
];

const VIDEOS_MOCK = [
  { id: 1, title: 'Intro mathématiques avancées', teacherId: 3, teacherName: 'Marie Pierre', duration: '24:35', views: 1234, status: 'visible', hiddenUntil: null },
  { id: 2, title: 'Équations du second degré', teacherId: 3, teacherName: 'Marie Pierre', duration: '18:20', views: 892, status: 'visible', hiddenUntil: null },
  { id: 3, title: 'Trigonométrie expliquée', teacherId: 3, teacherName: 'Marie Pierre', duration: '32:15', views: 567, status: 'hidden', hiddenUntil: '2026-05-10' },
  { id: 4, title: 'Intro Python', teacherId: 5, teacherName: 'Jean Claude Joseph', duration: '45:00', views: 2100, status: 'visible', hiddenUntil: null },
  { id: 5, title: 'Boucles en Python', teacherId: 5, teacherName: 'Jean Claude Joseph', duration: '28:30', views: 1560, status: 'visible', hiddenUntil: null },
];

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // ── Données ────────────────────────────────────────────────────
  const [users, setUsers] = useState(USERS_MOCK);
  const [videos, setVideos] = useState(VIDEOS_MOCK);
  const [reports, setReports] = useState([]);
  const [logs, setLogs] = useState([]);

  // ── Filtres ────────────────────────────────────────────────────
  const [userSearch, setUserSearch] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [teacherSearch, setTeacherSearch] = useState('');

  // ── Modals ─────────────────────────────────────────────────────
  const [modal, setModal] = useState({ type: null, data: null });

  // ── Auth check mock ────────────────────────────────────────────
  // useEffect(() => {
  //   const session = localStorage.getItem('adminSession');
  //   if (session) {
  //     const { isAdmin, loginTime } = JSON.parse(session);
  //     if (isAdmin && (Date.now() - new Date(loginTime)) < 86400000) {
  //       setLoading(false);
  //       return;
  //     }
  //   }
  //   navigate('/connexion');
  // }, [navigate]);

  // ── Helpers ────────────────────────────────────────────────────
  const addLog = (action, details) => {
    setLogs((p) => [{ time: new Date().toLocaleString(), action, user: 'Admin', details }, ...p]);
  };

  const confirm = (msg) => window.confirm(msg);

  // ── Stats ──────────────────────────────────────────────────────
  const stats = {
    totalStudents: users.filter((u) => u.role === 'student').length,
    totalTeachers: users.filter((u) => u.role === 'teacher' && u.status === 'active').length,
    blockedUsers: users.filter((u) => u.status === 'blocked').length,
    totalVideos: videos.length,
  };

  // ── Utilisateurs filtrés ───────────────────────────────────────
  const filteredUsers = users.filter((u) => {
    const search = `${u.nom} ${u.prenom} ${u.email} ${u.phone}`.toLowerCase();
    const match = search.includes(userSearch.toLowerCase());
    if (userFilter === 'all') return match;
    if (userFilter === 'blocked') return match && u.status === 'blocked';
    return match && u.role === userFilter;
  });

  // ── Enseignants filtrés ────────────────────────────────────────
  const filteredTeachers = users.filter(
    (u) => u.role === 'teacher' && `${u.nom} ${u.prenom}`.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  // ── Actions utilisateurs ───────────────────────────────────────
  const handleBlock = (user) => setModal({ type: 'block', data: user });
  const handleBan = (user) => setModal({ type: 'ban', data: user });
  const handleDeleteUser = (user) => {
    if (confirm(`Supprimer ${user.prenom} ${user.nom} ?`)) {
      setUsers((p) => p.filter((u) => u.id !== user.id));
      addLog('Suppression', `${user.prenom} ${user.nom} supprimé`);
    }
  };

  // ── Actions enseignants ────────────────────────────────────────
  const handleWarnTeacher = (teacher) => setModal({ type: 'warn', data: teacher });
  const handleWarnVideo = (videoId, title, teacherId) => {
    const teacher = users.find((u) => u.id === teacherId);
    if (confirm(`Avertir pour la vidéo "${title}" ?`)) {
      addLog('Avertissement vidéo', `${teacher?.prenom} ${teacher?.nom} — "${title}"`);
    }
  };
  const handleHideVideo = (video, teacherName) => setModal({ type: 'hideVideo', data: { ...video, teacherName } });
  const handleDeleteVideo = (video, teacherName) => {
    if (confirm(`Supprimer "${video.title}" ?`)) {
      setVideos((p) => p.filter((v) => v.id !== video.id));
      addLog('Suppression vidéo', `"${video.title}" (${teacherName}) supprimée`);
    }
  };

  // ── Création enseignant ────────────────────────────────────────
  const handleCreateTeacher = async (form) => {
    const newTeacher = {
      id: Date.now(),
      nom: form.nom,
      prenom: form.prenom,
      email: form.email,
      phone: form.phone,
      role: 'teacher',
      status: 'active',
      blockUntil: null,
      avatar: form.avatar || (form.prenom[0] + form.nom[0]).toUpperCase(),
    };
    setUsers((p) => [...p, newTeacher]);
    addLog('Création enseignant', `${form.prenom} ${form.nom}`);
  };

  // ── Confirmation modals ────────────────────────────────────────
  const confirmBlock = (duration, reason) => {
    const u = modal.data;
    const until = duration === 'permanent' ? null : new Date(Date.now() + duration * 86400000).toISOString().split('T')[0];
    setUsers((p) => p.map((x) => (x.id === u.id ? { ...x, status: 'blocked', blockUntil: until } : x)));
    addLog('Blocage', `${u.prenom} ${u.nom} — ${duration === 'permanent' ? 'permanent' : duration + 'j'} — ${reason || 'Non spécifié'}`);
    setModal({ type: null, data: null });
  };

  const confirmBan = (type, reason) => {
    const u = modal.data;
    setUsers((p) => p.filter((x) => x.id !== u.id));
    addLog('Bannissement', `${u.prenom} ${u.nom} — ${type} — ${reason || 'Non spécifié'}`);
    setModal({ type: null, data: null });
  };

  const confirmWarn = (type, message) => {
    const t = modal.data;
    addLog('Avertissement', `${t.prenom} ${t.nom} — ${type} — ${message || 'Règles non respectées'}`);
    setModal({ type: null, data: null });
  };

  const confirmHide = (duration, reason) => {
    const v = modal.data;
    const until = duration === 'permanent' ? null : new Date(Date.now() + duration * 86400000).toISOString().split('T')[0];
    setVideos((p) => p.map((x) => (x.id === v.id ? { ...x, status: 'hidden', hiddenUntil: until } : x)));
    addLog('Vidéo masquée', `"${v.title}" (${v.teacherName}) — ${duration === 'permanent' ? 'permanent' : duration + 'j'}`);
    setModal({ type: null, data: null });
  };

  // ── Export logs ────────────────────────────────────────────────
  const exportLogs = () => {
    const csv = ['Date,Action,Utilisateur,Détails', ...logs.map((l) => `"${l.time}","${l.action}","${l.user}","${l.details}"`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `admin_logs_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  // ── Loading ────────────────────────────────────────────────────
  // if (loading) return <div className="admin-loading">Chargement...</div>;

  
  return (
    <div className="admin-page">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="admin-main">
        <header className="admin-main__header">
          <h1>Administration EduHaïti</h1>
          <span className="admin-main__date">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </header>

        {activeTab === 'dashboard' && <StatsGrid stats={stats} />}

        {activeTab === 'users' && (
          <UsersTable
            users={filteredUsers}
            search={userSearch}
            onSearchChange={setUserSearch}
            filter={userFilter}
            onFilterChange={setUserFilter}
            onBlock={handleBlock}
            onBan={handleBan}
            onDelete={handleDeleteUser}
          />
        )}

        {activeTab === 'teachers' && (
          <div>
            <div className="admin-main__section-head">
              <h2>Enseignants & Vidéos</h2>
              <div className="admin-main__search">
                <input
                  type="text"
                  placeholder="Rechercher un enseignant..."
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="admin-main__teachers">
              {filteredTeachers.map((t) => (
                <TeacherCard
                  key={t.id}
                  teacher={t}
                  videos={videos}
                  onWarn={handleWarnTeacher}
                  onWarnVideo={handleWarnVideo}
                  onHideVideo={handleHideVideo}
                  onDeleteVideo={handleDeleteVideo}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'createTeacher' && (
          <TeacherForm onSubmit={handleCreateTeacher} />
        )}

        {activeTab === 'reports' && (
          <div>
            <div className="admin-main__section-head">
              <h2>Signalements</h2>
              <button onClick={() => setReports([...reports])} className="admin-main__btn">
                <FiRotateCw size={14} /> Actualiser
              </button>
            </div>
            <div className="admin-main__reports">
              {reports.length === 0 ? (
                <p className="admin-main__empty">Aucun signalement</p>
              ) : (
                reports.map((r) => (
                  <ReportCard key={r.id} report={r} onIgnore={() => setReports((p) => p.filter((x) => x.id !== r.id))} onBlock={() => {}} />
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <div className="admin-main__section-head">
              <h2>Journaux d'activité</h2>
              <button onClick={exportLogs} className="admin-main__btn">
                <FiDownload size={14} /> Exporter CSV
              </button>
            </div>
            <LogList logs={logs} />
          </div>
        )}
      </main>

      {/* ── Modals ────────────────────────────────────────────────── */}
      {modal.type === 'block' && <BlockModal user={modal.data} onConfirm={confirmBlock} onClose={() => setModal({ type: null, data: null })} />}
      {modal.type === 'ban' && <BanModal user={modal.data} onConfirm={confirmBan} onClose={() => setModal({ type: null, data: null })} />}
      {modal.type === 'warn' && <WarnModal teacher={modal.data} onConfirm={confirmWarn} onClose={() => setModal({ type: null, data: null })} />}
      {modal.type === 'hideVideo' && <HideVideoModal video={modal.data} onConfirm={confirmHide} onClose={() => setModal({ type: null, data: null })} />}
    </div>
  );
};

// ── Sous-composants modals inline (spécifiques à Admin) ──────────────────────

const BlockModal = ({ user, onConfirm, onClose }) => {
  const [duration, setDuration] = useState('7');
  const [reason, setReason] = useState('');
  return (
    <Modal isOpen onClose={onClose} title={`Bloquer ${user.prenom} ${user.nom}`} footer={
      <>
        <button className="admin-btn admin-btn--cancel" onClick={onClose}>Annuler</button>
        <button className="admin-btn admin-btn--danger" onClick={() => onConfirm(duration === 'permanent' ? 'permanent' : parseInt(duration), reason)}>Bloquer</button>
      </>
    }>
      <label>
        Durée
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="1">1 jour</option><option value="3">3 jours</option><option value="7">7 jours</option>
          <option value="15">15 jours</option><option value="30">30 jours</option><option value="permanent">Permanent</option>
        </select>
      </label>
      <label>Motif<textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Motif du blocage..." /></label>
    </Modal>
  );
};

const BanModal = ({ user, onConfirm, onClose }) => {
  const [type, setType] = useState('email');
  const [reason, setReason] = useState('');
  return (
    <Modal isOpen onClose={onClose} title={`Bannir ${user.prenom} ${user.nom}`} footer={
      <>
        <button className="admin-btn admin-btn--cancel" onClick={onClose}>Annuler</button>
        <button className="admin-btn admin-btn--danger" onClick={() => onConfirm(type, reason)}>Bannir définitivement</button>
      </>
    }>
      <p className="admin-modal__warning">Action irréversible !</p>
      <label>
        Type
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="email">Email</option><option value="phone">Téléphone</option><option value="both">Email + Téléphone</option>
        </select>
      </label>
      <label>Motif<textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Motif du bannissement..." /></label>
    </Modal>
  );
};

const WarnModal = ({ teacher, onConfirm, onClose }) => {
  const [type, setType] = useState('general');
  const [message, setMessage] = useState('');
  return (
    <Modal isOpen onClose={onClose} title={`Avertir ${teacher.prenom} ${teacher.nom}`} footer={
      <>
        <button className="admin-btn admin-btn--cancel" onClick={onClose}>Annuler</button>
        <button className="admin-btn admin-btn--warn" onClick={() => onConfirm(type, message)}>Envoyer</button>
      </>
    }>
      <label>
        Type
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="video">Vidéo inappropriée</option><option value="comment">Commentaire</option>
          <option value="behavior">Comportement</option><option value="general">Général</option>
        </select>
      </label>
      <label>Message<textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message d'avertissement..." /></label>
    </Modal>
  );
};

const HideVideoModal = ({ video, onConfirm, onClose }) => {
  const [duration, setDuration] = useState('7');
  const [reason, setReason] = useState('');
  return (
    <Modal isOpen onClose={onClose} title={`Masquer "${video.title}"`} footer={
      <>
        <button className="admin-btn admin-btn--cancel" onClick={onClose}>Annuler</button>
        <button className="admin-btn admin-btn--danger" onClick={() => onConfirm(duration === 'permanent' ? 'permanent' : parseInt(duration), reason)}>Masquer</button>
      </>
    }>
      <p>{video.teacherName}</p>
      <label>
        Durée
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="1">1 jour</option><option value="3">3 jours</option><option value="7">7 jours</option>
          <option value="15">15 jours</option><option value="30">30 jours</option><option value="permanent">Permanent</option>
        </select>
      </label>
      <label>Motif<textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Motif du masquage..." /></label>
    </Modal>
  );
};

export default Admin;