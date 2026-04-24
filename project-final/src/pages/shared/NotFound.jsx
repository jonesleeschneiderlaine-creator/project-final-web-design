import "./notFound.css"
import { Link, useLocation } from 'react-router-dom'


const NotFound = () => {
  const location = useLocation()
  
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>La page <code>{location.pathname}</code> n'existe pas.</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}

export default NotFound