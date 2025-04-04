<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="login">
    <h2>Se connecter</h2>
    <form @submit.prevent="handleLogin" novalidate>
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
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          :class="{ 'input-error': errors.password }"
          placeholder="Entrez votre mot de passe"
        />
        <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
    <p class="signup-link">
      Pas encore inscrit? <router-link to="/inscription">S'inscrire ici</router-link>.
    </p>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import axios from '/src/api/axiosConfig.js';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errors = ref({
  email: '',
  password: '',
});

const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  errors.value.email = '';
  errors.value.password = '';

  if (!email.value) {
    errors.value.email = 'Veuillez entrer votre email.';
    return;
  }
  if (!password.value) {
    errors.value.password = 'Veuillez entrer votre mot de passe.';
    return;
  }

  try {
    const response = await axios.post('/api/users/login', {email: email.value,password: password.value,}, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.data.success === true) {
      const userData = response.data.user;
      userStore.login(userData);
      router.push('/');
    } else {
      alert(response.data.message || 'Email ou mot de passe incorrect.');
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error.response?.data || error.message);
    errors.value.email = 'Email incorrect';
    errors.value.password = 'Mot de passe incorrect'
  }
};
</script>

<style scoped>
.login {
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

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 2px solid #ccc;
  border-radius: 4px;
}
input:focus,
input:invalid:focus{
  border: 2px solid #461a1a;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}

button {
  margin-top: 10px;
  width: 100%;
}

.signup-link {
  text-align: center;
  margin-top: 15px;
}

.signup-link a {
  color: #d30035;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
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
