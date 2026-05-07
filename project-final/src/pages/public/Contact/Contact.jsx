import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdSend } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi';
import { sendContactEmail } from '../../../config/emailjs';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validation
    if (!formData.nom || !formData.email || !formData.sujet || !formData.message) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Veuillez entrer un email valide');
      setLoading(false);
      return;
    }

    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setSuccess(true);
        setFormData({
          nom: '',
          email: '',
          sujet: '',
          message: ''
        });
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.',err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">

      <section className="banner">
        <h1><MdEmail className="banner-icon" /> Contactez-nous</h1>
        <p>Une question ? Un problème ? Écrivez-nous !</p>
      </section>

      <section className="contact-section">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>Adresse</h3>
            <p>Port-au-Prince, Haïti</p>
          </div>
          <div className="info-card">
            <div className="info-icon">
              <FaEnvelope />
            </div>
            <h3>Email</h3>
            <p>contact@eduhaiti.com</p>
          </div>
          <div className="info-card">
            <div className="info-icon">
              <FaPhone />
            </div>
            <h3>Téléphone</h3>
            <p>+509 1234 5678</p>
          </div>
          <div className="info-card">
            <div className="info-icon">
              <FaClock />
            </div>
            <h3>Horaires</h3>
            <p>Lun-Ven: 8h - 17h</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Envoyez-nous un message</h2>
          
          {success && (
            <div className="success-message">
              <MdSend className="message-icon" /> Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
            </div>
          )}
          
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nom complet</label>
                <input 
                  type="text" 
                  name="nom"
                  placeholder="Votre nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Sujet</label>
              <input 
                type="text" 
                name="sujet"
                placeholder="Sujet de votre message"
                value={formData.sujet}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message"
                rows="5" 
                placeholder="Votre message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Envoi en cours...' : 'Envoyer le message →'}
            </button>
          </form>
        </div>
      </section>

      <section className="map">
        <h2><HiLocationMarker className="map-icon" /> Retrouvez-nous</h2>
        <div className="map-placeholder">
          <div className="map-content">
            <HiLocationMarker className="placeholder-icon" />
            <p>📍 Port-au-Prince, Haïti</p>
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