<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="contact">
    <h2>Contactez-nous</h2>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="form-group">
        <label for="name">Nom</label>
        <input
          type="text"
          id="name"
          v-model="name"
          class="form-control"
          :class="{ 'input-error': errors.name }"
          placeholder="Entrez votre nom"
        />
        <p v-if="errors.name" class="error-message">{{ errors.name }}</p>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          :class="{ 'input-error': errors.email }"
          placeholder="Entrez votre email"
        />
        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="message"
          class="form-control"
          :class="{ 'input-error': errors.message }"
          placeholder="Entrez votre message"
          rows="4"
        ></textarea>
        <p v-if="errors.message" class="error-message">{{ errors.message }}</p>
      </div>
      <div class="submitContainer">
        <button type="submit" class="btn btn-primary">Envoyer</button>
      </div>
    </form>
  </div>
</template>
  
<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from "@/api/axiosConfig";

const router = useRouter();
const customAlert = inject("customAlert");

const name = ref('');
const email = ref('');
const message = ref('');

const errors = ref({
  name: '',
  email: '',
  message: '',
});

const handleSubmit = async () => {
  errors.value.name = '';
  errors.value.email = '';
  errors.value.message = '';

  let valid = true;

  if (!name.value.trim()) {
    errors.value.name = 'Veuillez entrer votre nom.';
    valid = false;
  }

  if (!email.value.trim()) {
    errors.value.email = 'Veuillez entrer votre email.';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Veuillez entrer un email valide.';
    valid = false;
  }

  if (!message.value.trim()) {
    errors.value.message = 'Veuillez entrer votre message.';
    valid = false;
  } else if (message.value.trim().length < 10) {
    errors.value.message = 'Votre message doit contenir au moins 10 caractères.';
    valid = false;
  }

  if (valid) {
    const confirmation = await customAlert.value.showConfirm(
      "Confirmation",
      "Voulez-vous envoyer ce message ?"
    );

    if (confirmation) {
      try {
        const response = await axiosInstance.post('/api/contact', {
          name: name.value,
          email: email.value,
          message: message.value,
        });

        if (response.data.success) {
          customAlert.value.showAlert("Envoyé", "Message envoyé avec succès !");
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          customAlert.value.showAlert("Erreur", "Impossible d'enregistrer le message.");
        }
      } catch (error) {
        console.error("Erreur serveur:", error);
        customAlert.value.showAlert("Erreur", "Erreur serveur. Veuillez réessayer plus tard.");
      }
    }
  }
};

</script>

<style scoped>
.contact {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}
.form-group {
  margin-bottom: 15px;
}
label {
  font-weight: bold;
}
input,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 2px solid #ccc;
  border-radius: 4px;
}
input:focus,
input:invalid:focus,
textarea:focus,
textarea:invalid:focus{
  border: 2px solid #461a1a;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}
textarea{
    height: 100px;
}
.submitContainer{
  display: flex;
  justify-content: center;
}
button{
  width: 250px;
}
button:active {
  transform: scale(0.98);
}
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}
.input-error {
  border-color: red;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}
</style>
