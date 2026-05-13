// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Pas besoin d'analytics pour l'instant (optionnel)

// Ta configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAcbESvu7FKmv5Bdu3UYaUBKdihX_GtXQE",
  authDomain: "project-final-react-8cb9d.firebaseapp.com",
  projectId: "project-final-react-8cb9d",
  storageBucket: "project-final-react-8cb9d.firebasestorage.app",
  messagingSenderId: "947171767133",
  appId: "1:947171767133:web:514f86df355365c1a86eb4",
  measurementId: "G-57NH5F2RKH"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter l'authentification (c'est ce qu'on utilise pour la connexion)
export const auth = getAuth(app);

// Optionnel : exporter l'app si besoin
export default app;