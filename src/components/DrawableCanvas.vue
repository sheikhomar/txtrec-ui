<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { uuid } from 'vue-uuid';
import { DrawableCanvasManager } from "@/DrawableCanvasManager";

const canvasId = `canvas-${uuid.v1()}`;

onMounted(() => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const dcm = new DrawableCanvasManager(canvas);
  console.log(`Uniuqe ID: ${uuid.v1()}`)
})
</script>
<template>
    <div class="canvas-item">
        <canvas :id="canvasId" width="700" height="420"></canvas>
    </div>
</template>
  
<style scoped>
canvas {
    border: solid 1px rgb(74, 0, 223);
}
</style>
  