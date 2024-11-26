import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { state } from './state/state.js';
import { spawn } from './functions/spawn.js';
import { updatesState } from './state/updatesState.js';
import { Player } from './models/player.js';
import { Position } from './models/position.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.send('123');
});

const player = new Player();
const enemy = new Player();
player.standardDirection = 'down';
enemy.standardDirection = 'up';

state.players[player.id] = player;

state.players[enemy.id] = enemy;

const playerPosition = new Position(100, 100);
const enemyPosition = new Position(100, 400);

const playerUnit = spawn({
  unitName: 'metal_warrior',
  player: player.id,
  spawnPoint: playerPosition,
});
playerUnit.canMove = false;
const enemyUnit = spawn({
  unitName: 'metal_warrior',
  player: enemy.id,
  spawnPoint: enemyPosition,
});

enemyUnit.canAttack = false
let packageCounter = 0;
io.on('connection', (socket) => {
  socket.on('spawn', (data) => {
    const { unit_name, player } = data;
    spawn({ unitName: unit_name, player, spawnPoint: playerPosition });
  });
  socket.emit("player", JSON.stringify({id: player.id}))

  setInterval(() => {
    const fixPosition = packageCounter % 5 === 0
    socket.emit('state', JSON.stringify({ ...state, fixPosition }), (response) => {
      console.log(response); // "got it"
    });
    packageCounter++;
    updatesState();
  }, 200);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
