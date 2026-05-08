// ─── Mapping erreurs tech → messages user ────────────────────────────────────
//
// Priorité :
//   1. Erreurs Supabase (code PG, status HTTP)
//   2. Messages d'erreur JS natifs
//   3. Fallback
//
// Usage :
//   import { mapError } from './errorMapping';
//   const msg = mapError(monErreur);
// ─────────────────────────────────────────────────────────────────────────────

// ── Dicos par type ───────────────────────────────────────────────────────────

// Codes erreur PostgreSQL (pgsql)
const PG_MAP = {
  '23505': 'Cet élément existe déjà.',
  '23503': 'Impossible de supprimer — élément lié à d\'autres données.',
  '23502': 'Un champ obligatoire est vide.',
  '42501': 'Vous n\'avez pas la permission de faire ça. Contactez un administrateur.',
  'PGRST116': 'Élément introuvable.',
  '42P01': 'Erreur interne — table introuvable.',
};

// Status HTTP Supabase
const HTTP_MAP = {
  400: 'Requête invalide. Vérifiez les informations saisies.',
  401: 'Session expirée. Reconnectez-vous.',
  403: 'Accès refusé. Vous n\'avez pas les droits nécessaires.',
  404: 'Ressource introuvable.',
  409: 'Conflit — cet élément existe déjà ou est en cours de modification.',
  422: 'Données invalides. Vérifiez votre saisie.',
  429: 'Trop de tentatives. Réessayez dans quelques minutes.',
  500: 'Erreur serveur. Réessayez plus tard.',
  503: 'Service temporairement indisponible.',
};

// Messages auth Supabase (match partiel sur le message)
const AUTH_MAP = [
  { pattern: /invalid_credentials/i,   msg: 'Email ou mot de passe incorrect.' },
  { pattern: /email not confirmed/i,   msg: 'Email non vérifié. Vérifiez votre boîte de réception.' },
  { pattern: /already registered/i,    msg: 'Un compte avec cet email existe déjà.' },
  { pattern: /password.*weak/i,        msg: 'Mot de passe trop faible (min. 6 caractères).' },
  { pattern: /email.*invalid/i,        msg: 'Format d\'email invalide.' },
  { pattern: /session.*expired/i,      msg: 'Session expirée. Reconnectez-vous.' },
  { pattern: /refresh token.*not found/i, msg: 'Session expirée. Reconnectez-vous.' },
  { pattern: /user not found/i,        msg: 'Aucun compte trouvé avec cet email.' },
  { pattern: /rate limit/i,            msg: 'Trop de tentatives. Patientez quelques secondes.' },
];

// ── Fonction principale ──────────────────────────────────────────────────────

export const mapError = (error) => {
  if (!error) return 'Une erreur inconnue est survenue.';

  // String direct
  if (typeof error === 'string') {
    // Tenter match auth sur la string
    for (const { pattern, msg } of AUTH_MAP) {
      if (pattern.test(error)) return msg;
    }
    return error;
  }

  // Objet Error JS ou objet Supabase
  const { code, message, status, details, hint } = error;

  // 1. Code PG
  if (code && PG_MAP[code]) return PG_MAP[code];

  // 2. Statut HTTP
  if (status && HTTP_MAP[status]) return HTTP_MAP[status];

  // 3. Message auth (match partiel)
  if (message) {
    for (const { pattern, msg } of AUTH_MAP) {
      if (pattern.test(message)) return msg;
    }
  }

  // 4. Hint PG (souvent plus clair)
  if (hint) return hint;

  // 5. Détails PG
  if (details) return details;

  // 6. Message brut (dernier recours)
  if (message) return message;

  // 7. Fallback
  return 'Une erreur inattendue est survenue. Réessayez ou contactez le support.';
};