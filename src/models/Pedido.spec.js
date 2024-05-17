const mongoose = require("mongoose");
const Pedido = require("../models/Pedido");  // Atualize o caminho conforme necessário

describe("Pedido Model Test", () => {
  // Conectar ao banco de dados de teste antes de rodar qualquer teste
  beforeAll(async () => {
    const url = "mongodb://127.0.0.1/pedido_test_db";
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  // Limpar dados depois de cada teste
  afterEach(async () => {
    await Pedido.deleteMany();
  });

  // Desconectar do banco de dados de teste depois que todos os testes forem executados
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Deve criar e salvar um pedido com sucesso", async () => {
    const pedidoData = {
      id: "1",
      user: {
        id: 1,
        nome: "João",
        cpf: "123.456.789-00",
        email: "joao@example.com"
      },
      total: 100.00,
      orderStatus: "PENDENTE",
      produtos: [
        { nome: "Produto 1", descricao: "Descrição do produto 1", preco: 50.00, categoriaId: 1 },
        { nome: "Produto 2", descricao: "Descrição do produto 2", preco: 50.00, categoriaId: 2 }
      ]
    };

    const validPedido = new Pedido(pedidoData);
    const savedPedido = await validPedido.save();

    // Verifica se o documento foi salvo corretamente
    expect(savedPedido._id).toBeDefined();
    expect(savedPedido.user.nome).toBe(pedidoData.user.nome);
    expect(savedPedido.total).toBe(pedidoData.total);
    expect(savedPedido.produtos.length).toBe(2);
  });

  it("Deve transformar o pedido para JSON corretamente", async () => {
    const pedidoData = {
      id: "1",
      user: {
        id: 1,
        nome: "João",
        cpf: "123.456.789-00",
        email: "joao@example.com"
      },
      total: 100.00,
      orderStatus: "PENDENTE",
      produtos: [
        { nome: "Produto 1", descricao: "Descrição do produto 1", preco: 50.00, categoriaId: 1 },
        { nome: "Produto 2", descricao: "Descrição do produto 2", preco: 50.00, categoriaId: 2 }
      ]
    };

    const validPedido = new Pedido(pedidoData);
    const savedPedido = await validPedido.save();
    const jsonPedido = savedPedido.toJSON();

    // Verifica se a transformação para JSON está correta
    expect(jsonPedido.id).toBeDefined();
    expect(jsonPedido._id).toBeUndefined();
    expect(jsonPedido.produtos[0]._id).toBeUndefined();
    expect(jsonPedido.__v).toBeUndefined();
  });
});