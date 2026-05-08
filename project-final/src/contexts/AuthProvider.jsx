// src/contexts/AuthProvider.jsx
// ─── Provider + logique auth ─────────────────────────────────────────────────
// ⚠️ MOCK TEMPORAIRE — Supabase us-east-1 en panne
// Retirer le bloc "MOCK" et décommenter le vrai signIn/signUp
// quand le statut repasse au vert sur status.supabase.com
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from './AuthContext';

// ── Helpers ───────────────────────────────────────────────────────────────────

const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('[AuthProvider] getProfile:', error.message);
    return null;
  }
  return data ?? null;
};

// ── MOCK ─────────────────────────────────────────────────────────────────────
// Comptes dummy pour dev offline
// Enseignant : prof@test.com / test123
// Étudiant   : eleve@test.com / test123

const MOCK_USERS = {
  'prof@test.com': {
    id: 'mock-enseignant-001',
    email: 'prof@test.com',
    user_metadata: { full_name: 'Jean Prof', role: 'enseignant' },
  },
  'eleve@test.com': {
    id: 'mock-etudiant-001',
    email: 'eleve@test.com',
    user_metadata: { full_name: 'Marie Élève', role: 'etudiant' },
  },
  'admin@test.com': {
    id: 'mock-admin-001',
    email: 'admin@test.com',
    user_metadata: { full_name: 'Admin Test', role: 'admin' },
  },
};

const MOCK_PROFILES = {
  'mock-enseignant-001': {
    id: 'mock-enseignant-001',
    full_name: 'Jean Prof',
    role: 'enseignant',
    phone: '+509 1234 5678',
  },
  'mock-etudiant-001': {
    id: 'mock-etudiant-001',
    full_name: 'Marie Élève',
    role: 'etudiant',
    phone: '+509 8765 4321',
  },
  'mock-admin-001': {
    id: 'mock-admin-001',
    full_name: 'Admin Test',
    role: 'admin',
    phone: '',
  },
};

const mockSignIn = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS[email];
      if (!user || password !== 'test123') {
        reject({ message: 'Invalid login credentials', code: 'invalid_credentials' });
        return;
      }
      resolve({ user, session: { user } });
    }, 600); // petit délai pour voir le spinner
  });
};

const mockSignUp = (email, password, userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 'mock-new-user',
          email,
          identities: [], // déclenche l'écran vérif email
        },
        requiresEmailConfirmation: true,
      });
    }, 600);
  });
};
// ── FIN MOCK ─────────────────────────────────────────────────────────────────

// ── Provider ──────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const user            = session?.user ?? null;
  const isAuthenticated = !!user;
  const role            = profile?.role ?? user?.user_metadata?.role ?? null;
  const isEnseignant    = role === 'enseignant';
  const isEtudiant      = role === 'etudiant';
  const isAdmin         = role === 'admin';
  const loadProfile = useCallback(async (userId) => {
    // ── MOCK ──────────────────────────────────────────────────────
    if (userId?.startsWith('mock-')) {
      setProfile(MOCK_PROFILES[userId] || null);
      return;
    }
    // ── FIN MOCK ──────────────────────────────────────────────────
    const data = await getProfile(userId);
    setProfile(data);
  }, []);

  // ── Bootstrap ──────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        await loadProfile(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  // ── Auth methods ────────────────────────────────────────────────

  const signUp = async (email, password, userData = {}) => {
    // ── MOCK ──────────────────────────────────────────────────────
    return mockSignUp(email, password, userData);
    // ── FIN MOCK ──────────────────────────────────────────────────
    
    /* VRAI CODE — décommenter quand Supabase revient
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name ?? '',
          role: 'etudiant',
          phone: userData.phone ?? '',
        },
      },
    });
    if (error) throw error;
    return { user: data.user, requiresEmailConfirmation: !data.session };
    */
  };

  const signIn = async (email, password) => {
    // ── MOCK ──────────────────────────────────────────────────────
    const result = await mockSignIn(email, password);
    setSession(result.session);
    setProfile(MOCK_PROFILES[result.user.id] || null);
    return result;
    // ── FIN MOCK ──────────────────────────────────────────────────
    
    /* VRAI CODE — décommenter quand Supabase revient
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
    */
  };

  const signOut = async () => {
    setSession(null);
    setProfile(null);
    // Le vrai supabase.auth.signOut() peut rester, il sera juste ignoré si en erreur
    supabase.auth.signOut().catch(() => {});
  };

  const resetPassword = async (email) => {
    // Mock : toujours succès
    return;
    /* VRAI CODE
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    */
  };

  const updatePassword = async (newPassword) => {
    return { user };
  };

  const updateProfile = async (updates) => {
    if (!user) throw new Error('Non authentifié');
    setProfile(prev => ({ ...prev, ...updates }));
    return { ...profile, ...updates };
  };

  const resendVerification = async (email) => {
    return;
  };

  // ── Context value ───────────────────────────────────────────────
  const value = {
    user,
    profile,
    session,
    loading,
    isAuthenticated,
    role,
    isEnseignant,
    isEtudiant,
    isAdmin,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    resendVerification,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};