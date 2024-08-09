const PedidoModel = require("../models/Pedido");
const amqp = require('amqplib');
 // recebido cancelado pago aguardandoPreparo emPreparo pronto

 async function consume() {
  try {
    // Conectar ao servidor RabbitMQ com usuário e senha
    const connection = await amqp.connect({
      protocol: 'amqp',
      hostname: 'rabbitmq',
      port: 5672,
      username: 'guest',
      password: 'guest',
      vhost: '/'
    });

    // Criar um canal
    const channel = await connection.createChannel();

    // Nome da fila que você quer consumir
    const queuePedidosFinalizado = 'producao_ms_pedido_finalizado';
    const queuePagamentosFail = 'pagamentos_ms_payment_fail';
    const queuePagamentosSuccess = 'pagamentos_ms_pedido_success';

    // Assegurar que a fila existe
    await channel.assertQueue(queuePedidosFinalizado, {
      durable: true
    });

    await channel.assertQueue(queuePagamentosFail, {
      durable: true
    });

    await channel.assertQueue(queuePagamentosSuccess, {
      durable: true
    });

    console.log(`[*] Esperando por mensagens na fila: ${queuePedidosFinalizado}. Para sair, pressione CTRL+C`);
    
    // Configurar o consumidor
    channel.consume(queuePedidosFinalizado, (msg) => {
      console.log(`[x] Recebido pedido finalizado: ${msg.content.toString()}`);
      let objMessage = JSON.parse(msg.content);
      // let objMessage = msg.content.toString();
      if (msg !== null) {
        if(objMessage.orderStatus === 'FINALIZADO') {
          console.log(`mensagem`, objMessage);
          atualizaStatusPorMensagem(objMessage);
        }
        channel.ack(msg);
      }
    }, {
      noAck: false
    });

    channel.consume(queuePagamentosFail, (msg) => {
      console.log(`[x] Recebido pagamento falho: ${msg.content.toString()}`);
      if (msg !== null) {
        let objMessage = JSON.parse(msg.content);
        console.log(`objMessage`, objMessage.orderStatus);
        if(objMessage.orderStatus === 'CANCELADO') {
          atualizaStatusPorMensagem(objMessage);
        }
        channel.ack(msg);
      }
    }, {
      noAck: false
    });

    channel.consume(queuePagamentosSuccess, (msg) => {
      console.log(`[x] Recebido pagamento sucesso: ${msg.content.toString()}`);
      if (msg !== null) {
        let objMessage = JSON.parse(msg.content);
        console.log(`objMessage`, objMessage.orderStatus);
        if(objMessage.orderStatus === 'PAGO') {
          atualizaStatusPorMensagem(objMessage);
        }
        channel.ack(msg);
      }
    }, {
      noAck: false
    });

  } catch (error) {
    console.error('Erro ao consumir a fila:', error);
  }
}

consume();

async function atualizaStatusPorMensagem(payload) {
   const status = payload.orderStatus.toUpperCase()
  if(status === 'CANCELADO'){
    return await PedidoModel.findByIdAndDelete(payload.pedidoId);
  } else {
    return await PedidoModel.findByIdAndUpdate(payload.pedidoId, payload);
  }
}

exports.getAllPedidos = async () => {
  return await PedidoModel.find();
};

exports.getAllPedidosByStatus = async () => {
  let pedidos =  await PedidoModel.find();
  pedidos.sort((a,b) => (a.orderStatus > b.orderStatus) ? 1 : ((b.orderStatus > a.orderStatus) ? -1 : 0))
  return pedidos
};
 
exports.createPedido = async (pedido) => {
  pedido.orderStatus = "RECEBIDO"
 return await PedidoModel.create(pedido); 
};

exports.getPedidoById = async (id) => {
  return await PedidoModel.findById(id);
};

exports.getPedidoByStatus = async (status) => {
  const statusUpperCase = status.toUpperCase()
  return await PedidoModel.find({orderStatus: statusUpperCase})
};
 
exports.updatePedido = async (id, pedido) => {
  const status = pedido.orderStatus.toUpperCase()
  if(status === 'CANCELADO'){
    return await PedidoModel.findByIdAndDelete(id);
  } else {
    return await PedidoModel.findByIdAndUpdate(id, pedido);
  }
};
 
exports.deletePedido = async (id) => {
  return await PedidoModel.findByIdAndDelete(id);
};