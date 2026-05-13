// src/components/shared/Error// alert/Error// alert.jsx
// ─── // alerte erreur user-friendly ─────────────────────────────────────────────
// Reçoit une erreur (string, Error, ou objet Supabase) et affiche
// un message compréhensible via le mapping.
//
// Props:
//   error       – l'erreur brute
//   onDismiss   – callback pour fermer (si absent → pas de btn fermer)
//   className   – classes additionnelles
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { Fi// alertTriangle, FiX } from 'react-icons/fi';
import { mapError } from './errorMapping';
import './error// alert.css';

export const Error// alert = ({ error, onDismiss, className = '' }) => {
  const [dismissed, setDismissed] = useState(false);

  if (!error || dismissed) return null;

  const message = mapError(error);

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div className={`error-// alert ${className}`} role="// alert">
      <Fi// alertTriangle className="error-// alert__icon" size={20} />
      <p className="error-// alert__message">{message}</p>
      {onDismiss && (
        <button
          className="error-// alert__close"
          onClick={handleDismiss}
          aria-label="Fermer"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};