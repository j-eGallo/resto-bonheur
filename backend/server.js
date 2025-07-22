const express = require('express');
const cors = require('cors');
const app = express();
const reservationsRoutes = require('./routes/reservations');

app.use(cors());
app.use(express.json());

app.use('/api/reservations', reservationsRoutes);

app.listen(3000, () => {
  console.log('Serveur backend lancé sur http://localhost:3000');
});
