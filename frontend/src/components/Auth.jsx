import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../assets/styles/auth.css'
import Logo from '../assets/logo.png' 

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("token", data.token)
        navigate("/dashboard")
      } else {
        setError(data.message || "Échec de la connexion")
      }
    } catch (err) {
      console.error(err)
      setError("Erreur réseau")
    }
  }

  return (
    <div className="auth-container">
      <img src={Logo} alt="Logo Resto Bonheur" className="auth-logo" />
      <h2>Connexion admin</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  )
}
