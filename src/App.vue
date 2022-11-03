<script setup lang="ts">
import { ref, onMounted, computed, reactive, inject } from 'vue'

import DrawingCanvas from "./components/DrawableCanvas.vue";

const children = ref([DrawingCanvas, DrawingCanvas]);

const addNewComponent = () => {
  children.value.push(DrawingCanvas);
}
</script>

<template>
  <h1>Håndskriftsgenkendelse</h1>
  <div>
    <div v-for="component in children" :key="component.name">
        <component :is="component"></component>
    </div>
  </div>
  
  <button @click="addNewComponent()" class="new-line">Tilføj ny linje</button>
</template>

<style scoped>
button.new-line {
  margin-left: 50px;
  padding: 10px;
}
</style>