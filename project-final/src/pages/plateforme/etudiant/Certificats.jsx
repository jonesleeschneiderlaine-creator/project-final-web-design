import { studentCertificates } from "@/lib/mockData"
import "@/pages/plateforme/etudiant/dashboardEt.css"
import CertificateCard from "@/components/shared/CertificateCard"

const Certificats = () => {
  return (
    <div className="student-page">

      <header className="page-header">
        <h2>Mes certificats</h2>
        <p>Tous les certificats que vous avez obtenus.</p>
      </header>

      <div className="certificates-grid">
        {studentCertificates.map((cert) => (
          <CertificateCard
            key={cert.id}
            title={cert.title}
            date={cert.date}
            icon={cert.icon}
            onDownload={() => console.log("Téléchargement de", cert.title)}
          />
        ))}
      </div>

    </div>
  )
}

export default Certificats