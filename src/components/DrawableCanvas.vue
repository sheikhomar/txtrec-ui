<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { uuid } from 'vue-uuid';
import { DrawableCanvasManager, type DrawableCanvasState } from "@/DrawableCanvasManager";

const canvasId = `canvas-${uuid.v1()}`;

const properties = defineProps({
    width: { type: Number, default: 700, required: false },
    height: { type: Number, default: 400, required: false },
});

const canvasState: DrawableCanvasState = reactive({
    onlyStylus: false
});

onMounted(() => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  new DrawableCanvasManager(canvas, canvasState);
})

function changeStylusState() {
    canvasState.onlyStylus = !canvasState.onlyStylus;
}

const stylusStateButtonText = computed(() => {
    return canvasState.onlyStylus ? "Stylus-only mode" : "Touch mode";
});
</script>
<template>
    <div class="canvas-toolbar">
        <button @click="changeStylusState();">{{ stylusStateButtonText }}</button>
    </div>
    <div class="canvas-item">
        <canvas :id="canvasId" :width="width" :height="height"></canvas>
    </div>
</template>
  
<style scoped>
canvas {
    border: solid 1px rgb(0, 149, 17);
}
</style>
  