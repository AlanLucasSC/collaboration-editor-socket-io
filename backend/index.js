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
        //setUserOnRoom(newConnection.user, newConnection.docId, client.id)

        var name = newConnection.user
        var room = newConnection.docId
        var clientId = client.id

        client.join(room);

        io.to(room).emit('new user', {name, room, clientId});

        client.on('disconnect', function () {
            io.to(room).emit('user disconnected', {name, room, clientId});
        });
    });
    client.on('others users on room', function(received){
        var users = received.users
        var toUser = received.toUser

        io.to(toUser).emit('users on room', users)
    })
});

http.listen(PORT, function(){
    console.log(`listening on *:12345`);
});