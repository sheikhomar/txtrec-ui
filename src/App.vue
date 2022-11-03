<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

import DrawingCanvas from "./components/DrawableCanvas.vue";

const children = ref([DrawingCanvas, DrawingCanvas]);

const beforeWindowUnload = (e: any) => {
  e = e || window.event;
  const msg = "Er du sikker på at du vil forlade siden? Du mister al dit arbejde.";
  if (e) {
    e.returnValue = msg;
  }
  return msg;
};

const addNewComponent = () => {
  children.value.push(DrawingCanvas);
  nextTick(() => {
    window.scrollTo({
      top: document.body.scrollHeight, 
      behavior: "smooth", 
    });
  });
}

onMounted(() => {
  window.addEventListener("beforeunload", beforeWindowUnload)
});

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
