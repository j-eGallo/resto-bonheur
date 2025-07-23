import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';
import '../assets/styles/dashboard.css'

export default function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchReservations = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reservations");
      if (!res.ok) throw new Error("Erreur lors de la récupération");
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteReservation = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/reservations/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      setReservations(reservations.filter(r => r.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container" style={{ maxWidth: 900, margin: "auto", padding: "1rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <img src={Logo} alt="Logo Resto Bonheur" style={{ height: 60 }} />
        <button 
          onClick={handleLogout} 
          style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "5px", cursor: "pointer", width:"auto" }}
        >
          Déconnexion
        </button>
      </header>

      <h1>Dashboard des Réservations</h1>
      {reservations.length === 0 ? (
        <p>Aucune réservation.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Personnes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(({ id, nom, email, date, heure, personnes }) => (
              <tr key={id}>
                <td>{nom}</td>
                <td>{email}</td>
                <td>{date}</td>
                <td>{heure}</td>
                <td>{personnes}</td>
                <td>
                  <button 
                    onClick={() => deleteReservation(id)} 
                    style={{ backgroundColor: "red", color: "white", border: "none", padding: "0.3rem 0.6rem", borderRadius: "3px", cursor: "pointer" }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
