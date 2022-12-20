const express = require('express');
const app = express();
const PORT = 4000;
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080',
  },
});

let sockets = {
  o: null,
  x: null,
};
let gameData = [[]];
let turn = 'o';

const updateGame = (socketIO) => {
  socketIO.emit('game-update', {
    turn,
    gameData,
  });
};

const handlePlay = ({ row, col }, socketIO) => {
  gameData[row] = gameData[row] || [];
  if (gameData[row][col]) return;
  gameData[row][col] = turn;
  turn = turn === 'o' ? 'x' : 'o';
  updateGame(socketIO);
  setTimeout(() => {
    handleGameOver(socketIO);
  }, 500);
};

const resetGame = (socketIO) => {
  turn = 'o';
  gameData = [[]];
  updateGame(socketIO);
};

const handleGameOver = (socketIO) => {
  const winner = checkGameOver();
  if (winner) {
    socketIO.emit('game-over', {
      winner,
    });
    resetGame(socketIO);
  }
};

const checkGameOver = () => {
  let winner;
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 30; j++) {
      let firstCheck = (gameData[i] || [])[j];
      if (firstCheck) {
        let checkCol = 0;
        let checkRow = 0;
        let checkFirstDiag = 0;
        let checkSecondDiag = 0;
        let _j1 = j;
        let _j2 = j;
        for (let m = i; m < i + 5; m++) {
          if ((gameData[m] || [])[j] === firstCheck) {
            checkCol++;
          }
          if ((gameData[m] || [])[_j1] === firstCheck) {
            checkFirstDiag++;
            _j1++;
          }
          if ((gameData[m] || [])[_j2] === firstCheck) {
            checkSecondDiag++;
            _j2--;
          }
        }
        for (let n = j; n < j + 5; n++) {
          if ((gameData[i] || [])[n] === firstCheck) {
            checkRow++;
          }
        }
        if (
          checkCol === 5 ||
          checkRow === 5 ||
          checkFirstDiag === 5 ||
          checkSecondDiag === 5
        ) {
          winner = firstCheck;
          break;
        }
      }
    }
  }
  return winner;
};
socketIO.on('connection', (socket) => {
  let socketTurn;
  if (!sockets.o) {
    socketTurn = 'o';
  } else if (!sockets.x) {
    socketTurn = 'x';
  }
  socketIO.to(socket.id).emit('assign-turn', socketTurn);
  sockets[socketTurn] = socket;
  socket.on('disconnect', () => {
    sockets[socketTurn] = null;
  });
  if (sockets.o && sockets.x) {
    resetGame(socketIO);
  }
  socket.on('play', ({ row, col }) => {
    if (socketTurn !== turn) return;
    handlePlay({ row, col }, socketIO);
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
