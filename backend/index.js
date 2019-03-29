var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const setUserOnRoom = require('./service/firebaseService').setUserOnRoom

const PORT = 12345

io.on('connection', function(client){
    client.on('update document', function(document){
        client.broadcast.emit('update document', document);
    });
    client.on('user connect', function(newConnection){
        setUserOnRoom(newConnection.user, newConnection.docId, client.id)

        io.emit('users', newConnection);
    });
    client.on('disconnect', function () {
        console.log('client disconnected');
    });
});

http.listen(PORT, function(){
    console.log(`listening on *:12345`);
});