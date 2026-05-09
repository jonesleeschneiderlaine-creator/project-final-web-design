// src/components/plateforme/Etudiant/SettingsSection/SettingsSection.jsx
// ─── Section paramètres ─────────────────────────────────────────────────────

import './settingsSection.css';

const Toggle = ({ checked, onChange }) => (
  <label className="toggle">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="toggle__slider" />
  </label>
);

const SettingsSection = ({ title, children, danger }) => (
  <div className={`settings-section ${danger ? 'settings-section--danger' : ''}`}>
    <h2>{title}</h2>
    {children}
  </div>
);

const SettingRow = ({ label, desc, checked, onChange }) => (
  <div className="settings-section__row">
    <div className="settings-section__info">
      <span>{label}</span>
      {desc && <p>{desc}</p>}
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

export { SettingsSection, SettingRow };