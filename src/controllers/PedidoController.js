const pedidoService = require("../services/PedidoService");
const http = require('http');

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
    hostname: 'spring-app',
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

    request.on('error', (error) => {
      console.error(error);
    });

    request.write(postData);
    request.end();
  };
  
  makePost();
}