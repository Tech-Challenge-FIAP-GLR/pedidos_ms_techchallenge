/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pedido, PedidoDocument } from './entities/pedido.entity';
import { Model } from 'mongoose';

@Injectable()
export class PedidosService {

  constructor(@InjectModel(Pedido.name) private pedidoModel: Model<PedidoDocument>) {

  }

  create(createPedidoDto: CreatePedidoDto) {
    const pedido = new this.pedidoModel(createPedidoDto)
    return pedido.save();
  }

  findAll() {
    return this.pedidoModel.find();
  }

  findOne(id: number) {
    return this.pedidoModel.findById(id);
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoModel.findByIdAndUpdate(
      {
        _id: id
      },
      {
        $set: updatePedidoDto
      },
      {
        new: true
      }
    )
    .exec();
  }

  remove(id: number) {
    return this.pedidoModel.deleteOne({ _id: id }).exec();
  }
}
