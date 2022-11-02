<script setup lang="ts">
import DrawingCanvas from "./components/DrawableCanvas.vue"
</script>

<template>
  <h1>Drawing Canvas</h1>
  <DrawingCanvas :width="700" :height="100"/>
  <DrawingCanvas />
</template>

<style scoped>

</style>