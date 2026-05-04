import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cours.css';

const Cours = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');

  const courses = [
    { id: 1, title: "Algèbre avancée", description: "Maîtrisez les équations complexes et les fonctions", category: "Mathématiques", duration: "12h", rating: "4.8", img: "math-img" },
    { id: 2, title: "Géométrie", description: "Formes, angles, théorèmes et démonstrations", category: "Mathématiques", duration: "10h", rating: "4.7", img: "math-img2" },
    { id: 3, title: "Grammaire complète", description: "Orthographe, conjugaison et syntaxe", category: "Français", duration: "15h", rating: "4.9", img: "french-img" },
    { id: 4, title: "Littérature haïtienne", description: "Découvrez les grands auteurs d'Haïti", category: "Français", duration: "8h", rating: "4.8", img: "french-img2" },
    { id: 5, title: "Anglais débutant", description: "Apprenez les bases de l'anglais", category: "Anglais", duration: "20h", rating: "4.7", img: "english-img" },
    { id: 6, title: "Anglais conversation", description: "Pratiquez la conversation courante", category: "Anglais", duration: "15h", rating: "4.8", img: "english-img2" },
    { id: 7, title: "Créole haïtien", description: "Apprenez le créole de A à Z", category: "Créole", duration: "12h", rating: "4.9", img: "creole-img" },
    { id: 8, title: "Créole avancé", description: "Perfectionnez votre créole", category: "Créole", duration: "10h", rating: "4.8", img: "creole-img2" },
    { id: 9, title: "Physique - Mécanique", description: "Mouvement, forces et énergie", category: "Sciences", duration: "14h", rating: "4.6", img: "science-img" },
    { id: 10, title: "Chimie organique", description: "Molécules, réactions et composés", category: "Sciences", duration: "16h", rating: "4.7", img: "science-img2" },
    { id: 11, title: "Histoire d'Haïti", description: "De la colonisation à nos jours", category: "Histoire", duration: "20h", rating: "4.9", img: "history-img" },
    { id: 12, title: "Toussaint Louverture", description: "La vie et l'héritage du précurseur", category: "Histoire", duration: "6h", rating: "5.0", img: "history-img2" },
    { id: 13, title: "Introduction à l'HTML/CSS", description: "Créez votre premier site web", category: "Informatique", duration: "10h", rating: "4.8", img: "it-img" },
    { id: 14, title: "Python pour débutants", description: "Apprenez la programmation avec Python", category: "Informatique", duration: "18h", rating: "4.8", img: "it-img2" },
  ];

  const categories = ['Tous', 'Mathématiques', 'Français', 'Anglais', 'Créole', 'Sciences', 'Histoire', 'Informatique'];

  const filteredCourses = activeFilter === 'Tous' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  return (
    <div className="cours-container">
      

      <section className="banner">
        <h1>📚 Nos cours</h1>
        <p>Découvrez tous les cours disponibles sur EduHaïti</p>
      </section>

      <section className="filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="courses-list">
        <div className="course-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className={`course-img ${course.img}`}></div>
              <span className="course-category">{course.category}</span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-info">
                <span>⏱ {course.duration}</span>
                <span>⭐ {course.rating}</span>
              </div>
              <Link to={`/cours/${course.id}`}>
                <button className="course-btn">Voir le cours →</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default Cours;