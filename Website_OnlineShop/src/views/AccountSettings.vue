<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="account-settings">
    <h2>Paramètres du Compte</h2>
    <form @submit.prevent="handleSave">
      <div class="form-group">
        <label for="name">Nom</label>
        <input
          type="text"
          id="name"
          v-model="user.name"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          class="form-control"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="birthdate">Date de Naissance</label>
        <input type="date" id="birthdate" v-model="user.birthdate" class="form-control" required />
      </div>

      <div class="form-group">
        <label for="phone">Numéro de Téléphone</label>
        <input type="tel" id="phone" v-model="user.phone" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary">Sauvegarder</button>
      <router-link to="/services">
        <button class="btn btn-secondary">Retour</button>
      </router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import axiosInstance from '@/api/axiosConfig.js';
import { inject } from "vue";

const userStore = useUserStore();
const user = ref({ ...userStore.user });
const customAlert = inject("customAlert");

const handleSave = async () => {
  try {
    const response = await axiosInstance.put(`/api/users/${user.value.id}`, {
      name: user.value.name,
      birthdate: user.value.birthdate,
      phone: user.value.phone,
    });

    if (response.data && response.data.success) {
      userStore.login(user.value);
      customAlert.value.showAlert("Info", "Modifications sauvegardées avec succès !");
    } else {
      console.error("Réponse inattendue:", response.data);
    }
  } catch (error) {
    console.error('Erreur du serveur:', error);
  }
};
</script>

<style scoped>
.account-settings {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
