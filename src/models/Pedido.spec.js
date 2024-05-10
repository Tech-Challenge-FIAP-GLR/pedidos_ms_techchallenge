const mongoose = require("mongoose");
const Pedido = require("../models/Pedido");

describe("Pedido Schema", () => {
  it("should have the expected fields", () => {
    const pedido = new Pedido();
    const fields = pedido.schema.obj;
    expect(fields.id).toBeDefined();
    expect(fields.user).toBeDefined();
    expect(fields.total).toBeDefined();
    expect(fields.orderStatus).toBeDefined();
    expect(fields.dataPedido).toBeDefined();
    expect(fields.produtos).toBeDefined();
  });

  it("should have correct field types", () => {
    const pedido = new Pedido();
    const fields = pedido.schema.obj;
    expect(fields.id).toEqual(String);
    expect(fields.user).toEqual({
      id: Number,
      nome: String,
      cpf: String,
      email: String
    });
    expect(fields.total).toEqual(Number);
    expect(fields.orderStatus).toEqual(String);
  });

  it("should have a default value for dataPedido", () => {
    const pedido = new Pedido();
    expect(pedido.dataPedido).toEqual(expect.any(Date));
  });

  it("should transform _id to id and remove __v in toJSON", () => {
    const pedido = new Pedido({
      _id: "new Object(663d692dfa4f3fa359c3a9d0)",
      user: {
        id: 1,
        nome: "John Doe",
        cpf: "123456789",
        email: "john@example.com"
      },
      total: 100,
      orderStatus: "RECEBIDO",
      produtos: []
    });

    const transformedPedido = pedido.toJSON();
    expect(transformedPedido._id).toBeUndefined();
    expect(transformedPedido.__v).toBeUndefined();
  });
});
