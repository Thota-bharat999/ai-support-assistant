import express from "express";
import { chat } from "../controllers/chatController.js";
import { db } from "../config/db.js";

const router = express.Router();

router.post("/chat", chat);

router.get("/conversations/:sessionId",
async (req,res)=>{
 const rows = await db.all(
   `SELECT * FROM messages
    WHERE session_id=?
    ORDER BY created_at ASC`,
   [req.params.sessionId]
 );
 res.json(rows);
});

router.get("/sessions", async (_,res)=>{
 const sessions = await db.all(`
   SELECT id, updated_at
   FROM sessions
   ORDER BY updated_at DESC
 `);
 res.json(sessions);
});

export default router;