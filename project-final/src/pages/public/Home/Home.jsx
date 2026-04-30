import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Landing Page</h1>

      <button onClick={() => navigate("/plateforme")}>
        Commencer
      </button>
    </div>
  )
}

export default Home