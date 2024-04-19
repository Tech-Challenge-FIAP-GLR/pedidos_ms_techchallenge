import { Module } from "@nestjs/common";
import { PedidosModule } from "./pedidos/pedidos.module";
import { PedidosController } from "./pedidos/pedidos.controller";
import { PedidosService } from "./pedidos/pedidos.service";

@Module({
  imports: [PedidosModule],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class AppModule {}
