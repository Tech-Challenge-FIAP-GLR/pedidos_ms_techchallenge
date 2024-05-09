const pedidoService = require("../services/PedidoService");
 
exports.getAllPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.getAllPedidos();
    res.json({ data: pedidos, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPedidosByStatus = async (req, res) => {
  try {
    const pedidos = await pedidoService.getAllPedidosByStatus();
    res.json({ data: pedidos, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.createPedido = async (req, res) => {
  try {
    const pedido = await pedidoService.createPedido(req.body);
    const response = {
      id: pedido._id,
      total: pedido.total
    }
    res.json({ data: response, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await pedidoService.getPedidoById(req.params.id);
    if(pedido === null) {
      res.json({  message: 'Este Pedido não existe mais'});
    } else {
      res.json({ data: pedido, status: "success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidoByStatus = async (req, res) => {
  try {
    const pedido = await pedidoService.getPedidoByStatus(req.params.status);
    res.json({ data: pedido, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updatePedido = async (req, res) => {
  try {
    const atualizaStatus =  {
     orderStatus: req.body.orderStatus
    }
    const pedido = await pedidoService.updatePedido(req.params.id, atualizaStatus);
    if(pedido === null) {
      res.json({  message: 'Este Pedido não existe mais'});
    } else {
      res.json({  message: 'Pedido atualizado com sucesso', status: "success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deletePedido = async (req, res) => {
  try {
    const pedido = await pedidoService.deletePedido(req.params.id);
    if(pedido === null) {
      res.json({  message: 'Pedido já foi deletado'});
    } else {
      res.json({  message: 'Pedido deletado com sucesso', status: "success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};