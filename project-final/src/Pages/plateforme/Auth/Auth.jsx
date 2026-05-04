// src/pages/plateforme/Auth/Auth.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import SignIn from '../../../components/plateforme/SignIn/SignIn';
import CreateAccount from '../../../components/plateforme/CreateAccount/CreateAccount';
import { FiGrid, FiMail } from 'react-icons/fi';
import { supabase } from '../../../lib/supabaseClient'; // ADD THIS IMPORT
import './auth.css';

const Auth = ({ defaultMode = 'signin' }) => {
  const [mode, setMode] = useState(defaultMode);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [resendError, setResendError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    await login(email, password);
    navigate('/plateforme');
  };

  const handleSignup = async (email, password, userData) => {
    const result = await signup(email, password, userData);
    
    if (result?.requiresEmailConfirmation || result?.user?.identities?.length === 0) {
      setVerificationEmail(email);
      setShowVerification(true);
    } else {
      navigate('/plateforme');
    }
  };

  // ADD THIS FUNCTION HERE
  const handleResendVerification = async () => {
    setResendMessage('');
    setResendError('');
    try {
      await supabase.auth.resend({
        type: 'signup',
        email: verificationEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/connexion`
        }
      });
      setResendMessage('Email de vérification renvoyé ! Vérifiez votre boîte de réception.');
      setTimeout(() => setResendMessage(''), 5000);
    } catch (error) {
      setResendError('Erreur: ' + error.message);
      setTimeout(() => setResendError(''), 5000);
    }
  };

  // If showing verification message
  if (showVerification) {
    return (
      <div className="auth-page">
        <div className="auth-page__background">
          <div className="auth-page__bg-circle auth-page__bg-circle--1"></div>
          <div className="auth-page__bg-circle auth-page__bg-circle--2"></div>
          <div className="auth-page__bg-circle auth-page__bg-circle--3"></div>
        </div>

        <div className="auth-page__container">
          <div className="auth-page__card" style={{ maxWidth: '500px', textAlign: 'center' }}>
            <div className="signin__header">
              <div className="signin__icon" style={{ fontSize: '64px' }}>📧</div>
              <h2 className="signin__title">Vérifiez votre email</h2>
              <p className="signin__subtitle">
                Un lien de confirmation a été envoyé à <strong>{verificationEmail}</strong>
              </p>
            </div>

            <div style={{ padding: '20px 0' }}>
              <div style={{ 
                background: '#e8f0fe', 
                padding: '20px', 
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <FiMail size={32} style={{ marginBottom: '12px', color: '#1e6bd6' }} />
                <p style={{ color: '#0b1f3a', marginBottom: '8px' }}>
                  Cliquez sur le lien dans l'email pour activer votre compte.
                </p>
                <p style={{ color: '#666', fontSize: '13px' }}>
                  Après vérification, vous pourrez vous connecter.
                </p>
              </div>

              {/* ADD THE RESEND BUTTON HERE */}
              <button 
                onClick={handleResendVerification}
                className="signin__submit"
                style={{ 
                  width: '100%', 
                  marginBottom: '12px',
                  background: '#1e6bd6'
                }}
              >
                Renvoyer l'email de vérification
              </button>

              {/* Success/Error messages */}
              {resendMessage && (
                <div style={{ 
                  background: '#d4edda', 
                  color: '#155724', 
                  padding: '10px', 
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontSize: '14px'
                }}>
                  {resendMessage}
                </div>
              )}
              
              {resendError && (
                <div style={{ 
                  background: '#f8d7da', 
                  color: '#721c24', 
                  padding: '10px', 
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontSize: '14px'
                }}>
                  {resendError}
                </div>
              )}
              
              
              <button 
                onClick={() => {
                  setShowVerification(false);
                  setMode('signin');
                  // Clear any form data or errors if needed
                }}
                className="signin__submit"
                style={{ width: '100%', marginBottom: '12px' }}
              >
                Aller à la connexion
              </button>
              
              <button
                onClick={() => setShowVerification(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1e6bd6',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Retour à l'inscription
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-page__background">
        <div className="auth-page__bg-circle auth-page__bg-circle--1"></div>
        <div className="auth-page__bg-circle auth-page__bg-circle--2"></div>
        <div className="auth-page__bg-circle auth-page__bg-circle--3"></div>
      </div>

      <div className="auth-page__container">
        <div className="auth-page__brand">
          <FiGrid className="auth-page__logo" size={80} />
          <h1 className="auth-page__brand-title">EduHaïti</h1>
          <p className="auth-page__brand-subtitle">
            Apprendre, enseigner, changer l'avenir d'Haïti
          </p>
        </div>

        <div className="auth-page__card">
          {mode === 'signin' ? (
            <SignIn 
              onSuccess={handleLogin}
              onSwitchToSignUp={() => setMode('signup')}
            />
          ) : (
            <CreateAccount 
              onSuccess={handleSignup}
              onSwitchToSignIn={() => setMode('signin')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;