const express = require("express")
const cors = require("cors")
const app = express()

const reservationsRoutes = require("./routes/reservations")
const authAdminRoutes = require("./routes/authAdmin")
const adminsRoutes = require('./routes/admins');

app.use('/api/admins', adminsRoutes);
app.use(cors())
app.use(express.json())
app.use("/api/reservations", reservationsRoutes)
app.use("/api/admin", authAdminRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`)
})
