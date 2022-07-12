//iniciar - npm serve run
const express = require('express');
const engine = require ('ejs-mate');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;

//inicialização
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//setting deredenrização otor

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Router
app.use(require('./routes/'));

//sockets
require('./sockets')(io);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//string do servidor
server.listen(port, () => {
    console.log('Server on port 3000 em http://localhost:3000');
} );
