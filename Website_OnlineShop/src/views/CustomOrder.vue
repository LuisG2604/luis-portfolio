<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="order-container">
    <h2>Passer une commande personnalisée</h2>

    <form @submit.prevent="submitOrder">
      <div class="input-group">
        <label for="title">Nom du projet</label>
        <input type="text" id="title" v-model="title" required>
      </div>

      <div class="input-group">
        <label for="price">Prix</label>
        <input type="number" id="price" v-model="price" step="0.01" required>
      </div>

      <div class="input-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>

      <div class="button-group">
        <button type="submit" class="btn btn-primary">Envoyer</button>
        <button type="button" class="btn btn-secondary" @click="cancelOrder">Annuler</button>
      </div>
    </form>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axiosInstance from '@/api/axiosConfig';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const title = ref('');
const price = ref('');
const description = ref('');
const message = ref('');

const submitOrder = async () => {
  if (!userStore.isLoggedIn) {
    message.value = "Veuillez vous connecter pour passer une commande.";
    return;
  }

  try {
    const orderData = {
      project_name: title.value,
      project_description: description.value,
      project_price: parseFloat(price.value),
      user_id: userStore.user.id
    };

    const response = await axiosInstance.post('/api/orders', orderData);
    message.value = response.data.message;

    title.value = '';
    price.value = '';
    description.value = '';
  } catch (error) {
    console.error(error);
    message.value = "Erreur lors de l'envoi de la commande.";
  }
};

const cancelOrder = () => {
  router.push('/services');
};
</script>

<style scoped>
.order-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

h2 {
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  height: 100px;
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #ccc;
  color: black;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #aaa;
}

.message {
  margin-top: 10px;
  font-weight: bold;
  color: green;
}
</style>
  