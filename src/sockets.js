module.exports = io => {
    io.on('connection', (socket) => {
     console.log('New User connected');
     socket.on('userCoordinates', coords => {
        console.log(coords); //Esse aparece os núnumeros das coordenadas de latitude e longitude
        socket.broadcast.emit('newUserCoordinates', coords);//Aqui o servidor envia as coodrenadas aos outros usuários
     })
    });   
}

