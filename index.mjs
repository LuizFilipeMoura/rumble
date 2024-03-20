
import express from 'express';
import http from 'http'
import {Server} from "socket.io"
import {state} from "./state/state.mjs";
import {calculatesPosition} from "./functions/movement.mjs";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send("123")
});

io.on('connection', (socket) => {
    console.log('a user connected');
    let x = 0;
    let y = 0;
    let direction = "right"

    setInterval(() => {
        state.warrior.position = calculatesPosition(state.warrior.position, 50, direction)
        if(state.warrior.position.x > 200){
            direction = "down"
        }
        console.log(state)
        socket.emit("state", JSON.stringify(
            state
        ), (response) => {
            console.log(response); // "got it"
        });
    }, 1000)
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
