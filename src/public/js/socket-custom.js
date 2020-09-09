var socket = io();

socket.on('connect', function(message) {
    //console.log(message);
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// Escuchar información
socket.on('notifications', function(mensaje) {
    console.log('Servidor:', mensaje);
});