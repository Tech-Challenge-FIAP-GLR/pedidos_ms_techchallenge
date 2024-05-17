const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../pedidos_ms_techchallenge/index.js"); // Ajuste o caminho para o seu arquivo principal
const PedidoModel = require("../pedidos_ms_techchallenge/src/models/Pedido.js"); // Ajuste o caminho para o seu modelo de Pedido

// Mock de mongoose.connect
jest.mock("mongoose", () => ({
  connect: jest.fn().mockResolvedValue(() => {
    console.log("Mocked mongoose connection");
  }),
  connection: {
    on: jest.fn(),
    once: jest.fn(),
    close: jest.fn().mockResolvedValue(() => {
      console.log("Mocked mongoose disconnection");
    }),
  },
}));

// Mock do PedidoModel
jest.mock("../pedidos_ms_techchallenge/src/models/Pedido.js", () => ({
  find: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("API Endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/pedidos - deve retornar lista de pedidos", async () => {
    const mockPedidos = [
      { id: "1", orderStatus: "RECEBIDO" },
      { id: "2", orderStatus: "EMPREPARO" },
    ];
    PedidoModel.find.mockResolvedValue(mockPedidos);

    const res = await request(app).get("/api/pedidos");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data", mockPedidos);
    expect(PedidoModel.find).toHaveBeenCalledTimes(1);
  });

  test("POST /api/pedidos - deve criar um novo pedido", async () => {
    const newPedido = {
      user: {
        id: 1,
        nome: "João",
        cpf: "12345678900",
        email: "joao@example.com",
      },
      total: 100,
      produtos: [
        { nome: "Produto 1", descricao: "Descrição 1", preco: 50, categoriaId: 1 },
        { nome: "Produto 2", descricao: "Descrição 2", preco: 50, categoriaId: 2 },
      ],
    };
    const mockCreatedPedido = { ...newPedido, id: "1", orderStatus: "RECEBIDO" };
    PedidoModel.create.mockResolvedValue(mockCreatedPedido);

    const res = await request(app).post("/api/pedidos").send(newPedido);

    expect(res.statusCode).toEqual(200);
    expect(PedidoModel.create).toHaveBeenCalledWith({ ...newPedido, orderStatus: "RECEBIDO" });
  });

  test("GET /api/pedidos/:id - deve retornar um pedido pelo ID", async () => {
    const mockPedido = { id: "1", orderStatus: "RECEBIDO" };
    PedidoModel.findById.mockResolvedValue(mockPedido);

    const res = await request(app).get("/api/pedidos/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data", mockPedido);
    expect(PedidoModel.findById).toHaveBeenCalledWith("1");
  });

  test("PUT /api/pedidos/:id - deve atualizar um pedido", async () => {
    const updatedPedido = { orderStatus: "EMPREPARO" };
    const mockUpdatedPedido = { ...updatedPedido, id: "1" };
    PedidoModel.findByIdAndUpdate.mockResolvedValue(mockUpdatedPedido);

    const res = await request(app).put("/api/pedidos/1").send(updatedPedido);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Pedido atualizado com sucesso");
    expect(PedidoModel.findByIdAndUpdate).toHaveBeenCalledWith("1", { orderStatus: "EMPREPARO" });
  });

  test("DELETE /api/pedidos/:id - deve deletar um pedido pelo ID", async () => {
    const mockDeletedPedido = { id: "1" };
    PedidoModel.findByIdAndDelete.mockResolvedValue(mockDeletedPedido);

    const res = await request(app).delete("/api/pedidos/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Pedido deletado com sucesso");
    expect(PedidoModel.findByIdAndDelete).toHaveBeenCalledWith("1");
  });
});
