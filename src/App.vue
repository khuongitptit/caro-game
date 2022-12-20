<template>
  <div
    class="w-[100vh] h-screen grid grid-rows-[repeat(30,_1fr)] grid-cols-[repeat(30,_1fr)]"
  >
    <div
      v-for="index in [...Array(900).keys()]"
      :key="index"
      :class="`border-t border-r border-gray-400 box-border flex justify-center items-center text-xl ${
        getCellValue(index) === 'x' ? 'text-red-500' : 'text-blue-500'
      }`"
      @click="handleClick(index)"
    >
      {{ getCellValue(index) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import socketIO from 'socket.io-client';
import { ref } from 'vue';
import './index.css';
const socket = socketIO('http://localhost:4000');
const cellData = ref<string[][]>([]);
const turn = ref();
const currentTurn = ref();
socket.on('assign-turn', (assignedTurn) => {
  turn.value = assignedTurn;
  alert('You are: ' + assignedTurn);
});
socket.on('game-update', (gameUpdate) => {
  currentTurn.value = gameUpdate.turn;
  cellData.value = gameUpdate.gameData;
});
socket.on('game-over', (gameOver) => {
  alert('Winner: ' + gameOver.winner);
});
const handleClick = (index: number) => {
  if (currentTurn.value !== turn.value) return;
  socket.emit('play', getCoordinates(index));
};
const getCellValue = (index: number) => {
  const { row, col } = getCoordinates(index);
  return (cellData.value[row] || [])[col];
};
const getCoordinates = (index: number) => {
  const row = Math.ceil((index + 1) / 30) - 1;
  const col = index % 30;
  return { row, col };
};
</script>
