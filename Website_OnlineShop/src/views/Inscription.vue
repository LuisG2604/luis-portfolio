<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="inscription">
    <h2>S'inscrire</h2>
    <form @submit.prevent="openVerification" enctype="multipart/form-data" novalidate>
      <div class="form-group">
        <label for="name">Nom</label>
        <input type="text" id="name" v-model="name" :class="{ 'input-error': errors.name }" placeholder="Entrez votre nom" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" :class="{ 'input-error': errors.email }" placeholder="Entrez votre email" />
      </div>
      <div class="form-group">
        <label for="birthdate">Date de naissance</label>
        <input type="date" id="birthdate" v-model="birthdate" :class="{ 'input-error': errors.birthdate }" />
      </div>
      <div class="form-group">
        <label for="gender">Sexe</label>
        <select id="gender" v-model="gender" :class="{ 'input-error': errors.gender }">
          <option value="" disabled>Sélectionnez votre sexe</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
          <option value="other">Autre</option>
        </select>
      </div>
      <div class="form-group">
        <label for="phone">Numéro de téléphone</label>
        <input type="tel" id="phone" v-model="phone" :class="{ 'input-error': errors.phone }" placeholder="Entrez votre numéro de téléphone" />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" :class="{ 'input-error': errors.password }" placeholder="Entrez votre mot de passe" />
      </div>
      <div class="form-group">
        <label for="profilePicture">Photo de profil</label>
        <input type="file" id="profilePicture" @change="handleFileUpload" :class="{ 'input-error': errors.profilePicture }" accept="image/*" />
      </div>
      <button type="submit" class="btn btn-primary">S'inscrire</button>
    </form>

    <Verification v-if="showVerificationModal" :email="email" @close="handleVerificationClose" @verified="registerUser"/>
    <p class="login-link">Déjà inscrit ? <router-link to="/login">Connectez-vous ici</router-link>.</p>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Verification from '@/components/Verification.vue';
import axios from "@/api/axiosConfig";
import { inject } from "vue";

const router = useRouter();
const name = ref('');
const email = ref('');
const birthdate = ref('');
const gender = ref('');
const phone = ref('');
const password = ref('');
const profilePicture = ref(null);
const showVerificationModal = ref(false);
const customAlert = inject("customAlert");

const errors = ref({
  name: '',
  email: '',
  birthdate: '',
  gender: '',
  phone: '',
  password: '',
  profilePicture: '',
});

const handleFileUpload = (event) => {
  profilePicture.value = event.target.files[0];
  errors.value.profilePicture = '';
};

const validateForm = () => {
  errors.value.name = !name.value.trim() ? "Le nom est obligatoire." : '';
  errors.value.email = !email.value.includes('@') ? "L'email est invalide." : '';
  errors.value.birthdate = !birthdate.value ? "La date de naissance est obligatoire." : '';
  errors.value.gender = !gender.value ? "Le sexe est obligatoire." : '';
  errors.value.phone = !phone.value || phone.value.length < 10 ? "Le téléphone est invalide." : '';
  errors.value.password = password.value.length < 6 ? "Le mot de passe doit comporter au moins 6 caractères." : '';

  return Object.values(errors.value).every((error) => !error);
};

const openVerification = () => {
  if (!validateForm()) return;
  showVerificationModal.value = true;
};

const handleVerificationClose = () => {
  showVerificationModal.value = false;
};

const registerUser = async () => {
  showVerificationModal.value = false;

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('email', email.value);
  formData.append('birthdate', birthdate.value);
  formData.append('sexe', gender.value);
  formData.append('phone', phone.value);
  formData.append('password', password.value);
  formData.append('profilePicture', profilePicture.value);

  try {
    const response = await axios.post('/api/users/register', formData);
    customAlert.value.showAlert("Succès", response.data.message);
    router.push('/login');
  } catch (error) {
    console.error(error);
    customAlert.value.showAlert("Error", "Erreur lors de l'inscription.");
  }
};
</script>

<style scoped>
.inscription {
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
select {
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

.login-link {
  text-align: center;
  margin-top: 15px;
}

.login-link a {
  color: #ff004c;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
.input-error {
  border-color: red;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.code-input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
}

.input-error {
  border-color: red;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}

</style>
