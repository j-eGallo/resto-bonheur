const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { nom, email, date, heure, personnes } = req.body;

  if (!nom || !email || !date || !heure || !personnes) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  const sql = 'INSERT INTO reservations (nom, email, date, heure, personnes) VALUES (?, ?, ?, ?, ?)';
  const values = [nom, email, date, heure, personnes];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    console.log('Réservation ajoutée !');
    res.status(201).json({ message: 'Réservation enregistrée !' });
  });
});

module.exports = router;
