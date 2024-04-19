/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Pedido } from 'src/interfaces/pedido.interface';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from 'src/dto/create-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  private pedidos: Pedido[] = [
    { 
      id: 1,
      // user: {
      //     id: 12,
      //     nome: "Gabriel Freitas",
      //     cpf: "777.233.123-19",
      //     email: "gf@gmail.com"
      // },
      dataPedido: "2023-10-30T23:24:25.7370168",
      total: 43.5,
      orderStatus: "RECEIVED" 
    },
  ];

  constructor(private readonly pedidosService: PedidosService) {}

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
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Put()
  atualizePedido() {
    return 'Atualiza o status de um pedido por ID';
  }
}
