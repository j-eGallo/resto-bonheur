const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email])

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Identifiants invalides' })
    }

    const admin = rows[0]

    if (password !== admin.password) {
      return res.status(401).json({ message: 'Mot de passe incorrect' })
    }

    res.json({ token: 'token_test_sans_hash' })
  } catch (err) {
    console.error('Erreur serveur :', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})


module.exports = router
