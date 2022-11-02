<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { uuid } from 'vue-uuid';
import { DrawableCanvasManager, type DrawableCanvasState } from "@/DrawableCanvasManager";

const canvasId = `canvas-${uuid.v1()}`;

const isIpad = (navigator.userAgent.includes("Mac") && "ontouchend" in document);

const properties = defineProps({
    width: { type: Number, default: 700, required: false },
    height: { type: Number, default: 400, required: false },
});

const canvasState: DrawableCanvasState = reactive({
    onlyStylus: isIpad
});

let canvasManager: DrawableCanvasManager | null = null;

onMounted(() => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  canvasManager = new DrawableCanvasManager(canvas, canvasState);
})

function changeStylusState() {
    canvasState.onlyStylus = !canvasState.onlyStylus;
}

function clearCanvas() {
    var confirmClearCanvas = confirm("Er du sikker på at du vil slette alt?");
    if (canvasManager && confirmClearCanvas) {
        canvasManager.clearCanvas();
    }
}

const stylusStateButtonText = computed(() => {
    return canvasState.onlyStylus ? "✍️" : "👆";
});
</script>

<template>
    <div class="canvas-toolbar">
        <button @click="changeStylusState();">{{ stylusStateButtonText }}</button>
        <button @click="clearCanvas()">Slet alt</button>
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
  