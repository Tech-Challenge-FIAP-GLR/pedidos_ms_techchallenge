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

/**
 * @swagger
 * /api/pedidos/status:
 *   get:
 *     summary: Retorna todos os pedidos organizado por status
 *     description:  Retorna todos os pedidos organizado por status
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       500:
 *         description: Erro do servidor
 */
router.route("/status").get(getAllPedidosByStatus);

/**
 * @swagger
 * /api/pedidos/status/:status:
 *   get:
 *     summary: Retorna todos os pedidos organizado por status através de querie
 *     description:  Retorna todos os pedidos organizado por status através de querie.
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       500:
 *         description: Erro do servidor
 */
router.route("/status/:status").get(getPedidoByStatus);

/**
 * @swagger
 * /api/pedidos/:id:
 *   get:
 *     summary: Retorna um pedido através do id
 *     description: Retorna um pedido através do id.
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /api/pedidos/:id:
 *   put:
 *     summary: Atualiza pedido
 *     description: Atualiza um pedido através do id
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /api/pedidos/:id:
 *   delete:
 *     summary: Delete pedido
 *     description: Exclui um pedido através do id
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro do servidor
 */
router.route("/:id").get(getPedidoById).put(updatePedido).delete(deletePedido);
 
module.exports = router;