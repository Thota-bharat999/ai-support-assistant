import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { initDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await initDB();   // ⭐ IMPORTANT


  app.listen(PORT, () =>
    console.log(`🚀 Server running on ${PORT}`)
  );
};

startServer();