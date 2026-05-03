import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    alert('Message envoyé ! Nous vous répondrons dans les plus brefs délais.');
    setFormData({
      nom: '',
      email: '',
      sujet: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <header className="navbar">
        <Link to="/" className="logo">🇭🇹 EduHaïti</Link>
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/cours">Cours</Link>
          <Link to="/apropos">À propos</Link>
          <Link to="/contact" className="active">Contact</Link>
        </nav>
        <div className="auth">
          <Link to="/connexion">
            <button className="btn login">Connexion</button>
          </Link>
          <Link to="/createaccount">
            <button className="btn register">S'inscrire</button>
          </Link>
        </div>
      </header>

      <section className="banner">
        <h1>📞 Contactez-nous</h1>
        <p>Une question ? Un problème ? Écrivez-nous !</p>
      </section>

      <section className="contact-section">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Adresse</h3>
            <p>Port-au-Prince, Haïti</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email</h3>
            <p>contact@eduhaiti.com</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Téléphone</h3>
            <p>+509 1234 5678</p>
          </div>
          <div className="info-card">
            <div className="info-icon">⏰</div>
            <h3>Horaires</h3>
            <p>Lun-Ven: 8h - 17h</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Envoyez-nous un message</h2>
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
            <button type="submit" className="submit-btn">Envoyer le message →</button>
          </form>
        </div>
      </section>

      <section className="map">
        <h2>Retrouvez-nous</h2>
        <div className="map-placeholder">
          <p>📍 Carte interactive - Port-au-Prince, Haïti</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-left">
          <h3>🇭🇹 EduHaïti</h3>
          <p>La plateforme d'apprentissage pour un Haïti meilleur</p>
        </div>
        <div className="footer-links">
          <Link to="/cours">Cours</Link>
          <Link to="/apropos">À propos</Link>
          <Link to="/contact">Contact</Link>
          <a href="#">Politique de confidentialité</a>
        </div>
      </footer>
    </div>
  );
};

export default Contact;