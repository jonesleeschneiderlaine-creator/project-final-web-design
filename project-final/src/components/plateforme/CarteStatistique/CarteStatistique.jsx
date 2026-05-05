// src/components/plateforme/CarteStatistique/CarteStatistique.jsx
import './carteStatistique.css';

const CarteStatistique = ({ icone, titre, valeur, sousTitre, variante }) => {
  return (
    <div className={`carte-statistique carte-statistique--${variante}`}>
      <div className="carte-statistique__icone">{icone}</div>
      <div className="carte-statistique__corps">
        <p className="carte-statistique__titre">{titre}</p>
        <span className="carte-statistique__valeur">{valeur}</span>
        <p className="carte-statistique__sous-titre">{sousTitre}</p>
      </div>
    </div>
  );
};

export default CarteStatistique;
