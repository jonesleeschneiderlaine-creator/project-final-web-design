// src/components/plateforme/Etudiant/CourseCard/CourseCard.jsx
// ─── Carte cours étudiant ────────────────────────────────────────────────────

import { FiBookOpen, FiTarget } from 'react-icons/fi';
import './courseCard.css';

const SUBJECT_GRADIENT = {
  math: 'course-card--math',
  science: 'course-card--science',
  french: 'course-card--french',
  history: 'course-card--history',
  english: 'course-card--english',
  computer: 'course-card--computer',
};

const CourseCard = ({ course, variant = 'grid', onContinue }) => (
  <div className={`course-card ${variant === 'list' ? 'course-card--list' : ''}`}>
    <div className={`course-card__cover ${SUBJECT_GRADIENT[course.subject] || ''}`}>
      <div className="course-card__progress-circle">{course.progress}%</div>
    </div>

    <div className="course-card__info">
      <h3>{course.title}</h3>
      {course.chapter && <p>{course.chapter}</p>}
      {course.teacher && <p className="course-card__teacher">{course.teacher}</p>}

      <div className="course-card__progress">
        <div className="course-card__progress-bar">
          <div className="course-card__progress-fill" style={{ width: `${course.progress}%` }} />
        </div>
      </div>

      <div className="course-card__meta">
        <span><FiBookOpen size={12} /> {course.lessons} leçons</span>
        <span><FiTarget size={12} /> {course.progress}%</span>
      </div>

      <button className="course-card__btn" onClick={onContinue}>
        Continuer
      </button>
    </div>
  </div>
);

export default CourseCard;