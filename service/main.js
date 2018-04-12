const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, { path: '/ws', serveClient: false });

io.on('connection', socket => {
    console.log('connection!');
});

const rovers = [
    {name: "spirit"},
    {name: "opportunity"},
]

// Allow cross origin requests
app.get('*', (_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Methods', 'GET')
        .header('Access-Control-Allow-Headers', 'Content-Type');
    next()
});

app.get('/rovers', (_req, res) => res.json(rovers).end());

setTimeout(function emit_rovers() {
    io.emit('/rovers', rovers);
}, 1000);

// all other traffic
app.get('/*', (_req, res) => res.status(404).end());


http.listen(4444, () => console.log('listening on *:4444'));