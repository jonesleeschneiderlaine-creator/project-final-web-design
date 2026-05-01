// Mock data for student dashboard
export const studentStats = {
  coursesEnCours: 4,
  coursesTermines: 12,
  heuresApprentissage: "48h",
  scoreMoyen: "85%"
}

export const studentCourses = [
  {
    id: 1,
    title: "Algèbre linéaire",
    status: "En cours",
    progress: 46,
    instructor: "Dr. Marie Dubois"
  },
  {
    id: 2,
    title: "Python pour débutants",
    status: "En cours",
    progress: 72,
    instructor: "Eng. Jean Sophie",
    variant: "orange"
  },
  {
    id: 3,
    title: "Physique générale",
    status: "En cours",
    progress: 58,
    instructor: "Prof. André Alceus",
    variant: "blue"
  }
]

export const studentCertificates = [
  {
    id: 1,
    title: "Certificat de Mathématiques",
    date: "12 avril 2026",
    icon: "🏆"
  },
  {
    id: 2,
    title: "Certificat de Programmation",
    date: "28 mars 2026",
    icon: "🎓"
  }
]

// Mock data for teacher dashboard
export const teacherStats = {
  coursPubies: 8,
  etudiants: 342,
  tauxCompletion: "76%",
  satisfaction: "81%"
}

export const teacherCourses = [
  {
    id: 1,
    title: "Programmation moderne",
    students: 134,
    progress: 82
  },
  {
    id: 2,
    title: "Mathématiques avancées",
    students: 78,
    progress: 68
  },
  {
    id: 3,
    title: "Sciences des données",
    students: 95,
    progress: 71
  }
]

export const teacherStats2 = {
  vues: 4820,
  croissance: "234%",
  etudiants: 1240,
  tauxCompletion: "89%"
}

export const recentActivities = [
  {
    id: 1,
    type: "new_enroll",
    message: "5 nouveaux étudiants inscrits",
    time: "il y a 3h"
  },
  {
    id: 2,
    type: "completed",
    message: "Quiz complété par Marie",
    time: "il y a 5h"
  },
  {
    id: 3,
    type: "review",
    message: "Nouveau commentaire sur le cours",
    time: "il y a 8h"
  }
]
