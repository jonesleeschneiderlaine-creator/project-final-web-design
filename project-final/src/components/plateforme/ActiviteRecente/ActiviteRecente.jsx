// src/components/plateforme/ActiviteRecente/ActiviteRecente.jsx
import './activiteRecente.css';

const ICONES_TYPE = {
  inscription: '👤',
  quiz: '✅',
  commentaire: '💬',
  certificat: '🏆',
};

const ElementActivite = ({ activite }) => {
  const icone = ICONES_TYPE[activite.type] || '📌';

  return (
    <div className="activite__element">
      <div className="activite__icone-conteneur">
        <span className="activite__icone">{icone}</span>
      </div>
      <div className="activite__details">
        <p className="activite__texte">{activite.texte}</p>
      </div>
      <span className="activite__temps">{activite.temps}</span>
    </div>
  );
};

const ActiviteRecente = ({ activites }) => {
  return (
    <div className="activite-recente">
      <h3 className="activite-recente__titre">Activité récente</h3>
      <div className="activite-recente__liste">
        {activites.map((activite) => (
          <ElementActivite key={activite.id} activite={activite} />
        ))}
      </div>
    </div>
  );
};

export default ActiviteRecente;
