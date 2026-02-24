import { db } from "../config/db.js";
import { findRelevantDocs } from "../services/docService.js";
import { getRecentContext } from "../services/contextService.js";
import { generateReply } from "../services/llmService.js";

export const chat = async (req, res, next) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message)
      return res.status(400).json({
        error: "sessionId and message required"
      });

    await db.run(
      `INSERT OR IGNORE INTO sessions(id) VALUES(?)`,
      [sessionId]
    );

    await db.run(
      `INSERT INTO messages(session_id,role,content)
       VALUES(?,?,?)`,
      [sessionId, "user", message]
    );

    const docs = findRelevantDocs(message);
    const history =
      await getRecentContext(sessionId);

    const result =
      await generateReply(
        docs,
        history,
        message
      );

    await db.run(
      `INSERT INTO messages(session_id,role,content)
       VALUES(?,?,?)`,
      [sessionId, "assistant", result.reply]
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};