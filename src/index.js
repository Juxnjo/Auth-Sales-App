import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import setupSwagger from "./config/swagger.js"; // Importa Swagger
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import saleRoutes from "./routes/sale.routes.js";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);

// Configurar Swagger
setupSwagger(app);

//Servidor
app.listen(PORT);
console.log("Servidor en el puerto", PORT);
