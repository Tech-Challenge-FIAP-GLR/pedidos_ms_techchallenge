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
  id: String,
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
  produtos: [produtoSchema],
},{
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
        delete ret.__v
         ret.produtos.map(v => delete v._id)
        delete ret.password
        ret.id = ret._id
        delete ret._id
    }
  }
});
 
module.exports = mongoose.model("Pedido", pedidoSchema);
