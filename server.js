const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'messagedb'
});

// Retry logic
async function connectDB() {
  const MAX_RETRIES = 30;
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      await pool.query('SELECT NOW()');
      console.log('✅ Connected to database');
      return true;
    } catch (error) {
      attempts++;
      console.log(`⏳ DB attempt ${attempts}/${MAX_RETRIES} failed`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  throw new Error('Could not connect to database');
}

// Initialize database
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        text VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Database initialized');
  } catch (error) {
    console.error('❌ DB init error:', error);
  }
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Get all messages
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send message
app.post('/api/messages', async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO messages (text) VALUES ($1) RETURNING *',
      [text]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
async function startServer() {
  try {
    await connectDB();
    await initDB();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start:', error);
    process.exit(1);
  }
}

startServer();