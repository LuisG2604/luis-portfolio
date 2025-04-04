<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="order-container">
    <h2>Commande #{{ order.id }}</h2>

    <div v-if="!order.id" class="loading">
      <p>Chargement...</p>
    </div>
    <div v-else class="order-details">
      <p><strong>Client:</strong> {{ order.client_name }}</p>
      <p><strong>Description:</strong> {{ order.description }}</p>
      <p><strong>Budget:</strong> {{ order.budget }} €</p>

      <button @click="acceptOrder" class="btn btn-accept">Accepter l'encargo</button>
    </div>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/api/axiosConfig';

const route = useRoute();
const order = ref({});
const message = ref('');

const fetchOrder = async () => {
  try {
    const response = await axiosInstance.get(`/orders/${route.params.id}`);
    order.value = response.data;
  } catch (error) {
    console.error(error);
    message.value = "Erreur lors du chargement de la commande.";
  }
};

const acceptOrder = async () => {
  try {
    await axiosInstance.put(`/orders/${order.value.id}/accept`);
    message.value = "Commande acceptée avec succès.";
  } catch (error) {
    console.error(error);
    message.value = "Erreur lors de l'acceptation de la commande.";
  }
};

onMounted(fetchOrder);
</script>

<style scoped>
.order-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
  background: white;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
}

.loading {
  font-size: 16px;
  font-weight: bold;
  color: gray;
}

.order-details {
  text-align: left;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.btn-accept {
  background-color: #28a745;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}

.message {
  margin-top: 10px;
  font-weight: bold;
  color: green;
}
</style>
  