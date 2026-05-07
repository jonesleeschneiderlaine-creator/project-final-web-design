import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaBullseye, FaHandshake, FaLock, FaGavel, FaCookie, FaEnvelope } from 'react-icons/fa';
import { GiCheckMark, GiArchiveResearch, GiSecurityGate } from 'react-icons/gi';
import { MdPrivacyTip, MdContactMail, MdStorage, MdAnalytics, MdPayment } from 'react-icons/md';
import { FiDatabase, FiUsers } from 'react-icons/fi';
import './politiqueConfidentialite.css';

const PolitiqueConfidentialite = () => {
  return (
    <div className="politique-container">
      

      <section className="politique-banner">
        <h1><FaLock className="banner-icon" /> Politique de confidentialité</h1>
        <p>Comment nous protégeons vos données personnelles</p>
      </section>

      
      <section className="politique-intro">
        <div className="intro-content">
          <h2><MdPrivacyTip className="intro-icon" /> Notre engagement envers votre vie privée</h2>
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

      {/* Section 1 - collecte de données */}
      <section className="politique-section">
        <div className="section-content">
          <div className="section-icon"><MdStorage /></div>
          <h2>1. Informations que nous collectons</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3><FiUsers className="card-icon" /> Informations d'inscription</h3>
              <p>Nom, prénom, adresse email, date de naissance, et rôle (enseignant/étudiant)</p>
            </div>
            <div className="info-card">
              <h3><MdAnalytics className="card-icon" /> Données d'apprentissage</h3>
              <p>Progression dans les cours, réponses aux quiz, certifications obtenues</p>
            </div>
            <div className="info-card">
              <h3><GiArchiveResearch className="card-icon" /> Informations techniques</h3>
              <p>Adresse IP, type de navigateur, durée des sessions, et pages visitées</p>
            </div>
            <div className="info-card">
              <h3><MdPayment className="card-icon" /> Paiements</h3>
              <p>Informations de transaction (nous ne stockons pas vos données bancaires complètes)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - utilisation données */}
      <section className="politique-section alt-bg">
        <div className="section-content">
          <div className="section-icon"><FaBullseye /></div>
          <h2>2. Comment nous utilisons vos informations</h2>
          <ul className="usage-list">
            <li><GiCheckMark className="list-icon" /> Fournir et améliorer nos services éducatifs</li>
            <li><GiCheckMark className="list-icon" /> Personnaliser votre expérience d'apprentissage</li>
            <li><GiCheckMark className="list-icon" /> Communiquer les mises à jour importantes et les nouveaux contenus</li>
            <li><GiCheckMark className="list-icon" /> Analyser l'utilisation de la plateforme pour l'améliorer</li>
            <li><GiCheckMark className="list-icon" /> Délivrer des certificats et suivre votre progression</li>
            <li><GiCheckMark className="list-icon" /> Assurer la sécurité de notre plateforme</li>
          </ul>
        </div>
      </section>

      {/* Section 3 - partage des données */}
      <section className="politique-section">
        <div className="section-content">
          <div className="section-icon"><FaHandshake /></div>
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
              <p>Hébergement, analyse de données, traitement des paiements (RGPD compliant)</p>
            </div>
            <div className="sharing-card">
              <h3>Obligations légales</h3>
              <p>Si requis par la loi ou pour protéger nos droits légaux</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Securite */}
      <section className="politique-section alt-bg">
        <div className="section-content">
          <div className="section-icon"><GiSecurityGate /></div>
          <h2>4. Sécurité des données</h2>
          <div className="security-features">
            <div className="security-item">
              <span className="security-badge"><FaLock /></span>
              <p>Chiffrement SSL/TLS pour toutes les communications</p>
            </div>
            <div className="security-item">
              <span className="security-badge"><GiArchiveResearch /></span>
              <p>Sauvegardes chiffrées quotidiennes</p>
            </div>
            <div className="security-item">
              <span className="security-badge"><FiUsers /></span>
              <p>Accès restreint aux données personnelles</p>
            </div>
            <div className="security-item">
              <span className="security-badge"><FaShieldAlt /></span>
              <p>Audits de sécurité réguliers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - vos droits */}
      <section className="politique-section">
        <div className="section-content">
          <div className="section-icon"><FaGavel /></div>
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

      {/* Section 6 - cookies */}
      <section className="politique-section alt-bg">
        <div className="section-content">
          <div className="section-icon"><FaCookie /></div>
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

      {/* Section 7 - Nous Contacter */}
      <section className="politique-contact">
        <div className="contact-content">
          <h2><MdContactMail className="contact-icon" /> Des questions ?</h2>
          <p>
            Si vous avez des questions concernant cette politique de confidentialité 
            ou le traitement de vos données, n'hésitez pas à nous contacter.
          </p>
          <div className="contact-buttons">
            <Link to="/contact">
              <button className="btn contact-btn">Nous contacter</button>
            </Link>
            <a href="mailto:privacy@eduhaïti.ht">
              <button className="btn email-btn"><FaEnvelope /> privacy@eduhaïti.ht</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PolitiqueConfidentialite;