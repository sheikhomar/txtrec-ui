<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

import DrawingCanvas from "./components/DrawableCanvas.vue";

const children = ref([DrawingCanvas]);

const addNewComponent = () => {
  children.value.push(DrawingCanvas);
  nextTick(() => {
    window.scrollTo({
      top: document.body.scrollHeight, 
      behavior: "smooth", 
    });
  });
}

</script>

<template>
  <h1>Håndskriftsgenkendelse</h1>
  <p>Vi har bygget et system til at genkende og digitalisere håndskrevne tekster.</p>
  <p>Sådant et system er virkelig smart da det kan anvendes til at effektivere arbejdsgangene i ATP når det kommer til behandling af bl.a. håndskrevne blanketter fra borgere.</p>
  <p>Systemet har dog lidt svært ved at genkende danske tegn. Kan du hjælpe os med at gøre den bedre?</p>
  <p>Sådan bruger du systemet:</p>
  <ul>
    <li>Skriv noget tekst i det hvide felt med pennen.</li>
    <li>Tryk på knappen "Genkend" for at få systemet til at konvertere din tekst.</li>
    <li>Under feltet vil maskinen vise sit bud på hvad du har skrevet.</li>
    <li>Tager maskinen fejl, tryk på knappen "Ret" for at træne den til at blive bedre.</li>
    <li>Du kan tilføje et nyt skrivefelt ved at trykke på knappen "Tilføj ny linje".</li>
  </ul>

  <div class="main-container">
    <div v-for="component in children" :key="component.name">
        <component :is="component"></component>
    </div>
  </div>
  
  <button @click="addNewComponent()" class="new-line">Tilføj ny linje</button>
</template>

<style scoped>
.main-container {
  padding-top: 20px;
}
button.new-line {
  margin-left: 50px;
  padding: 10px;
}
p, li {
  font-size: 1.3em;
}
</style>
