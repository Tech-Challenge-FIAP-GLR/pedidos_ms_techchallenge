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
    const blog = await pedidoService.createPedido(req.body);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getPedidoById = async (req, res) => {
  try {
    const blog = await pedidoService.getPedidoById(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidoByStatus = async (req, res) => {
  try {
    const blog = await pedidoService.getPedidoByStatus(req.params.status);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updatePedido = async (req, res) => {
  try {
    const blog = await pedidoService.updatePedido(req.params.id, req.body);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deletePedido = async (req, res) => {
  try {
    const blog = await pedidoService.deletePedido(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};