import { db } from "../config/db.js";

export const getRecentContext = async (sessionId) => {
  const rows = await db.all(
    `
    SELECT role, content
    FROM messages
    WHERE session_id = ?
    ORDER BY created_at DESC
    LIMIT 10
    `,
    [sessionId]
  );

  return rows.reverse();
};