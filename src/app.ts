import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";

const app = express();

// Ne pas divulguer la version du framework via l'en-tête X-Powered-By
app.disable("x-powered-by");

// Restreindre CORS aux origines explicitement autorisées
const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use("/api/tasks", taskRoutes);

export default app;
