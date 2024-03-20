
import express from 'express';
import http from 'http'
import {Server} from "socket.io"
import {state} from "./state/state.js";
import {spawn} from "./functions/spawn.js";
import {updatesState} from "./state/updatesState.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send("123")
});

io.on('connection', (socket) => {

    socket.on("spawn", (data) => {
        const {unit_name} = data;
        spawn(unit_name)
    })

    setInterval(() => {
        socket.emit("state", JSON.stringify(
            state
        ), (response) => {
            console.log(response); // "got it"
        });
        updatesState()
    }, 1000)
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
