const PedidoModel = require("../models/Pedido");
 
exports.getAllPedidos = async () => {
  return await PedidoModel.find();
};

exports.getAllPedidosByStatus = async () => {
  let pedidos =  await PedidoModel.find();
  pedidos.sort((a,b) => (a.orderStatus > b.orderStatus) ? 1 : ((b.orderStatus > a.orderStatus) ? -1 : 0))
  return pedidos
};
 
exports.createPedido = async (pedido) => {
  return await PedidoModel.create(pedido);
};

exports.getPedidoById = async (id) => {
  return await PedidoModel.findById(id);
};

exports.getPedidoByStatus = async (status) => {
  const statusUpperCase = status.toUpperCase()
  return await PedidoModel.find({orderStatus: statusUpperCase})
};
 
exports.updatePedido = async (id, pedido) => {
  return await PedidoModel.findByIdAndUpdate(id, pedido);
};
 
exports.deletePedido = async (id) => {
  return await PedidoModel.findByIdAndDelete(id);
};


