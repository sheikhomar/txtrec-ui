<script setup lang="ts">
import VueDrawingCanvas from "vue-drawing-canvas";
</script>

<template>
  <h1>Drawing Canvas</h1>
  <vue-drawing-canvas
    ref="VueCanvasDrawing"
    :width="600"
    :height="400"
    background-color="#efefef"
    stroke-type="dash"
    line-cap="round"
    line-join="round"
    :lineWidth="3"
  />
</template>

<style scoped>

</style>