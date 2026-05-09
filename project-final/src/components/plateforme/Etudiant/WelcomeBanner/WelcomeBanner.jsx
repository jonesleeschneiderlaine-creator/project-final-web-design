// src/components/plateforme/Etudiant/WelcomeBanner/WelcomeBanner.jsx

import { FiTrendingUp } from 'react-icons/fi';
import './welcomeBanner.css';

const WelcomeBanner = ({ prenom, progress, stats }) => (
  <section className="welcome-banner">
    <div className="welcome-banner__text">
      <div className="welcome-banner__greeting">
        <h1>Bonjour, {prenom} !</h1>
      </div>
      <p>
        Continuez votre apprentissage, vous êtes à <strong>{progress}%</strong> de votre objectif cette semaine.
      </p>
      <div className="welcome-banner__goal">
        <div className="welcome-banner__goal-head">
          <span>Objectif hebdomadaire</span>
          <span>6h30 / 10h</span>
        </div>
        <div className="welcome-banner__goal-bar">
          <div className="welcome-banner__goal-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>

    <div className="welcome-banner__stats">
      {stats.map((s) => (
        <div key={s.label} className="welcome-banner__stat">
          <span className="welcome-banner__stat-val">{s.value}</span>
          <span className="welcome-banner__stat-lbl">{s.label}</span>
          <span className="welcome-banner__stat-trend">
            <FiTrendingUp size={12} /> {s.trend}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default WelcomeBanner;