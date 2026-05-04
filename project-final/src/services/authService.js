// src/services/authService.js
// FAKE USER DATA FOR DEVELOPMENT
const FAKE_USER = {
  id: 'fake-user-123',
  email: 'demo@eduhaïti.ht',
  user_metadata: {
    full_name: 'Jean Dupont',
    role: 'etudiant'
  }
};

class AuthService {
  constructor() {
    this.currentUser = null;
    this.authListeners = [];
    
    // For development: check localStorage for fake session
    const storedUser = localStorage.getItem('fakeAuthUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  // Get current user (to be replaced with Supabase)
  async getCurrentUser() {
    // TODO: Replace with Supabase: await supabase.auth.getUser()
    return this.currentUser;
  }

  // Sign in (to be replaced with Supabase)
  async signIn(email, password) {
    // TODO: Replace with Supabase: await supabase.auth.signInWithPassword()
    
    // Fake validation for development
    if (!email || !password) {
      throw new Error('Email et mot de passe requis');
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo, accept any email/password with @ and length > 3
    if (email.includes('@') && password.length >= 3) {
      const user = {
        ...FAKE_USER,
        email: email,
        user_metadata: {
          ...FAKE_USER.user_metadata,
          full_name: email.split('@')[0]
        }
      };
      this.currentUser = user;
      localStorage.setItem('fakeAuthUser', JSON.stringify(user));
      this._notifyListeners(user);
      return user;
    } else {
      throw new Error('Email ou mot de passe incorrect');
    }
  }

  // Sign up (to be replaced with Supabase)
  async signUp(email, password, userData) {
    // TODO: Replace with Supabase: await supabase.auth.signUp()
    
    if (!email || !password || !userData.full_name) {
      throw new Error('Tous les champs sont requis');
    }
    
    if (password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = {
      id: `user-${Date.now()}`,
      email: email,
      user_metadata: {
        full_name: userData.full_name,
        role: userData.role || 'etudiant',
        phone: userData.phone || ''
      }
    };
    
    this.currentUser = user;
    localStorage.setItem('fakeAuthUser', JSON.stringify(user));
    this._notifyListeners(user);
    return user;
  }

  // Sign out (to be replaced with Supabase)
  async signOut() {
    // TODO: Replace with Supabase: await supabase.auth.signOut()
    this.currentUser = null;
    localStorage.removeItem('fakeAuthUser');
    this._notifyListeners(null);
  }

  // Listen to auth changes
  onAuthStateChange(callback) {
    this.authListeners.push(callback);
    
    // Call immediately with current state
    callback(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      const index = this.authListeners.indexOf(callback);
      if (index > -1) {
        this.authListeners.splice(index, 1);
      }
    };
  }

  _notifyListeners(user) {
    this.authListeners.forEach(listener => listener(user));
  }

  // For Supabase integration later
  // async signInWithGoogle() { ... }
  // async resetPassword(email) { ... }
  // async updateUser(data) { ... }
}

export const authService = new AuthService();