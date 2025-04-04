<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="publish-container">
    <h2>Publier un nouveau projet</h2>

    <form @submit.prevent="submitProject" enctype="multipart/form-data">
      <div class="input-group">
        <label for="title">Nom du projet</label>
        <input type="text" id="title" v-model="title" required>
      </div>

      <div class="input-group">
        <label for="category">Catégorie</label>
        <select id="category" v-model="category" required>
          <option value="">Sélectionner une catégorie</option>
          <option value="web">Applications Web</option>
          <option value="mobile">Applications Mobiles</option>
          <option value="design">Design Graphique</option>
        </select>
      </div>

      <div class="input-group">
        <label for="price">Prix</label>
        <input type="number" id="price" v-model="price" step="0.01" required>
      </div>

      <div class="input-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>

      <div class="input-group">
        <label for="image">Image du projet</label>
        <input type="file" id="image" @change="handleFileUpload" accept="image/*" required>
      </div>

      <button type="submit" class="btn btn-primary">Publier</button>
    </form>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axiosInstance from '@/api/axiosConfig';

const title = ref('');
const category = ref('');
const price = ref('');
const description = ref('');
const image = ref(null);
const message = ref('');

const handleFileUpload = (event) => {
  image.value = event.target.files[0];
};

const submitProject = async () => {
  if (!image.value) {
    message.value = "Veuillez choisir une image.";
    return;
  }
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('category', category.value);
  formData.append('price', price.value);
  formData.append('description', description.value);
  formData.append('image', image.value);

  try {
    const response = await axiosInstance.post('/api/projects/projects', formData);
    message.value = response.data.message;

    title.value = '';
    category.value = '';
    price.value = '';
    description.value = '';
    image.value = null;
  } catch (error) {
    console.error(error);
    message.value = "Erreur lors de la publication du projet.";
  }
};
</script>

<style scoped>
.publish-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  height: 100px;
  resize: vertical;
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

.message {
  margin-top: 10px;
  font-weight: bold;
  color: green;
}
</style>
