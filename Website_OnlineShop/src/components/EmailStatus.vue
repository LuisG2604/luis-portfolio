<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="overlay" v-if="show">
    <div class="email-status">
      <div v-if="sending">
        <div class="loader"></div>
        <p>Envoi de l'email...</p>
      </div>
      <div v-else>
        <div class="success-icon">✔️</div>
        <p>Envoyé avec succès !</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  show: Boolean,
  sending: Boolean,
});

const router = useRouter();

watch(() => props.sending, (newValue) => {
  if (!newValue) {
    setTimeout(() => {
      router.push("/services");
    }, 2000);
  }
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.email-status {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
}

.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: auto;
}

.success-icon {
  font-size: 2rem;
  color: green;
  margin-bottom: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
  