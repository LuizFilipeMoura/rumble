import express from "express";
import http from "http";
import { Server } from "socket.io";
import { state } from "./state/state.js";
import { spawn } from "./functions/spawn.js";
import { updatesState } from "./state/updatesState.js";
import { Player } from "./models/player.js";
import { Position } from "./models/position.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("123");
});

const player = new Player();
const enemy = new Player();
player.standardDirection = "down";
enemy.standardDirection = "up";

state.players[player.id] = player;

state.players[enemy.id] = enemy;

const playerPosition = new Position(100, 100);
const enemyPosition = new Position(100, 800);

const playerUnit = spawn({
  unitName: "metal_warrior",
  player: player.id,
  spawnPoint: playerPosition
});
const enemyUnit = spawn({
  unitName: "metal_warrior",
  player: enemy.id,
  spawnPoint: enemyPosition
});
enemyUnit.damage = 1;
enemyUnit.attackRadius = 0;
enemyUnit.health = 100;
enemyUnit.position.y = 150;
enemyUnit.position.x = 550;

playerUnit.position.x = 100;
playerUnit.position.y = 100;

io.on("connection", socket => {
  socket.on("spawn", data => {
    const { unit_name, player } = data;
    spawn({ unitName: unit_name, player, spawnPoint: playerPosition });
  });

  setInterval(() => {
    socket.emit("state", JSON.stringify(state), response => {
      console.log(response); // "got it"
    });
    updatesState();
  }, 1000);
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
