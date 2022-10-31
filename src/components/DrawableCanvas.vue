<script setup lang="ts">
import { onMounted } from 'vue'
import { uuid } from 'vue-uuid';
import { DrawableCanvasManager } from "@/DrawableCanvasManager";


onMounted(() => {

  let canvas = document.getElementById('mycanvas') as HTMLCanvasElement;
  let dcm = new DrawableCanvasManager(canvas);
  console.log(`Uniuqe ID: ${uuid.v1()}`)
})
</script>
<template>
    <div class="canvas-item">
        <canvas id="mycanvas" width="700" height="420"></canvas>
    </div>
</template>
  
<style scoped>
canvas {
    position: fixed;
    border: solid 1px Red;
}
</style>
  