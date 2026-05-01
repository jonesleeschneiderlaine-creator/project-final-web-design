import "./CertificateCard.css"

const CertificateCard = ({ title, date, onDownload }) => {
  return (
    <article className="certificate-card">
      <h3>{title}</h3>
      <p>Obtenu le : {date}</p>

      <button onClick={onDownload}>
        Télécharger
      </button>
    </article>
  )
}

export default CertificateCard