<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="receipt-container">
    <h2>Reçu de Commande</h2>

    <div class="receipt-details">
      <img :src="'http://localhost:4000/data/img/' + receipt.image" alt="Project Image" class="project-image" />

      <div class="info">
        <h3>{{ receipt.title }}</h3>
        <p>{{ receipt.description }}</p>
        <p><strong>Prix du projet :</strong> ${{ receipt.price }}</p>
        <p><strong>Frais (5%) :</strong> ${{ (receipt.price * 0.05).toFixed(2) }}</p>
        <p><strong>Taxes (15%) :</strong> ${{ (receipt.price * 0.15).toFixed(2) }}</p>
        <hr />
        <p class="total-price"><strong>Total payé :</strong> ${{ receipt.total }}</p>
      </div>
    </div>

    <div class="payment-info">
      <p><strong>Mode de paiement :</strong> Carte de crédit</p>
      <p><strong>Numéro de carte :</strong> **** **** **** {{ receipt.cardLast4 }}</p>
    </div>

    <div class="button-group">
      <router-link to="/order-history">
        <button class="btn btn-secondary">Historique</button>
      </router-link>
      <button class="btn btn-primary" @click="sendEmailReceipt">Envoyer par email</button>
      <EmailStatus :show="showStatus" :sending="isSending" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import axiosInstance from "@/api/axiosConfig";
import { useUserStore } from "@/stores/userStore";
import EmailStatus from "../components/EmailStatus.vue";

const userStore = useUserStore();
const route = useRoute();

const receipt = ref({
  title: route.query.title || "Projet inconnu",
  description: route.query.description || "",
  price: parseFloat(route.query.price) || 0,
  total: parseFloat(route.query.total) || 0,
  image: route.query.image || "",
  cardLast4: route.query.cardLast4 || "0000",
});

const isSending = ref(false);
const showStatus = ref(false);

const sendEmailReceipt = async () => {
  isSending.value = true;
  showStatus.value = true;

  try {
    const response = await axiosInstance.post("/api/send-receipt", {
      email: userStore.user.email,
      title: receipt.value.title,
      description: receipt.value.description,
      price: receipt.value.price,
      total: receipt.value.total,
      image: receipt.value.image,
      cardLast4: receipt.value.cardLast4,
    });

    if (response.data.success) {
      isSending.value = false;
    } else {
      alert("Erreur lors de l'envoi du reçu.");
      isSending.value = false;
      showStatus.value = false;
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    alert("Erreur du serveur. Veuillez réessayer plus tard.");
    isSending.value = false;
    showStatus.value = false;
  }
};
</script>
<style scoped>
.receipt-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.receipt-details {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.project-image {
  width: 100px;
  border-radius: 8px;
}

.info {
  text-align: left;
}

.total-price {
  font-size: 1.2em;
  color: #28a745;
}

.payment-info {
  margin-top: 20px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #565e64;
}
</style>
