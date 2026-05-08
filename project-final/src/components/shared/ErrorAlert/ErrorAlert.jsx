// src/components/shared/ErrorAlert/ErrorAlert.jsx
// ─── Alerte erreur user-friendly ─────────────────────────────────────────────
// Reçoit une erreur (string, Error, ou objet Supabase) et affiche
// un message compréhensible via le mapping.
//
// Props:
//   error       – l'erreur brute
//   onDismiss   – callback pour fermer (si absent → pas de btn fermer)
//   className   – classes additionnelles
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { mapError } from './errorMapping';
import './errorAlert.css';

export const ErrorAlert = ({ error, onDismiss, className = '' }) => {
  const [dismissed, setDismissed] = useState(false);

  if (!error || dismissed) return null;

  const message = mapError(error);

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div className={`error-alert ${className}`} role="alert">
      <FiAlertTriangle className="error-alert__icon" size={20} />
      <p className="error-alert__message">{message}</p>
      {onDismiss && (
        <button
          className="error-alert__close"
          onClick={handleDismiss}
          aria-label="Fermer"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};