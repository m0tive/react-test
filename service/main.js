const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, { path: '/api', serveClient: false });

app.get('/*', (_req, res) => res.status(404).end());

io.on('connection', socket => {
    console.log('connection!');
});

http.listen(4444, () => console.log('listening on *:4444'));