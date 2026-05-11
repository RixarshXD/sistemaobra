import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { timeStamp } from "console";

// archivos .env
dotenv.config();

// inicializar el servidor
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// uso de cors para consumir la api de diferentes origenes y puertos,
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://mi-frontend.vercel.app"
        : "http://localhost:5173",
    credentials: true,
  }),
);

// rutas de la api
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "SistemaObra API funcionando correctamente",
    timeStamp: new Date().toISOString(),
  });
});

//iniciar el servidor
app.listen(PORT, () => {
  console.log(
    `
      ┌─────────────────────────────────────────┐
      │    SistemaObra API                      │
      │    Corriendo en http://localhost:${PORT}│
      │    Ambiente: ${process.env.NODE_ENV}    │
      └─────────────────────────────────────────┘
      `,
  );
});
