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
 
/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Retorna todos os pedidos
 *     description: Obtém uma lista de todos os pedidos.
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       500:
 *         description: Erro do servidor
 */
/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     description: Cria um novo pedido com os dados fornecidos.
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro do servidor
 */
router.route("/").get(getAllPedidos).post(createPedido);

router.route("/status").get(getAllPedidosByStatus);
router.route("/status/:status").get(getPedidoByStatus);
router.route("/:id").get(getPedidoById).put(updatePedido).delete(deletePedido);
 
module.exports = router;