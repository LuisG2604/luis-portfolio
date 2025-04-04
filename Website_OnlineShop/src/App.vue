<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div id="app">
    <Header />
    <main class="content">
      <router-view />
    </main>
    <Footer />
    <CustomAlert ref="customAlert" />
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import CustomAlert from "./components/CustomAlert.vue";

const customAlert = ref(null);
provide("customAlert", customAlert);
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
