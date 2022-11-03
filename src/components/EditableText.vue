<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  isEditMode: { type: Boolean, required: false },
});

const emit = defineEmits<{
  (event: 'text:update', newValue: string): void
}>()

const isEditMode = ref(props.isEditMode ?? false);
const edittedText = ref(props.text);

const editButtonClick = () => {
    edittedText.value = props.text;
    isEditMode.value = true;
};

const saveButtonClick = () => {
    isEditMode.value = false;
    emit.call(this, "text:update", edittedText.value);
};

const cancelButtonClick = () => {
    isEditMode.value = false;
};

</script>

<template>
    <div class="result">
        <div class="result__text">
            <div v-if="isEditMode" class="edit-mode">
                <input 
                    v-model="edittedText"
                    v-focus
                    type="search"
                    spellcheck="false"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                />
                <button @click="saveButtonClick">Gem</button>
                <button @click="cancelButtonClick">Annuller</button>
            </div>
            <div v-else class="view-mode">
                <p>{{ props.text }}</p>
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

.view-mode p,
.edit-mode input {
    margin: 0;
    padding: 5px;
    flex-grow: 1;
    border: solid 1px rgb(213, 213, 213);
    font-size: 15px;;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    height: 25px;
}

.edit-mode input {
    height: 35px;
    margin-bottom: 2px;
}

button {
    margin-left: 10px;
    padding: 5px 10px;
}

</style>
  