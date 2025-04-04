<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="manage-container">
    <h2>Gérer les projets</h2>

    <div v-if="projects.length === 0" class="no-projects">Aucun projet trouvé.</div>
    <div class="project-list">
      <div v-for="project in projects" :key="project.id" class="project-card" :class="{ expanded: editingProject === project.id }"
      >
      <img :src="'http://localhost:4000/data/img/' + project.image" :alt="project.title" class="project-image" />
        <div class="project-info">
          <h3 v-if="editingProject !== project.id">{{ project.title }}</h3>
          <input v-else type="text" v-model="editableProject.title" class="edit-input"/>

          <p v-if="editingProject !== project.id">{{ project.description }}</p>
          <textarea v-else v-model="editableProject.description" class="edit-textarea"></textarea>

          <p v-if="editingProject !== project.id"><strong>Prix:</strong> {{ project.price }} €</p>
          <input v-else type="number" v-model="editableProject.price" class="edit-input"/>
          <div class="button-group">
            <button v-if="editingProject !== project.id" @click="startEditing(project)">Modifier</button>
            <button @click="confirmDelete(project.id)" class="delete-btn">Supprimer</button>
          </div>

          <div v-if="editingProject === project.id" class="edit-actions">
            <button @click="cancelEdit">Annuler</button>
            <button @click="saveEdit(project.id)">Sauvegarder</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue';
import axiosInstance from '@/api/axiosConfig';

const customAlert = inject("customAlert");
const projects = ref([]);
const editingProject = ref(null);
const editableProject = ref({ title: '', description: '', price: '' });
const fetchProjects = async () => {
  try {
    const response = await axiosInstance.get('/api/projects');
    projects.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des projets:", error);
  }
};

const startEditing = (project) => {
  editingProject.value = project.id;
  editableProject.value = { ...project };
};

const cancelEdit = () => {
  editingProject.value = null;
};

const saveEdit = async (id) => {
  try {
    await axiosInstance.put(`/api/projects/${id}`, {
      title: editableProject.value.title,
      description: editableProject.value.description,
      price: parseFloat(editableProject.value.price)
    });

    const index = projects.value.findIndex(p => p.id === id);
    projects.value[index] = { ...editableProject.value };

    cancelEdit();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du projet:", error);
  }
};


const confirmDelete = async (id) => {
  const confirmation = await customAlert.value.showConfirm(
      "Confirmation",
      "Voulez-vous supprimer ce projet ?"
    );
    if (confirmation) {
        await axiosInstance.delete(`/api/projects/${id}`);
        projects.value = projects.value.filter(project => project.id !== id);
    }
};

onMounted(() => {
  fetchProjects();
});
</script>

<style scoped>
.manage-container {
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.project-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  width: 280px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  min-height: 350px;
}

.project-card.expanded {
  width: 320px;
  padding: 20px;
}

.project-image {
  display: block;
  margin: 0 auto;
  max-width: 150px;
  border-radius: 8px;
}


.project-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.edit-input, .edit-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.edit-textarea {
  height: 80px;
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: auto;
}

button {
  margin-top: 10px;
  padding: 7px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

button:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #a71d2a;
}

.edit-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

.empty-message {
  text-align: center;
  color: #666;
}
.no-projects {
  text-align: center;
  font-weight: bold;
  color: red;
}
</style>
