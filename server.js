const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

const QRCode = require('qrcode');

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public');
// });
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/qr', (req, res) => {
  const mobileUrl = `${req.protocol}://${req.get('host')}/mobile.html`;
  QRCode.toDataURL(mobileUrl, (err, url) => {
    if (err) res.send("Error generating QR code");
    else res.send(`<img src="${url}" alt="QR Code">`);
  });
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('startGame', () => {
      io.emit('gameStarted');
      console.log("Game started");
    })

    // socket.on('chat message', (msg) => {
    //   console.log('message: ' + msg);
    //   io.emit('chat message', msg);
    // });

    socket.on('rotateSword', (data) => {
      io.emit('rotateSword', data)
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});