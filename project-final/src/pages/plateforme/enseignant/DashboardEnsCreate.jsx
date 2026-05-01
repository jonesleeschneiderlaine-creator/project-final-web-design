import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboardEns.css"

const DashboardEnsCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
    level: "débutant",
    price: "",
    tags: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Création du cours:", formData);
    // TODO: Implémenter la logique de création
    navigate("/plateforme/enseignant/cours");
  };

  return (
    <div className="dashboard-enseignant-page">
      <header className="page-header">
        <h2>Créer un nouveau cours</h2>
        <p>Remplissez les informations de votre cours.</p>
      </header>

      <form onSubmit={handleSubmit} className="create-course-form">
        <div className="form-grid">
          <div className="form-section">
            <h3>Informations générales</h3>

            <div className="form-group">
              <label htmlFor="title">
                Titre du cours *
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Introduction à l'algèbre linéaire"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="category">
                Catégorie *
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="mathematiques">Mathématiques</option>
                  <option value="informatique">Informatique</option>
                  <option value="sciences">Sciences</option>
                  <option value="langues">Langues</option>
                  <option value="business">Business</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Description *
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Décrivez le contenu de votre cours, les objectifs d'apprentissage..."
                  rows={6}
                  required
                />
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Détails du cours</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">
                  Durée estimée
                  <input
                    id="duration"
                    name="duration"
                    type="text"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Ex: 8 semaines"
                  />
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="level">
                  Niveau
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                  >
                    <option value="débutant">Débutant</option>
                    <option value="intermédiaire">Intermédiaire</option>
                    <option value="avancé">Avancé</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="price">
                Prix (HTG)
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Ex: 2500"
                  min="0"
                />
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="tags">
                Mots-clés (séparés par des virgules)
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Ex: algèbre, matrices, équations"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={() => navigate("/plateforme/enseignant/cours")}>
            Annuler
          </button>
          <button type="submit" className="primary-button">
            Enregistrer le brouillon
          </button>
        </div>
      </form>
    </div>
  )
}

export default DashboardEnsCreate
