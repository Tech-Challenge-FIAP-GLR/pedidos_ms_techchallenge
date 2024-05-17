const PedidoModel = require("../models/Pedido");
const pedidoService = require("../services/PedidoService");

// Mock do PedidoModel
jest.mock("../models/Pedido");

describe("PedidoService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllPedidos - deve retornar todos os pedidos", async () => {
    const mockPedidos = [{ id: 1, orderStatus: "RECEBIDO" }];
    PedidoModel.find.mockResolvedValue(mockPedidos);

    const pedidos = await pedidoService.getAllPedidos();
    
    expect(pedidos).toEqual(mockPedidos);
    expect(PedidoModel.find).toHaveBeenCalledTimes(1);
  });

  test("getAllPedidosByStatus - deve retornar pedidos ordenados por status", async () => {
    const mockPedidos = [
      { id: 1, orderStatus: "EMPREPARO" },
      { id: 2, orderStatus: "RECEBIDO" }
    ];
    PedidoModel.find.mockResolvedValue(mockPedidos);

    const pedidos = await pedidoService.getAllPedidosByStatus();
    
    expect(pedidos).toEqual([
      { id: 1, orderStatus: "EMPREPARO" },
      { id: 2, orderStatus: "RECEBIDO" }
    ]);
    expect(PedidoModel.find).toHaveBeenCalledTimes(1);
  });

  test("createPedido - deve criar um pedido com status RECEBIDO", async () => {
    const mockPedido = { user: { id: 1, nome: "João" }, total: 100 };
    const mockCreatedPedido = { ...mockPedido, orderStatus: "RECEBIDO" };
    PedidoModel.create.mockResolvedValue(mockCreatedPedido);

    const createdPedido = await pedidoService.createPedido(mockPedido);

    expect(createdPedido).toEqual(mockCreatedPedido);
    expect(PedidoModel.create).toHaveBeenCalledWith({ ...mockPedido, orderStatus: "RECEBIDO" });
  });

  test("getPedidoById - deve retornar um pedido pelo ID", async () => {
    const mockPedido = { id: 1, orderStatus: "RECEBIDO" };
    PedidoModel.findById.mockResolvedValue(mockPedido);

    const pedido = await pedidoService.getPedidoById(1);

    expect(pedido).toEqual(mockPedido);
    expect(PedidoModel.findById).toHaveBeenCalledWith(1);
  });

  test("getPedidoByStatus - deve retornar pedidos pelo status", async () => {
    const mockPedidos = [{ id: 1, orderStatus: "RECEBIDO" }];
    PedidoModel.find.mockResolvedValue(mockPedidos);

    const pedidos = await pedidoService.getPedidoByStatus("recebido");

    expect(pedidos).toEqual(mockPedidos);
    expect(PedidoModel.find).toHaveBeenCalledWith({ orderStatus: "RECEBIDO" });
  });

  test("updatePedido - deve atualizar um pedido quando o status não é CANCELADO", async () => {
    const mockPedido = { id: 1, orderStatus: "EMPREPARO" };
    PedidoModel.findByIdAndUpdate.mockResolvedValue(mockPedido);

    const updatedPedido = await pedidoService.updatePedido(1, { orderStatus: "EMPREPARO" });

    expect(updatedPedido).toEqual(mockPedido);
    expect(PedidoModel.findByIdAndUpdate).toHaveBeenCalledWith(1, { orderStatus: "EMPREPARO" });
  });

  test("updatePedido - deve deletar um pedido quando o status é CANCELADO", async () => {
    const mockPedido = { id: 1, orderStatus: "CANCELADO" };
    PedidoModel.findByIdAndDelete.mockResolvedValue(mockPedido);

    const deletedPedido = await pedidoService.updatePedido(1, { orderStatus: "cancelado" });

    expect(deletedPedido).toEqual(mockPedido);
    expect(PedidoModel.findByIdAndDelete).toHaveBeenCalledWith(1);
  });

  test("deletePedido - deve deletar um pedido pelo ID", async () => {
    const mockPedido = { id: 1 };
    PedidoModel.findByIdAndDelete.mockResolvedValue(mockPedido);

    const deletedPedido = await pedidoService.deletePedido(1);

    expect(deletedPedido).toEqual(mockPedido);
    expect(PedidoModel.findByIdAndDelete).toHaveBeenCalledWith(1);
  });
});