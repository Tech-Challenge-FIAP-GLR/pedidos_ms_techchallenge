const express = require("express");
const {
  getAllPedidos,
  createPedido,
  getPedidoById,
  updatePedido,
  deletePedido,
  getPedidoByStatus,
  getAllPedidosByStatus
} = require("../controllers/PedidoController");
 
const router = express.Router();
 
router.route("/").get(getAllPedidos).post(createPedido);
router.route("/status").get(getAllPedidosByStatus);
router.route("/status/:status").get(getPedidoByStatus);
router.route("/:id").get(getPedidoById).put(updatePedido).delete(deletePedido);
 
module.exports = router;