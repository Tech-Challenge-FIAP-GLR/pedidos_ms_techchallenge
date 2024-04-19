/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  dataPedido: string;

  @Column()
  total: number;

  @Column()
  orderStatus: number;

}
