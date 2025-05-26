const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('Usuário conectado');

  ws.on('message', function incoming(message) {
    console.log('Recebido:', message);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Usuário desconectado');
  });
});

server.listen(process.env.PORT || 10000, () => {
  console.log('Servidor WebSocket ativo na porta 10000');
});
