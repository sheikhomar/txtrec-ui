<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { uuid } from 'vue-uuid';
import { DrawableCanvasManager, type DrawableCanvasState } from "@/DrawableCanvasManager";

const canvasId = `canvas-${uuid.v1()}`;

let dcs: DrawableCanvasState = reactive({
    onlyStylus: true
});

onMounted(() => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  new DrawableCanvasManager(canvas, dcs);
  console.log(`Uniuqe ID: ${uuid.v1()}`)
})

function changeStylusState() {
    dcs.onlyStylus = !dcs.onlyStylus;
}

const stylusStateButtonText = computed(() => {
    return dcs.onlyStylus ? "Stylus-only mode" : "Touch mode";
});
</script>
<template>
    <div class="canvas-toolbar">
        <button @click="changeStylusState();">{{ stylusStateButtonText }}</button>
    </div>
    <div class="canvas-item">
        <canvas :id="canvasId" width="700" height="420"></canvas>
    </div>
    
</template>
  
<style scoped>
canvas {
    border: solid 1px rgb(0, 149, 17);
}
</style>
  