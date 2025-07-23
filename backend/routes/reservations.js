const express = require('express');
const router = express.Router();
const db = require('../db');


router.post('/', async (req, res) => {
  const { nom, email, date, heure, personnes } = req.body;

  if (!nom || !email || !date || !heure || !personnes) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  try {
    const sql = 'INSERT INTO reservations (nom, email, date, heure, personnes) VALUES (?, ?, ?, ?, ?)';
    const values = [nom, email, date, heure, personnes];
    await db.query(sql, values);
    console.log('Réservation ajoutée !');
    res.status(201).json({ message: 'Réservation enregistrée !' });
  } catch (err) {
    console.error('Erreur lors de l\'insertion :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reservations ORDER BY date, heure');
    res.json(rows);
  } catch (err) {
    console.error('Erreur lors de la récupération :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM reservations WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.json({ message: 'Réservation supprimée' });
  } catch (err) {
    console.error('Erreur lors de la suppression :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
