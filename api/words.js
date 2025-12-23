import Cors from 'cors';
import { pool } from '../../lib/db.js';

// Inicializa middleware
const cors = Cors({
  origin: '*' , // permite cualquier origen (para desarrollo)
  methods: ['GET', 'HEAD']
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors); // ejecuta CORS

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM words');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
