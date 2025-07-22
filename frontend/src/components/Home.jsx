import { useState } from "react"
import Logo from '../assets/logo.png'

export default function Home() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    date: "",
    heure: "",
    personnes: 1,
  })

  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setMessage("Réservation envoyée avec succès !")
        setFormData({ nom: "", email: "", date: "", heure: "", personnes: 1 })
      } else {
        setMessage("Erreur lors de la réservation.")
      }
    } catch (err) {
      console.error(err)
      setMessage("Erreur réseau.")
    }
  }

  return (
    <div className="container" style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
    <div style={{ position: "absolute", top: "20px", left: "20px" }}>
      <img src={Logo} alt="Logo" className="logo-resto" />
    </div>
      <h1 style={{ textAlign: "center" }}>Réservation</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="heure"
          value={formData.heure}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="personnes"
          value={formData.personnes}
          onChange={handleChange}
          min="1"
          required
        />
        <button type="submit">Réserver</button>
      </form>
      {message && <p style={{ marginTop: "1rem", textAlign: "center" }}>{message}</p>}
    </div>
  )
}
