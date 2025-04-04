<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="search-projects">
    <aside class="filters">
      <h3>Filtres</h3>
      <div class="filter-group">
        <label for="category">Catégorie</label>
        <select id="category" v-model="filters.category">
          <option value="">Toutes</option>
          <option value="web">Applications Web</option>
          <option value="mobile">Applications Mobiles</option>
          <option value="design">Design Graphique</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="price">Prix maximum</label>
        <div class="price-input">
          <input type="number" id="price" v-model="filters.maxPrice" placeholder="0" step="100" min="0" />
        </div>
      </div>
    </aside>

    <main class="content">
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Rechercher un projet..." class="search-input" />
      </div>

      <div v-if="filteredProjects.length === 0">
        <p class="no-projects">Aucun projet trouvé.</p>
      </div>

      <div class="project-grid">
        <div class="project-card" v-for="project in filteredProjects" :key="project.id">
          <div class="project-image">
            <img :src="'http://localhost:4000/data/img/' + project.image" alt="Project Image" />
          </div>
          <div class="project-info">
            <h4>{{ project.title }}</h4>
            <p>{{ project.description }}</p>
            <p class="price">${{ project.price }}</p>
            <button class="btn btn-primary" @click="showProjectDetails(project), selectedProject = project">Voir les détails</button>
          </div>
        </div>
      </div>
    </main>
  </div>

  <div v-if="showDetails" class="overlay" @click.self="closeProjectDetails">
    <ProjectDetails :project="selectedProject" @close="closeProjectDetails" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axiosInstance from '@/api/axiosConfig';
import ProjectDetails from './ProjectDetails.vue';

const projects = ref([]);
const filters = ref({
  category: '',
  maxPrice: null,
});
const searchQuery = ref('');
const selectedProject = ref(null);
const showDetails = ref(false);

const fetchProjects = async () => {
  try {
    const response = await axiosInstance.get('/api/projects');
    projects.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
  }
};

const filteredProjects = computed(() => {
  return projects.value.filter((project) => {
    const matchesCategory = !filters.value.category || project.category === filters.value.category;
    const matchesPrice = !filters.value.maxPrice || project.price <= filters.value.maxPrice;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });
});

const showProjectDetails = (project) => {
  selectedProject.value = project;
  showDetails.value = true;
};

const closeProjectDetails = () => {
  selectedProject.value = null;
  showDetails.value = false;
};

onMounted(fetchProjects);
</script>

<style scoped>
.search-projects {
  display: flex;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  min-height: 70vh;
}

.filters {
  width: 250px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  border: 2px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.filters h3 {
  margin-bottom: 20px;
}

.filter-group {
  margin-bottom: 15px;
}

.filter-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.filter-group select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 2px solid #ccc;
  border-radius: 10px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border-radius: 15px;
  border: 2px solid #ccc;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.project-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  border-radius: 8px;
  background-color: #fff;
  border: 2px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.project-image img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.project-info {
  margin-left: 30px;
  flex: 1;
}

.project-info button {
  margin-left: 300px;
}

.project-card h4 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.project-card p {
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.price-input {
  position: relative;
}

.price-input input {
  width: 100%;
  padding-left: 20px !important;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 8px;
}

.price-input::before {
  content: '$';
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #8b8b8b;
  font-weight: bold;
  pointer-events: none;
}

.project-image img {
  width: 100%;
  height: auto;
  max-height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.price {
  font-size: 1.8em !important;
  font-weight: bold;
  color: #505050;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
