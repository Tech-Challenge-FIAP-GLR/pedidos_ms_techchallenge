const express = require("express");
const mongoose = require("mongoose");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const pedidoRouter = require("./src/routes/PedidoRoutes");

const PORT = process.env.PORT || 3000;
const app = express();

const swaggeOptions = {
  swaggerDefinition: {
    info: {
      title: 'pedidos_ms_techchallenge',
      description: 'Pedidos Microsserviço Food TechChallenge',
      version: '1.0.0'
    }
  },
  apis: ['../src/routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggeOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/CRUD",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.use(express.json());
app.use("/api/pedidos", pedidoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});

module.exports = app;