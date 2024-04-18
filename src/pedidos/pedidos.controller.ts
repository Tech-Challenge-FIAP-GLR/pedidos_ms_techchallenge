import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('pedidos')
export class PedidosController {
  private pedidos = [
    { id: 1, nome: 'Produto 1', preco: 10.99 },
    { id: 2, nome: 'Produto 2', preco: 5.99 },
    { id: 3, nome: 'Produto 3', preco: 7.5 },
    // Adicione mais produtos conforme necessário
  ];

  @Get()
  getAllPedidos() {
    return this.pedidos;
  }

  @Get()
  gePedidosByStatus() {
    return 'Lista de pedidos por status';
  }

  @Get()
  geStatusPaymentPedidoById() {
    return 'Status de pagamento de pedido por ID';
  }

  @Post()
  createPedido() {
    return 'Cria um novo pedido';
  }

  @Put()
  atualizePedido() {
    return 'Atualiza o status de um pedido por ID';
  }
}
