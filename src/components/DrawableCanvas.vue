<script setup lang="ts">
import { ref, onMounted, computed, reactive, inject } from 'vue'
import { uuid } from 'vue-uuid';
import { DrawableCanvasManager, type DrawableCanvasState } from "@/DrawableCanvasManager";
import type { AxiosResponse } from 'axios';

const canvasId = `canvas-${uuid.v1()}`;

const isIpad = (navigator.userAgent.includes("Mac") && "ontouchend" in document);

const properties = defineProps({
    width: { type: Number, default: 700, required: false },
    height: { type: Number, default: 400, required: false },
});

const canvasState: DrawableCanvasState = reactive({
    onlyStylus: isIpad,
    isEraserActivated: false,
});

let canvasManager: DrawableCanvasManager | null = null;

const axios: any = inject("axios");

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
        canvasState.isEraserActivated = false;
    }
}

function changeDrawingMode() {
    canvasState.isEraserActivated = !canvasState.isEraserActivated;
}

const dataUriToBlob = (dataUri: string): Blob => {
    const parts = dataUri.split(",");
    const headerPart = parts[0];
    const bodyPart = parts[1];
    const mimeType = headerPart.split(":")[1].split(";")[0]

    let bodyAsByteString: string;
    if (headerPart.indexOf("base64") >= 0) {
        bodyAsByteString = atob(bodyPart);
    } else {
        bodyAsByteString = decodeURI(bodyPart);
    }

    var bodyByteArray = new Uint8Array(bodyAsByteString.length);
    for (var i = 0; i < bodyAsByteString.length; i++) {
        bodyByteArray[i] = bodyAsByteString.charCodeAt(i);
    }

    return new Blob([bodyByteArray], { type: mimeType })
}

function performInference() {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const dataUri = canvas.toDataURL();
    const imageBlob = dataUriToBlob(dataUri);
    const formData = new FormData()
    formData.append("img", imageBlob);

    axios({
        method: "post",
        url: "/predict",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response: AxiosResponse) => {
        console.log(response.data);
    }).catch((response: AxiosResponse) => {
        console.log(response);
    });
}

const stylusStateButtonText = computed(() => {
    return canvasState.onlyStylus ? "✍️" : "👆";
});

const drawingModeIcon = computed(() => {
    return canvasState.isEraserActivated ? "icon-eraser.png" : "icon-pen.png";
});
</script>

<template>
    <div class="canvas-toolbar">
        <button @click="changeStylusState();">{{ stylusStateButtonText }}</button>
        <button @click="clearCanvas()">Slet alt</button>
        <button @click="changeDrawingMode()">
            <img :src="drawingModeIcon" width="32" height="32" />
        </button>
        <button @click="performInference()">
            Inference
        </button>
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
  