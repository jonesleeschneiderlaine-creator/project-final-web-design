// src/pages/plateforme/Auth/Auth.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import SignIn from '../../../components/plateforme/SignIn/SignIn';
import CreateAccount from '../../../components/plateforme/CreateAccount/CreateAccount';
import { FiGrid } from 'react-icons/fi';
import './auth.css';

const Auth = ({ defaultMode = 'signin' }) => {
  const [mode, setMode] = useState(defaultMode);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    await login(email, password);
    navigate('/plateforme');
  };

  const handleSignup = async (email, password, userData) => {
    await signup(email, password, userData);
    navigate('/plateforme');
  };

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