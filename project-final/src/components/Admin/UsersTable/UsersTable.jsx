// src/components/Admin/UsersTable/UsersTable.jsx
// ─── Table utilisateurs ──────────────────────────────────────────────────────

import { FiSearch, FiUserX, FiTrash2, FiLock } from 'react-icons/fi';
import './usersTable.css';

const ROLE_LABEL = { student: 'Étudiant', teacher: 'Enseignant' };

const UsersTable = ({
  users,
  search,
  onSearchChange,
  filter,
  onFilterChange,
  onBlock,
  onBan,
  onDelete,
}) => (
  <div className="users-tab">
    <div className="users-tab__header">
      <h2>Gestion des utilisateurs</h2>
      <div className="users-tab__actions">
        <div className="users-tab__search">
          <FiSearch size={16} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
          <option value="all">Tous</option>
          <option value="student">Étudiants</option>
          <option value="teacher">Enseignants</option>
          <option value="blocked">Bloqués</option>
        </select>
      </div>
    </div>

    <div className="users-tab__table-wrap">
      <table className="users-tab__table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Nom complet</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <div className="users-tab__avatar">{u.avatar}</div>
              </td>
              <td>{u.prenom} {u.nom}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <span className={`users-tab__badge users-tab__badge--${u.role}`}>
                  {ROLE_LABEL[u.role]}
                </span>
              </td>
              <td>
                <span className={`users-tab__status users-tab__status--${u.status}`}>
                  {u.status === 'active'
                    ? 'Actif'
                    : u.blockUntil
                      ? `Bloqué jusqu'au ${u.blockUntil}`
                      : 'Bloqué'}
                </span>
              </td>
              <td>
                <div className="users-tab__btns">
                  {u.status === 'active' && (
                    <button
                      className="users-tab__btn users-tab__btn--block"
                      onClick={() => onBlock(u)}
                      title="Bloquer"
                    >
                      <FiLock size={14} />
                    </button>
                  )}
                  <button
                    className="users-tab__btn users-tab__btn--ban"
                    onClick={() => onBan(u)}
                    title="Bannir"
                  >
                    <FiUserX size={14} />
                  </button>
                  <button
                    className="users-tab__btn users-tab__btn--delete"
                    onClick={() => onDelete(u)}
                    title="Supprimer"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={7} className="users-tab__empty">Aucun utilisateur trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default UsersTable;