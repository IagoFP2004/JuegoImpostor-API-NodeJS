import { pool } from "../lib/db.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query("SELECT * FROM words");
      return res.status(200).json(rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
