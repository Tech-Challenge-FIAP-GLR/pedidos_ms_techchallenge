const pedidoService = require("../services/PedidoService");
const PedidoModel = require("../models/Pedido");

// Mocking PedidoModel methods
jest.mock("../models/Pedido");

describe("Pedido Service", () => {
  describe("getAllPedidos", () => {
    it("should return all pedidos", async () => {
      const mockPedidos = [{ _id: 1, orderStatus: "RECEBIDO" }, { _id: 2, orderStatus: "EM_PROCESSAMENTO" }];
      PedidoModel.find.mockResolvedValue(mockPedidos);
      const result = await pedidoService.getAllPedidos();
      expect(result).toEqual(mockPedidos);
    });
  });

  describe("getAllPedidosByStatus", () => {
    it("should return all pedidos sorted by orderStatus", async () => {
      const mockPedidos = [{ _id: 1, orderStatus: "RECEBIDO" }, { _id: 2, orderStatus: "EM_PROCESSAMENTO" }];
      PedidoModel.find.mockResolvedValue(mockPedidos);
      const result = await pedidoService.getAllPedidosByStatus();
      const expected = [{ _id: 2, orderStatus: "EM_PROCESSAMENTO" }, { _id: 1, orderStatus: "RECEBIDO" }];
      expect(result).toEqual(expected);
    });
  });

  describe("createPedido", () => {
    it("should create a new pedido with orderStatus 'RECEBIDO'", async () => {
      const mockPedido = { _id: 1, orderStatus: "RECEBIDO" };
      const pedidoData = { /* Some mock data for creating pedido */ };
      PedidoModel.create.mockResolvedValue(mockPedido);
      const result = await pedidoService.createPedido(pedidoData);
      expect(result).toEqual(mockPedido);
    });
  });

  describe("getPedidoById", () => {
    it("should return pedido by id", async () => {
      const mockPedido = { _id: 1, orderStatus: "RECEBIDO" };
      PedidoModel.findById.mockResolvedValue(mockPedido);
      const result = await pedidoService.getPedidoById(1);
      expect(result).toEqual(mockPedido);
    });
  });

  describe("getPedidoByStatus", () => {
    it("should return pedidos by status", async () => {
      const mockPedidos = [{ _id: 1, orderStatus: "RECEBIDO" }, { _id: 2, orderStatus: "RECEBIDO" }];
      const status = "RECEBIDO";
      PedidoModel.find.mockResolvedValue(mockPedidos);
      const result = await pedidoService.getPedidoByStatus(status);
      expect(result).toEqual(mockPedidos);
    });
  });

  describe("updatePedido", () => {
    it("should update pedido by id", async () => {
      const mockPedido = { _id: 1, orderStatus: "RECEBIDO" };
      const updatedPedido = { /* Updated pedido data */ };
      PedidoModel.findByIdAndUpdate.mockResolvedValue(mockPedido);
      const result = await pedidoService.updatePedido(1, updatedPedido);
      expect(result).toEqual(mockPedido);
    });
  });

  describe("deletePedido", () => {
    it("should delete pedido by id", async () => {
      const mockPedido = { _id: 1, orderStatus: "RECEBIDO" };
      PedidoModel.findByIdAndDelete.mockResolvedValue(mockPedido);
      const result = await pedidoService.deletePedido(1);
      expect(result).toEqual(mockPedido);
    });
  });
});
