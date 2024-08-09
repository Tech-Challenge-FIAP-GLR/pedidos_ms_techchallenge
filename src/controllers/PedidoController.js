const pedidoService = require("../services/PedidoService");
const http = require('http');
const amqp = require('amqplib');

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
        console.log(`objMessage`, objMessage.orderStatus);
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

exports.getAllPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.getAllPedidos();
    res.json({ data: pedidos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPedidosByStatus = async (req, res) => {
  try {
    const pedidos = await pedidoService.getAllPedidosByStatus();
    res.json({ data: pedidos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.createPedido = async (req, res) => {
  try {
    const pedido = await pedidoService.createPedido(req.body);
    const response = {
      pedidoId: pedido._id,
      total: pedido.total,
    }
    postPagamentosMS(response);
     
    res.json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await pedidoService.getPedidoById(req.params.id);
    if(pedido === null) {
      res.json({  message: 'Este Pedido não existe mais ou teve o pagamento recusado'});
    } else {
      res.json({ data: pedido });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidoByStatus = async (req, res) => {
  try {
    const pedido = await pedidoService.getPedidoByStatus(req.params.status);
    res.json({ data: pedido });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updatePedido = async (req, res) => {
  try {
    const atualizaStatus =  {
     orderStatus: req.body.orderStatus.toUpperCase()
    }
    const pedido = await pedidoService.updatePedido(req.params.id, atualizaStatus);
    
    if(atualizaStatus?.orderStatus === 'CANCELADO'){
      return res.json({ message: 'Este teve o pagamento recusado ou cancelado!' });
    } else {
      pedido === null ? res.json({ message: 'Este Pedido não existe mais!' }) : res.json({ message: 'Pedido atualizado com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deletePedido = async (req, res) => {
  try {
    const pedido = await pedidoService.deletePedido(req.params.id);
    if(pedido === null) {
      res.json({  message: 'Pedido já foi deletado'});
    } else {
      res.json({  message: 'Pedido deletado com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function postPagamentosMS(payload){
  
  const postData = JSON.stringify({
    pedidoId: payload.pedidoId,
    total: payload.total,
  });

  console.log('postData', postData)

  const options = {
    hostname: 'spring-app-pagamentos',
    port : 8181,
    path: '/api/pagamentos_ms_techchallenge/pagamentos',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const makePost = () => {
    let data = '';

    const request = http.request(options, (response) => {
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        console.log(data);
      });
    });

    request.write(postData);
    request.end();
  };
  
  makePost();
}

async function atualizaStatusPorMensagem(payload) {
  console.log(payload,'paylaod')
  try {
    const atualizaStatus =  {
     orderStatus: payload.orderStatus.toUpperCase()
    }
    const pedido = await pedidoService.updatePedido(payload.pedidoId, atualizaStatus);
    pedido === null ? res.json({ message: 'Este Pedido não existe mais!' }) : res.json({ message: 'Pedido atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}