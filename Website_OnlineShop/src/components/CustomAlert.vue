<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div v-if="isVisible" class="overlay">
    <div class="alert-box">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="buttons">
        <button v-if="type === 'confirm'" @click="handleConfirm" class="btn btn-confirm">Accepter</button>
        <button @click="handleCancel" class="btn btn-cancel">
          {{ type === 'confirm' ? "Annuler" : "OK" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isVisible = ref(false);
const title = ref("");
const message = ref("");
const type = ref("alert");
let resolveCallback = null;

const showAlert = (msgTitle, msgContent) => {
  title.value = msgTitle;
  message.value = msgContent;
  type.value = "alert";
  isVisible.value = true;
};

const showConfirm = (msgTitle, msgContent) => {
  title.value = msgTitle;
  message.value = msgContent;
  type.value = "confirm";
  isVisible.value = true;

  return new Promise((resolve) => {
    resolveCallback = resolve;
  });
};

const handleConfirm = () => {
  isVisible.value = false;
  if (resolveCallback) resolveCallback(true);
};

const handleCancel = () => {
  isVisible.value = false;
  if (resolveCallback) resolveCallback(false);
};

defineExpose({ showAlert, showConfirm });
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.alert-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  min-width: 300px;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}
.btn {
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.btn-confirm {
  background-color: #0068d8;
  color: white;
}
.btn-cancel {
  background-color: #dc3545;
  color: white;
}
.btn-confirm:hover{
    background-color: #003c7c;
    color: white;
}
.btn-cancel:hover{
    background-color: #8d1723;
    color: white;
}
.btn-confirm:active{
    background-color: #002853 !important;
    color: white !important;
}
.btn-cancel:active{
    background-color: #550d14 !important;
    color: white !important;
}
</style>
  