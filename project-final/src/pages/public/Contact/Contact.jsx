import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Formulaire soumis:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ nom: '', email: '', sujet: '', message: '' });
  };

  return (
    <div className="contact-container">
      {/* ========== BANNER ========== */}
      <section className="contact-banner">
        <h1>📞 Contactez-nous</h1>
        <p>Nous sommes là pour répondre à vos questions</p>
      </section>

      {/* ========== CONTACT GRID ========== */}
      <div className="contact-grid">
        {/* LEFT SIDE - FORM */}
        <div className="contact-form-section">
          <div className="form-header">
            <h2>Envoyez-nous un message</h2>
            <p>Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>
          </div>

          {isSubmitted && (
            <div className="success-message">
              ✅ Message envoyé avec succès ! Nous vous répondrons rapidement.
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="nom">Nom complet *</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                placeholder="Jean Dupont"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jean@exemple.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="sujet">Sujet *</label>
              <select
                id="sujet"
                name="sujet"
                value={formData.sujet}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez un sujet</option>
                <option value="question">Question sur un cours</option>
                <option value="technique">Problème technique</option>
                <option value="partenariat">Partenariat</option>
                <option value="facturation">Facturation</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Décrivez votre demande ici..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Envoyer le message →
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - INFO */}
        <div className="contact-info-section">
          <div className="info-card">
            <h3>📍 Notre adresse</h3>
            <p>EduHaïti</p>
            <p>123, Rue Capois</p>
            <p>Port-au-Prince, Haïti</p>
          </div>

          <div className="info-card">
            <h3>📧 Email</h3>
            <p>Support général : <strong>contact@eduhaïti.ht</strong></p>
            <p>Service technique : <strong>tech@eduhaïti.ht</strong></p>
            <p>Partenariats : <strong>partenariat@eduhaïti.ht</strong></p>
          </div>

          <div className="info-card">
            <h3>📞 Téléphone</h3>
            <p>+509 1234 5678</p>
            <p>Lun-Ven : 8h - 17h</p>
            <p>Sam : 9h - 13h</p>
          </div>

          <div className="info-card social-card">
            <h3>🌐 Suivez-nous</h3>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>

          <div className="info-card hours-card">
            <h3>⏰ Heures d'ouverture</h3>
            <div className="hours">
              <span>Lundi - Vendredi:</span>
              <span>8h00 - 17h00</span>
            </div>
            <div className="hours">
              <span>Samedi:</span>
              <span>9h00 - 13h00</span>
            </div>
            <div className="hours">
              <span>Dimanche:</span>
              <span>Fermé</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== FAQ SECTION ========== */}
      <section className="faq-section">
        <h2>❓ Questions fréquentes</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Comment créer un compte ?</h3>
            <p>Cliquez sur "Commencer gratuitement" en haut de la page, remplissez vos informations et confirmez votre email.</p>
          </div>
          <div className="faq-item">
            <h3>Les cours sont-ils gratuits ?</h3>
            <p>Nous proposons à la fois des cours gratuits et des cours premium. Les certificats sont inclus avec les cours premium.</p>
          </div>
          <div className="faq-item">
            <h3>Puis-je devenir enseignant ?</h3>
            <p>Absolument ! Contactez-nous via ce formulaire avec votre CV et nous vous guiderons dans le processus.</p>
          </div>
          <div className="faq-item">
            <h3>Comment obtenir un certificat ?</h3>
            <p>Suivez un cours premium, réussissez tous les quiz et votre certificat sera automatiquement généré.</p>
          </div>
        </div>
      </section>

      {/* ========== MAP SECTION ========== */}
      <section className="map-section">
        <h2>📍 Où nous trouver</h2>
        <div className="map-placeholder">
          <div className="map-content">
            <div className="map-icon">🗺️</div>
            <p>Notre bureau est situé au centre de Port-au-Prince</p>
            <p className="map-address">123, Rue Capois, Port-au-Prince, Haïti</p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link"
            >
              Voir sur Google Maps →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;