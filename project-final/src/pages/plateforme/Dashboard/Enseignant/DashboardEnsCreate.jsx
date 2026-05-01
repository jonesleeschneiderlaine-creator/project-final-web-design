import "./dashboardEns.css"

const DashboardEnsCreate = () => {
  return (
    <div className="dashboard-enseignant-page">
      <h2>Créer un cours</h2>
      <div className="form-card">
        <label>
          Titre du cours
          <input type="text" placeholder="Nom du cours" />
        </label>
        <label>
          Catégorie
          <input type="text" placeholder="Ex: Mathématiques" />
        </label>
        <label>
          Description
          <textarea placeholder="Description du cours" />
        </label>
        <button className="primary-button">Enregistrer le brouillon</button>
      </div>
    </div>
  )
}

export default DashboardEnsCreate
