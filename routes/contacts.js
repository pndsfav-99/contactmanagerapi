const express = require('express');
const router = express.Router();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  }
};

router.get('/', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM contacts');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    await sql.connect(config);
    await sql.query`INSERT INTO contacts (name, email, phone) VALUES (${name}, ${email}, ${phone})`;
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
