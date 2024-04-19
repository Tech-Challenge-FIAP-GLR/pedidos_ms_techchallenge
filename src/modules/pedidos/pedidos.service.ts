/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePedidoDto } from "src/dto/create-pedido.dto";
import { Pedido } from "src/interfaces/pedido.entities";
import { Repository } from "typeorm";

@Injectable()
export class PedidosService {

  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido>{
    return await this.pedidoRepository.save(createPedidoDto as any);
  }
}

