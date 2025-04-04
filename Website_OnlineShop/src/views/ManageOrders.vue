<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="orders-container">
    <h2>Gérer les commandes</h2>
    <div v-if="orders.length === 0" class="no-orders">Aucune commande trouvée.</div>
    <ul class="order-list">
      <li v-for="order in orders" :key="order.id" class="order-item">
        <div class="order-info">
          <h3>{{ order.project_name }}</h3>
          <p><strong>Description:</strong> {{ order.project_description }}</p>
          <p><strong>Budget:</strong> {{ order.project_price }}$</p>
          <p><strong>Client:</strong> {{ order.user_name || "Inconnu" }}</p>
        </div>
        <div class="order-actions">
          <template v-if="order.status !== 'Completed'">
            <button class="accept-btn" @click="acceptOrder(order.id)">Compléter</button>
            <button class="reject-btn" @click="rejectOrder(order.id)">Rejeter</button>
          </template>
          <button v-else class="completed-btn" disabled>Complété</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/axiosConfig';

const orders = ref([]);
const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get('/api/orders');
    orders.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des commandes:", error);
  }
};

const acceptOrder = async (orderId) => {
  try {
    await axiosInstance.put(`/api/orders/${orderId}/accept`);
    const order = orders.value.find(o => o.id === orderId);
    if (order) order.status = "Completed";
  } catch (error) {
    console.error("Erreur lors de la complétion de la commande:", error);
  }
};

const rejectOrder = async (orderId) => {
  try {
    await axiosInstance.delete(`/api/orders/${orderId}/reject`);
    fetchOrders();
  } catch (error) {
    console.error("Erreur lors du rejet de la commande:", error);
  }
};

onMounted(fetchOrders);
</script>

<style scoped>
.orders-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.no-orders {
  text-align: center;
  font-weight: bold;
  color: red;
}

.order-list {
  list-style: none;
  padding: 0;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.order-info {
  flex: 1;
}

.order-actions {
  display: flex;
  gap: 10px;
}

.accept-btn {
  background-color: green;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}

.accept-btn:hover {
  background-color: darkgreen;
}

.reject-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}

.reject-btn:hover {
  background-color: darkred;
}

.completed-btn {
  background-color: #ccc;
  color: black;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: not-allowed;
}
</style>
