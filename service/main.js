const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, { path: '/ws', serveClient: false });

io.on('connection', socket => {
    console.log('connection!');
});

const rovers = [
    {name: "spirit", state: 'offline'},
    {name: "opportunity", state: 'offline'},
    {name: "curiosity", state: 'offline'},
]

const states = Object.freeze([
    'offline',
    'thinking',
    'sleeping',
    'moving',
    'waiting',
    'drilling',
]);

// Allow cross origin requests
app.get('*', (_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Methods', 'GET')
        .header('Access-Control-Allow-Headers', 'Content-Type');
    next()
});

app.get('/rovers', (_req, res) => res.json(rovers).end());

setInterval(function emit_rovers() {
    io.emit('/rovers', rovers);
}, 1000);

// all other traffic
app.get('/*', (_req, res) => res.status(404).end());

// randomize state
setInterval(function randomize_state() {
    const currentStateIndex = () => Math.round(Math.random() * (states.length-2)) + 1;

    const opportunity = rovers.find(v => v.name === 'opportunity')
    opportunity.state = states[currentStateIndex()];

    const curiosity = rovers.find(v => v.name === 'curiosity')
    curiosity.state = states[currentStateIndex()];
}, 1000);


http.listen(4444, () => console.log('listening on *:4444'));