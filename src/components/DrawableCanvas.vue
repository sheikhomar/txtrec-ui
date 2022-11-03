<script setup lang="ts">
import { ref, onMounted, computed, reactive, inject } from 'vue'
import { uuid } from 'vue-uuid';
import { DrawableCanvasManager, type DrawableCanvasState } from "@/DrawableCanvasManager";
import EditableText from './EditableText.vue';
import type { AxiosResponse } from 'axios';

const canvasId = `canvas-${uuid.v1()}`;

const stylusModeRadioId = canvasId + "-eraser";

const isIpad = (navigator.userAgent.includes("Mac") && "ontouchend" in document);

const isPerformingInference = ref(false);
const resultText = ref("");

const properties = defineProps({
    width: { type: Number, default: 700, required: false },
    height: { type: Number, default: 73, required: false },
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
    var confirmClearCanvas = confirm("Er du sikker på at du vil rydde linjen?");
    if (canvasManager && confirmClearCanvas) {
        canvasManager.clearCanvas();
        canvasState.isEraserActivated = false;
    }
}

function changeDrawingMode() {
    canvasState.isEraserActivated = !canvasState.isEraserActivated;
}

function textUpdated(newValue: string) {
    resultText.value = newValue;
    console.log("New value: " + newValue);
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
    isPerformingInference.value = true;
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const dataUri = canvas.toDataURL();
    const imageBlob = dataUriToBlob(dataUri);
    const formData = new FormData()
    formData.append("img", imageBlob);

    const url = (process.env.NODE_ENV === "production") ? 
        "https://inference.text-recognizer.devaks.cloudatp.dk/" :
        "/predict";
    console.log(`URL: ${url}`);
    axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response: AxiosResponse) => {
        console.log(response.data);
        resultText.value = response.data.text;
    }).catch((response: AxiosResponse) => {
        console.log(response);
        
    }).finally(() => {
        isPerformingInference.value = false;
    });
}

const stylusStateButtonText = computed(() => {
    return canvasState.onlyStylus ? "✍️" : "👆";
});

const drawingModeIcon = computed(() => {
    return canvasState.isEraserActivated ? "icon-eraser.png" : "icon-pen.png";
});

const drawingModeText = computed(() => {
    return canvasState.isEraserActivated ? "✏ Slet" : "✏️ Skriv";
});

const inferenceButtonText = computed(() => {
    return isPerformingInference.value ? "⌛ Genkender..." : "Genkend";
});

</script>

<template>
    <div class="drawable-canvas">
        <div class="left-bar">
            <button @click="changeDrawingMode()">
                <img :src="drawingModeIcon" width="32" height="32" />
            </button>
            <button @click="changeStylusState();" class="stylus-state">
                {{ stylusStateButtonText }}
            </button>
        </div>

        <div class="canvas-box">
            <div class="toolbar"> 
                <label><input type="radio" v-model="canvasState.isEraserActivated" :value="false" :name="stylusModeRadioId" />Skriv</label>
                <label><input type="radio" v-model="canvasState.isEraserActivated" :value="true" :name="stylusModeRadioId" />Viske</label>
                <button @click="clearCanvas()">Ryd linje</button>
                <button @click="performInference()" :disabled="isPerformingInference">
                    {{ inferenceButtonText }}
                </button>
            </div>
            <canvas :id="canvasId" :width="width" :height="height"></canvas>
            <div class="result">
                <EditableText :text="resultText" @text:update="textUpdated" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.drawable-canvas {
    padding-bottom: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
.left-bar {
    padding-top: 30px;
    width: 40px;;
}
.left-bar button {
    background-color: #F3F3F3;
    width: 35px;
    height: 35px;
    padding: 0;
    margin: 0;
    font-size: 17px;
    border: solid 1px #808080;
    border-radius: 2px;
}
.canvas-box .toolbar {
    height: 30px;
}
.canvas-box .toolbar button {
    margin-left: 10px;
    border: solid 1px #808080;
    border-radius: 2px;
    background-color: #F3F3F3;
}
canvas {
    border: solid 1px rgb(131, 131, 131);
}
.toolbar label {
    margin-right: 7px;
}
</style>
  