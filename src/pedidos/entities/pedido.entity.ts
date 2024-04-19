import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PedidoDocument = Pedido & Document;

@Schema()
export class Pedido {
  @Prop()
  name: string;

  @Prop()
  userId: number;

  @Prop()
  produtosIds: number[];
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
