const supertest = require("supertest");
const app = require("../../index");
const pedidoService = require("../services/PedidoService");

// Mocking pedidoService module
jest.mock("../services/PedidoService");

describe("Pedido Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /pedidos", () => {
    it("should return all pedidos", async () => {
      const mockPedidos = [{ _id: "1", orderStatus: "RECEBIDO" }, { _id: "2", orderStatus: "EM_PROCESSAMENTO" }];
      pedidoService.getAllPedidos.mockResolvedValue(mockPedidos);
      const response = await supertest(app).get("/pedidos");
      expect(response.status).toBe(404);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual(mockPedidos);
    });

    it("should handle errors", async () => {
      const errorMessage = "Internal server error";
      pedidoService.getAllPedidos.mockRejectedValue(new Error(errorMessage));
      const response = await supertest(app).get("/pedidos");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(errorMessage);
    });
  });
  describe("getAllPedidosByStatus", () => {
    it("should return all pedidos sorted by orderStatus", async () => {
      const mockPedidos = [{ _id: "1", orderStatus: "RECEBIDO" }, { _id: "2", orderStatus: "EM_PROCESSAMENTO" }];
      pedidoService.getAllPedidosByStatus.mockResolvedValue(mockPedidos);
      const response = await supertest(app).get("/pedidos/status");
      expect(response.status).toBe(404);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual(mockPedidos);
    });

    it("should handle errors", async () => {
      const errorMessage = "Internal server error";
      pedidoService.getAllPedidosByStatus.mockRejectedValue(new Error(errorMessage));
      const response = await supertest(app).get("/pedidos/status");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(errorMessage);
    });
  });

  describe("createPedido", () => {
    it("should create a new pedido", async () => {
      const mockPedido = { _id: "1", orderStatus: "RECEBIDO" };
      pedidoService.createPedido.mockResolvedValue(mockPedido);
      const requestBody = { /* mock pedido data */ };
      const response = await supertest(app).post("/pedidos").send(requestBody);
      expect(response.status).toBe(404);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual({ id: mockPedido._id, orderStatus: mockPedido.orderStatus });
    });

    it("should handle errors", async () => {
      const errorMessage = "Internal server error";
      pedidoService.createPedido.mockRejectedValue(new Error(errorMessage));
      const response = await supertest(app).post("/pedidos").send({ /* mock pedido data */ });
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(errorMessage);
    });
  });

  describe("getPedidoById", () => {
    it("should return pedido by id", async () => {
      const mockPedido = { _id: "1", orderStatus: "RECEBIDO" };
      pedidoService.getPedidoById.mockResolvedValue(mockPedido);
      const response = await supertest(app).get("/pedidos/1");
      expect(response.status).toBe(404);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual(mockPedido);
    });

    it("should handle non-existing pedido", async () => {
      pedidoService.getPedidoById.mockResolvedValue(null);
      const response = await supertest(app).get("/pedidos/999");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Este Pedido não existe mais");
    });

    it("should handle errors", async () => {
      const errorMessage = "Internal server error";
      pedidoService.getPedidoById.mockRejectedValue(new Error(errorMessage));
      const response = await supertest(app).get("/pedidos/1");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(errorMessage);
    });
  });

  describe("getPedidoByStatus", () => {
    it("should return pedidos by status", async () => {
      const mockPedidos = [{ _id: "1", orderStatus: "RECEBIDO" }, { _id: "2", orderStatus: "RECEBIDO" }];
      pedidoService.getPedidoByStatus.mockResolvedValue(mockPedidos);
      const response = await supertest(app).get("/pedidos/status/RECEBIDO");
      expect(response.status).toBe(404);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual(mockPedidos);
    });

    it("should handle errors", async () => {
      const errorMessage = "Internal server error";
      pedidoService.getPedidoByStatus.mockRejectedValue(new Error(errorMessage));
      const response = await supertest(app).get("/pedidos/status/RECEBIDO");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(errorMessage);
    });
  });

  describe("updatePedido", () => {
    it("should update pedido by id", async () => {
      const mockPedido = { _id: "1", orderStatus: "RECEBIDO" };
      pedidoService.updatePedido.mockResolvedValue(mockPedido);
      const requestBody = { orderStatus: "EM_PROCESSAMENTO" };
      const response = await supertest(app).put("/pedidos/1").send(requestBody);
      expect(response.status).toBe(404);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Pedido atualizado com sucesso");
    });

    it("should handle non-existing pedido", async () => {
      pedidoService.updatePedido.mockResolvedValue(null);
      const response = await supertest(app).put("/pedidos/999").send({ orderStatus: "EM_PROCESSAMENTO" });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Este Pedido não existe mais");
    });

    it("should handle errors", async () => {
      const errorMessage = "Internal server error";
      pedidoService.updatePedido.mockRejectedValue(new Error(errorMessage));
      const response = await supertest(app).put("/pedidos/1").send({ orderStatus: "EM_PROCESSAMENTO" });
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(errorMessage);
    });
  });

  describe("deletePedido", () => {
    it("should delete pedido by id", async () => {
      pedidoService.deletePedido.mockResolvedValue({ _id: "1" });
      const response = await supertest(app).delete("/pedidos/1");
      expect(response.status).toBe(404);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Pedido deletado com sucesso");
    });

    it("should handle non-existing pedido", async () => {
      pedidoService.deletePedido.mockResolvedValue(null);
      const response = await supertest(app).delete("/pedidos/999");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Pedido já foi deletado");
    });

    it("should handle errors", async () => {
      const errorMessage = "Internal server error";
      pedidoService.deletePedido.mockRejectedValue(new Error(errorMessage));
      const response = await supertest(app).delete("/pedidos/1");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(errorMessage);
    });
  });
});
