const pedidoService = require("../services/PedidoService");
const {
  getAllPedidos,
  getAllPedidosByStatus,
  createPedido,
  getPedidoById,
  getPedidoByStatus,
  updatePedido,
  deletePedido,
} = require("../controllers/PedidoController");

// Mock do serviço
jest.mock("../services/PedidoService");
const mockRequest = (params, body) => ({
  params: params || {},
  body: body || {},
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("PedidoController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllPedidos - sucesso", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const pedidos = [{ id: 1, nome: "Pedido 1" }];
    pedidoService.getAllPedidos.mockResolvedValue(pedidos);

    await getAllPedidos(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: pedidos });
  });

  test("getAllPedidos - falha", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const errorMessage = "Erro ao buscar pedidos";
    pedidoService.getAllPedidos.mockRejectedValue(new Error(errorMessage));

    await getAllPedidos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  test("getAllPedidosByStatus - sucesso", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const pedidos = [{ id: 1, status: "ABERTO" }];
    pedidoService.getAllPedidosByStatus.mockResolvedValue(pedidos);

    await getAllPedidosByStatus(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: pedidos });
  });

  test("createPedido - sucesso", async () => {
    const req = mockRequest({}, { total: 100 });
    const res = mockResponse();
    const pedido = { _id: 1, total: 100 };
    pedidoService.createPedido.mockResolvedValue(pedido);

    await createPedido(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: { pedidoId: 1, total: 100 } });
  });

  test("getPedidoById - pedido não encontrado", async () => {
    const req = mockRequest({ id: 1 });
    const res = mockResponse();
    pedidoService.getPedidoById.mockResolvedValue(null);

    await getPedidoById(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Este Pedido não existe mais ou teve o pagamento recusado' });
  });

  test("getPedidoByStatus - sucesso", async () => {
    const req = mockRequest({ status: "ABERTO" });
    const res = mockResponse();
    const pedido = { id: 1, status: "ABERTO" };
    pedidoService.getPedidoByStatus.mockResolvedValue(pedido);

    await getPedidoByStatus(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: pedido });
  });

  test("updatePedido - pedido cancelado", async () => {
    const req = mockRequest({ id: 1 }, { orderStatus: "cancelado" });
    const res = mockResponse();
    const pedido = { id: 1, status: "CANCELADO" };
    pedidoService.updatePedido.mockResolvedValue(pedido);

    await updatePedido(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Este teve o pagamento recusado ou cancelado!' });
  });

  test("deletePedido - sucesso", async () => {
    const req = mockRequest({ id: 1 });
    const res = mockResponse();
    pedidoService.deletePedido.mockResolvedValue({});

    await deletePedido(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Pedido deletado com sucesso' });
  });
});