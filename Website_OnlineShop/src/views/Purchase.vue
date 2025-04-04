<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="purchase-page">
    <div class="payment-section">
      <h2>Méthode de Paiement</h2>
      <form @submit.prevent="handlePurchase">
        <div class="form-group">
          <label for="cardholder">Nom sur la carte</label>
          <input type="text" id="cardholder" v-model="payment.cardholder" />
        </div>
        <div class="form-group">
          <label for="cardNumber" >Numéro de carte</label>
          <input type="text" id="cardNumber" v-model="payment.cardNumber" minlength="16" maxlength="16" />
        </div>
        <div class="form-group">
          <label for="expiryDate">Date d'expiration (MM/YY)</label>
          <input type="text" id="expiryDate" v-model="payment.expiryDate" placeholder="MMYY" minlength="4" maxlength="4"/>
        </div>
        <div class="form-group">
          <label for="cvv">CVV</label>
          <input type="text" id="cvv" v-model="payment.cvv" maxlength="3" />
        </div>
        <div class="button-group">
        <button type="submit" class="btn-primary">Passer la commande</button>
        <router-link to="/projects"><button type="button" class="btn-primary">Annuler</button></router-link>
      </div>
      </form>
    </div>

    <div class="summary-section">
      <div class="project-details">
        <img :src="'http://localhost:4000/data/img/' + project.image" alt="Project Image" />
        <div class="project-info">
        <h2>{{ project.title }}</h2>
        <p>{{ project.description }}</p>
        <p style="font-size: 1.5em; font-weight: bold;">${{ project.price }}</p>
      </div>
      </div>
      <div class="calculations">
        <p>Fees (5%) : ${{ (project.price * 0.05).toFixed(2) }}</p>
        <p>Tax (15%) : ${{ (project.price * 0.15).toFixed(2) }}</p>
        <hr />
        <p style="font-size: 1.5em; font-weight: bold;">Total: ${{ total }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import axios from '/src/api/axiosConfig.js';
import { useUserStore } from '@/stores/userStore';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const project = ref({
title: route.query.title || 'Projet inconnu',
description: route.query.description || '',
price: parseFloat(route.query.price) || 0,
image: route.query.image || ''
});

const payment = ref({
cardholder: 'Client',
cardNumber: '1234123412341234',
expiryDate: '03/27',
cvv: '123'
});

const total = computed(() => {
const fees = project.value.price * 0.05;
const tax = project.value.price * 0.15;
return (project.value.price + fees + tax).toFixed(2);
});

const handlePurchase = async () => {
  try {
    console.log("Envoi des données:", {
      project_name: project.value.title,
      project_description: project.value.description,
      project_price: project.value.price,
      user_id: userStore.user.id,
    });

    const response = await axios.post('/api/purchase', {
      project_name: project.value.title,
      project_description: project.value.description,
      project_price: project.value.price,
      image: project.value.image,
      user_id: userStore.user.id,
    });
    if (response.data.success) {
      router.push({
        path: '/receipt',
        query: {
          title: project.value.title,
          description: project.value.description,
          price: project.value.price,
          total: total.value,
          image: project.value.image,
          cardLast4: payment.value.cardNumber.slice(-4)
        }
      });
    } else {
      alert("Erreur lors de la création de la commande.");
    }
  } catch (error) {
    console.error("Erreur du serveur:", error);
    alert("Erreur du serveur. Veuillez réessayer plus tard.");
  }
};
</script>

<style scoped>
.purchase-page {
display: flex;
flex-direction: row;
gap: 20px;
padding: 20px;
}

.payment-section {
flex: 1;
background: #fff;
padding: 20px;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.summary-section {
flex: 1;
background: #fff;
padding: 20px;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.project-details {
display: flex;
align-items: center;
gap: 20px;
margin-bottom: 20px;
}

.project-details img {
width: 20%;
border-radius: 8px;
}

.project-info {
flex: 1;
}

.project-info h2 {
text-align: left;
margin-bottom: 10px;
font-size: 1.8rem;
}

.project-info p {
font-size: 1rem;
color: #555;
}

.calculations {
margin-top: 20px;
padding-top: 10px;
border-top: 1px solid #ddd;
}

.calculations p {
margin: 5px 0;
}

.form-group {
margin-bottom: 15px;
}

.form-group label {
display: block;
font-weight: bold;
margin-bottom: 5px;
}

.form-group input {
width: 100%;
padding: 10px;
border: 1px solid #ddd;
border-radius: 5px;
}

.terms {
margin: 15px 0;
}

.terms label {
margin-left: 5px;
}

.button-group {
display: flex;
justify-content: flex-start; 
gap: 10px; 
margin-top: 20px;
}
</style>
