import React from 'react';
import { Link } from 'react-router-dom';
import './politiqueConfidentialite.css';

const PolitiqueConfidentialite = () => {
  return (
    <div className="politique-container">
      {/* ========== BANNER ========== */}
      <section className="politique-banner">
        <h1>🔒 Politique de confidentialité</h1>
        <p>Comment nous protégeons vos données personnelles</p>
      </section>

      {/* ========== INTRODUCTION ========== */}
      <section className="politique-intro">
        <div className="intro-content">
          <h2>Notre engagement envers votre vie privée</h2>
          <p>
            Chez EduHaïti, la protection de vos données personnelles est une priorité. 
            Cette politique de confidentialité explique comment nous collectons, utilisons, 
            et protégeons vos informations lorsque vous utilisez notre plateforme.
          </p>
          <p>
            Dernière mise à jour : <strong>1er mai 2026</strong>
          </p>
        </div>
      </section>

      {/* ========== SECTION 1 - INFORMATIONS COLLECTÉES ========== */}
      <section className="politique-section">
        <div className="section-content">
          <div className="section-icon">📋</div>
          <h2>1. Informations que nous collectons</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Informations d'inscription</h3>
              <p>Nom, prénom, adresse email, date de naissance, et rôle (enseignant/étudiant)</p>
            </div>
            <div className="info-card">
              <h3>Données d'apprentissage</h3>
              <p>Progression dans les cours, réponses aux quiz, certifications obtenues</p>
            </div>
            <div className="info-card">
              <h3>Informations techniques</h3>
              <p>Adresse IP, type de navigateur, durée des sessions, et pages visitées</p>
            </div>
            <div className="info-card">
              <h3>Paiements</h3>
              <p>Informations de transaction (nous ne stockons pas vos données bancaires complètes)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2 - UTILISATION ========== */}
      <section className="politique-section alt-bg">
        <div className="section-content">
          <div className="section-icon">🎯</div>
          <h2>2. Comment nous utilisons vos informations</h2>
          <ul className="usage-list">
            <li>✓ Fournir et améliorer nos services éducatifs</li>
            <li>✓ Personnaliser votre expérience d'apprentissage</li>
            <li>✓ Communiquer les mises à jour importantes et les nouveaux contenus</li>
            <li>✓ Analyser l'utilisation de la plateforme pour l'améliorer</li>
            <li>✓ Délivrer des certificats et suivre votre progression</li>
            <li>✓ Assurer la sécurité de notre plateforme</li>
          </ul>
        </div>
      </section>

      {/* ========== SECTION 3 - PARTAGE ========== */}
      <section className="politique-section">
        <div className="section-content">
          <div className="section-icon">🤝</div>
          <h2>3. Partage des données</h2>
          <p>
            Nous ne vendons jamais vos données personnelles. Vos informations peuvent être partagées uniquement dans ces cas :
          </p>
          <div className="sharing-grid">
            <div className="sharing-card">
              <h3>Avec votre consentement</h3>
              <p>Lorsque vous nous autorisez explicitement à partager vos données</p>
            </div>
            <div className="sharing-card">
              <h3>Partenaires de service</h3>
              <p>Hébergement, analyse de données, traitement des paiements (GDPR compliant)</p>
            </div>
            <div className="sharing-card">
              <h3>Obligations légales</h3>
              <p>Si requis par la loi ou pour protéger nos droits légaux</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4 - SÉCURITÉ ========== */}
      <section className="politique-section alt-bg">
        <div className="section-content">
          <div className="section-icon">🛡️</div>
          <h2>4. Sécurité des données</h2>
          <div className="security-features">
            <div className="security-item">
              <span className="security-badge">🔐</span>
              <p>Chiffrement SSL/TLS pour toutes les communications</p>
            </div>
            <div className="security-item">
              <span className="security-badge">📀</span>
              <p>Sauvegardes chiffrées quotidiennes</p>
            </div>
            <div className="security-item">
              <span className="security-badge">👥</span>
              <p>Accès restreint aux données personnelles</p>
            </div>
            <div className="security-item">
              <span className="security-badge">✅</span>
              <p>Audits de sécurité réguliers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 5 - VOS DROITS ========== */}
      <section className="politique-section">
        <div className="section-content">
          <div className="section-icon">⚖️</div>
          <h2>5. Vos droits</h2>
          <p>Conformément au RGPD et aux lois haïtiennes, vous avez le droit de :</p>
          <div className="rights-grid">
            <div className="right-item">📖 Droit d'accès à vos données</div>
            <div className="right-item">✏️ Droit de rectification</div>
            <div className="right-item">🗑️ Droit à l'effacement</div>
            <div className="right-item">⏸️ Droit à la limitation du traitement</div>
            <div className="right-item">📤 Droit à la portabilité</div>
            <div className="right-item">❌ Droit d'opposition</div>
          </div>
          <p className="contact-note">
            Pour exercer ces droits, contactez-nous à : <strong>dpo@eduhaïti.ht</strong>
          </p>
        </div>
      </section>

      {/* ========== SECTION 6 - COOKIES ========== */}
      <section className="politique-section alt-bg">
        <div className="section-content">
          <div className="section-icon">🍪</div>
          <h2>6. Cookies et technologies similaires</h2>
          <p>
            Nous utilisons des cookies pour améliorer votre expérience sur notre plateforme :
          </p>
          <ul className="cookies-list">
            <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
            <li><strong>Cookies fonctionnels :</strong> Mémorisent vos préférences</li>
            <li><strong>Cookies analytiques :</strong> Nous aident à comprendre l'utilisation du site</li>
          </ul>
          <p>
            Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de votre navigateur.
          </p>
        </div>
      </section>

      {/* ========== SECTION 7 - CONTACT ========== */}
      <section className="politique-contact">
        <div className="contact-content">
          <h2>Des questions ?</h2>
          <p>
            Si vous avez des questions concernant cette politique de confidentialité 
            ou le traitement de vos données, n'hésitez pas à nous contacter.
          </p>
          <div className="contact-buttons">
            <Link to="/contact">
              <button className="btn contact-btn">Nous contacter</button>
            </Link>
            <a href="mailto:privacy@eduhaïti.ht">
              <button className="btn email-btn">privacy@eduhaïti.ht</button>
            </a>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default PolitiqueConfidentialite;