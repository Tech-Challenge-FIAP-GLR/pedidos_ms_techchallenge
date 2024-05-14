const express = require("express");
const mongoose = require("mongoose");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const pedidoRouter = require("../pedidos_ms_techchallenge/src/routes/PedidoRoutes");

const PORT = process.env.PORT || 3000;
const app = express();
require("dotenv").config();

const swaggeOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'pedidos_ms_techchallenge',
      version: '1.0.0',
      description: 'Pedidos Microsserviço Food TechChallenge',
    },
  },
  apis: ['../pedidos_ms_techchallenge/src/routes/PedidoRoutes.js']
}

const swaggerDocs = swaggerJsDoc(swaggeOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

//configure mongoose
mongoose.connect(
  "mongodb://mongodb:27018/pedidosdb",).then(() => {
    console.log("Successfully connected to the DB");
  })
  .catch((e) => {
    console.log('erro', e);
  });

app.use(express.json());
app.use("/api/pedidos", pedidoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});

module.exports = app;