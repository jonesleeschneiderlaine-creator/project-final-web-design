import { studentCertificates } from "@/lib/mockData";
import "./dashboardEt.css"

const Certificats = () => {
  return (
    <div className="student-page">
      <header className="page-header">
        <h2>Mes certificats</h2>
        <p>Tous les certificats que vous avez obtenus.</p>
      </header>

      <div className="certificates-grid">
        {studentCertificates.map((cert) => (
          <article key={cert.id} className="certificate-card">
            <div className="cert-icon">{cert.icon}</div>
            <h3>{cert.title}</h3>
            <p className="cert-date">Obtenu le {cert.date}</p>
            <button className="secondary-button">Télécharger le PDF</button>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Certificats
