const express = require("express");
const mongoose = require("mongoose");
const pedidoRouter = require("./src/routes/PedidoRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

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