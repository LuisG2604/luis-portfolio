<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="order-history">
    <h2>Historique des commandes</h2>

    <div v-if="orders.length === 0" class="empty-message">
      <p>Aucune commande trouvée.</p>
    </div>

    <div class="order-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <img :src="'http://localhost:4000/data/img/' + order.image" :alt="order.project_name" class="order-image" />

        <div class="order-info">
          <h3>{{ order.project_name }}</h3>
          <p>{{ order.project_description }}</p>
          <p class="price"><strong>Prix:</strong> {{ order.project_price }} €</p>
        </div>
        <div class="order-status" :class="getStatusClass(order.status)">
          {{ getStatusText(order.status) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "@/api/axiosConfig";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const orders = ref([]);

const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get(`/api/orders/user/${userStore.user.id}`);
    orders.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des commandes:", error);
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "En attente":
      return "En attente";
    case "Completed":
      return "Complété";
    case "Purchased":
      return "Acheté";
    default:
      return "Inconnu";
  }
};

const getStatusClass = (status) => {
  return {
    "status-pending": status === "En attente",
    "status-completed": status === "Completed",
    "status-purchased": status === "Purchased",
  };
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.order-history {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

h2 {
  text-align: center;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.order-card {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.order-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.order-info {
  flex: 1;
  margin-left: 15px;
}

.price {
  font-weight: bold;
}

.order-status {
  font-weight: bold;
  font-size: 1.2em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 5px;
}

.status-pending {
  color: #ffc107;
}

.status-completed {
  color: #28a745;
}

.status-purchased {
  color: #007bff;
}

.empty-message {
  text-align: center;
  color: #666;
}
</style>
  