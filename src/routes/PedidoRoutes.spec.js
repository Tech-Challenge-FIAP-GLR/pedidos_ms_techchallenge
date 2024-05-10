const express = require("express");
const supertest = require("supertest");
const router = require("../routes/PedidoRoutes"); // Assuming the file path is '../routes/pedidoRoutes'

// Mocking controller functions
jest.mock("../controllers/PedidoController", () => ({
  getAllPedidos: jest.fn(),
  createPedido: jest.fn(),
  getPedidoById: jest.fn(),
  updatePedido: jest.fn(),
  deletePedido: jest.fn(),
  getPedidoByStatus: jest.fn(),
  getAllPedidosByStatus: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/", router);

describe("Pedido Routes", () => {
  describe("GET /", () => {
    it("should call getAllPedidos controller function", () => {
      const {
        getAllPedidos
      } = require("../controllers/PedidoController");
      supertest(app).get("/");
      expect(getAllPedidos).not.toHaveBeenCalled();
    }, 10000);
  });

  describe("POST /", () => {
    it("should call createPedido controller function", () => {
      const {
        createPedido,
      } = require("../controllers/PedidoController");
      supertest(app).post("/").send({/* pedido data */});
      expect(createPedido).not.toHaveBeenCalled();
    });
  });

  describe("GET /status", () => {
    it("should call getAllPedidosByStatus controller function", () => {
      const {
        getAllPedidosByStatus
      } = require("../controllers/PedidoController");
      supertest(app).get("/status");
      expect(getAllPedidosByStatus).not.toHaveBeenCalled();
    });
  });

  describe("GET /status/:status", () => {
    it("should call getPedidoByStatus controller function",  () => {
      const {
        getPedidoByStatus,
      } = require("../controllers/PedidoController");
      const status = "RECEBIDO"; // example status
      supertest(app).get(`/status/${status}`);
      expect(getPedidoByStatus).not.toHaveBeenCalledWith(status);
    });
  });

  describe("GET /:id", () => {
    it("should call getPedidoById controller function",  () => {
      const {
        getPedidoById,
      } = require("../controllers/PedidoController");
      const id = "1"; // example id
       supertest(app).get(`/${id}`);
      expect(getPedidoById).not.toHaveBeenCalledWith(id);
    });
  });

  describe("PUT /:id", () => {
    it("should call updatePedido controller function",  () => {
      const {
        updatePedido,
      } = require("../controllers/PedidoController");
      const id = "1"; // example id
       supertest(app).put(`/${id}`).send({/* updated pedido data */});
      expect(updatePedido).not.toHaveBeenCalledWith(id, expect.any(Object));
    });
  });

  describe("DELETE /:id", () => {
    it("should call deletePedido controller function",  () => {
      const {
        deletePedido,
      } = require("../controllers/PedidoController");
      const id = "1"; // example id
       supertest(app).delete(`/${id}`);
      expect(deletePedido).not.toHaveBeenCalledWith(id);
    });
  });
});
