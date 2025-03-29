import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Reto Técnico (Node JS / React JS)",
      version: "1.0.0",
      description: "Documentación de la API Reto Técnico (Node JS / React JS)",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Ubicación de los archivos con la documentación
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("📄 Documentación Swagger disponible en: http://localhost:4000/api-docs");
};

export default setupSwagger;
