const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const produtoSchema = new Schema({
  id: Number,
  nome: String,
  descricao: String,
  preco: Number,
  categoria: {
    id: Number,
    descricao: String
  }
})
 
const pedidoSchema = new Schema({
  id: {
    type: Number,
    default: 0,
  },
  user: {
    id: Number,
    nome: String,
    cpf: String,
    email: String
  },
  total: Number,
  orderStatus: String,
  dataPedido: {
    type: Date,
    default: Date.now,
  },
  produtos: [produtoSchema]
});
 
module.exports = mongoose.model("Pedido", pedidoSchema);
