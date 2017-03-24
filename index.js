var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var id_socket = new Array();
var elementos = new Array();

app.get('/', function(req, res){
  console.log('********************* 1');
  res.sendFile(__dirname + '/index.html');
});
app.get('/tabla/', function(req, res){
  console.log('********************* 2');
  res.sendFile(__dirname + '/receptor.html');
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('identificarme', function(data){
    console.log("Soy el socket  ",socket.id);
    id_socket.push(socket.id);
    io.to(socket.id).emit('respuesta_identificacion', elementos);
  });

  socket.on('agregar', function(data){
    console.log("en agregar ",data, elementos.length);
    elementos.push(data);
    console.log("elemenbtos en los socket ",elementos.length);
    for(var i=0;i <id_socket.length; i++){
      console.log(id_socket[i]);
      io.to(id_socket[i]).emit('__agregar', [data]);
    }
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
