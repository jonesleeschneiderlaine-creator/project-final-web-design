import "./notFound.css";
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NotFound = () => {
  const location = useLocation();
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    // Auto-redirect after 20 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get suggested pages based on the attempted path
  const getSuggestions = () => {
    const path = location.pathname.toLowerCase();
    const suggestions = [];
    
    if (path.includes('prof') || path.includes('teacher') || path.includes('enseignant')) {
      suggestions.push({ name: 'Dashboard Enseignant', path: '/plateforme/enseignant' });
    }
    if (path.includes('etud') || path.includes('student')) {
      suggestions.push({ name: 'Dashboard Étudiant', path: '/plateforme' });
    }
    if (path.includes('cour') || path.includes('course')) {
      suggestions.push({ name: 'Nos Cours', path: '/plateforme/cours' });
    }
    if (path.includes('param') || path.includes('setting')) {
      suggestions.push({ name: 'Paramètres', path: '/plateforme/parametres' });
    }
    
    // Default suggestions if no matches
    if (suggestions.length === 0) {
      suggestions.push(
        { name: 'Accueil', path: '/' },
        { name: 'À propos', path: '/apropos' },
        { name: 'Nos Cours', path: '/plateforme/cours' },
        { name: 'Contact', path: '/contact' }
      );
    }
    
    return suggestions.slice(0, 4);
  };

  return (
    <div className="notfound-container">
      {/* Animated background elements */}
      <div className="notfound-bg-elements">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>

      <div className="notfound-content">
        {/* 404 Illustration */}
        <div className="error-illustration">
          <div className="error-code">
            <span className="digit">4</span>
            <span className="digit zero">
              <span className="zero-icon">🔍</span>
              0
            </span>
            <span className="digit">4</span>
          </div>
          <div className="error-animation">
            <div className="compass-spin">🧭</div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="error-title">Page non trouvée</h1>
        <p className="error-description">
          Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="error-path">
          <span className="path-label">Chemin recherché :</span>
          <code className="path-value">{location.pathname}</code>
        </div>

        {/* Suggestions */}
        <div className="suggestions-section">
          <h2 className="suggestions-title">📍 Vous cherchiez peut-être ?</h2>
          <div className="suggestions-grid">
            {getSuggestions().map((suggestion, index) => (
              <Link 
                key={index} 
                to={suggestion.path} 
                className="suggestion-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="suggestion-icon">
                  {suggestion.name === 'Accueil' && '🏠'}
                  {suggestion.name === 'À propos' && '📖'}
                  {suggestion.name === 'Nos Cours' && '📚'}
                  {suggestion.name === 'Contact' && '📞'}
                  {suggestion.name.includes('Dashboard') && '📊'}
                  {suggestion.name === 'Paramètres' && '⚙️'}
                </span>
                <span className="suggestion-name">{suggestion.name}</span>
                <span className="suggestion-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">
            <span className="btn-icon">🏠</span>
            Retour à l'accueil
          </Link>
          <Link to="/plateforme" className="btn btn-secondary">
            <span className="btn-icon">📚</span>
            Explorer les cours
          </Link>
          <Link to="/contact" className="btn btn-outline">
            <span className="btn-icon">💬</span>
            Nous contacter
          </Link>
        </div>

        {/* Auto-redirect message */}
        <div className="auto-redirect">
          <div className="redirect-progress">
            <div 
              className="redirect-progress-bar" 
              style={{ animation: `progress 20s linear` }}
            ></div>
          </div>
          <p className="redirect-text">
            Redirection vers l'accueil dans <strong>{countdown}</strong> seconde{countdown > 1 ? 's' : ''}...
          </p>
        </div>

        {/* Fun fact / Helpful tip */}
        <div className="helpful-tip">
          <span className="tip-icon">💡</span>
          <p>
            Astuce : Vérifiez l'URL ou utilisez la navigation ci-dessus pour trouver ce que vous cherchez.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;