<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  isEditMode: { type: Boolean, required: false },
});

const isEditMode = ref(props.isEditMode ?? false);
const newText = ref(props.text);
const edittedText = ref(props.text);

const editButtonClick = () => {
    edittedText.value = newText.value;
    isEditMode.value = true;
};

const saveButtonClick = () => {
    newText.value = edittedText.value;
    isEditMode.value = false;
};

const cancelButtonClick = () => {
    isEditMode.value = false;
};

</script>

<template>
    <div class="result">
        <div class="result__text">
            <div v-if="isEditMode" class="edit-mode">
                <input type="text" v-model="edittedText" v-focus/>
                <button @click="saveButtonClick">Gem</button>
                <button @click="cancelButtonClick">Annuller</button>
            </div>
            <div v-else class="view-mode">
                <p>{{ newText }}</p>
                <button @click="editButtonClick">Ret</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.view-mode, .edit-mode {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.view-mode p,.edit-mode input {
    margin: 0;
    padding: 5px;
    flex-grow: 1;
    border: solid 1px #efefef;
    font-size: 15px;;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    height: 25px;
}

button {
    margin-left: 10px;
    padding: 5px 10px;
}

</style>
  