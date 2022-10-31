<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { uuid } from 'vue-uuid';
import { DrawableCanvasManager } from "@/DrawableCanvasManager";

const canvasId = `canvas-${uuid.v1()}`;

onMounted(() => {

  let canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  let dcm = new DrawableCanvasManager(canvas, false);
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
    border: solid 1px Red;
}
</style>
  