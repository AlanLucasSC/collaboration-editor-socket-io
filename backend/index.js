var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = 12345

var rooms = []

io.on('connection', function(client){
    client.on('update document', function(document){
        client.broadcast.emit('update document', document);
    });
    client.on('user connect', function(newConnection){
        if(!rooms[newConnection.docId]){
            rooms[newConnection.docId] = []
        }
        room = rooms[newConnection.docId]
        room[client.id] = newConnection.user
        io.emit('users', room);
    });
    client.on('disconnect', function () {
        console.log('client disconnected');
    });
});

http.listen(PORT, function(){
    console.log(`listening on *:12345`);
});