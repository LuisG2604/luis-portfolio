<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="services">
    <div v-if="!userStore.isLoggedIn" class="overlay-panel">
      <div class="overlay-content">
        <h2>Pour utiliser les services, veuillez vous connecter à votre compte.</h2>
        <button @click="goToSignup" class="btn btn-primary">Se connecter</button>
      </div>
    </div>
    <div class="service-list" v-else>
      <RouterLink 
        v-for="service in (isDeveloper ? developerServices : clientServices)" 
        :key="service.id" 
        :to="service.route" 
        class="service-card"
      >
        <img :src="service.image" :alt="service.title" class="service-image" />
        <div class="service-info">
          <h2>{{ service.title }}</h2>
        </div>
      </RouterLink>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import imgProjects from '@/assets/projects.png';
import imgCustom from '@/assets/custom.png';
import imgHistory from '@/assets/history.png';
import imgProfile from '@/assets/profile.png';

const userStore = useUserStore();
const router = useRouter();

const clientServices = ref([
  {
    id: 1,
    title: 'Projets disponibles',
    image: imgProjects,
    route: '/projects',
  },
  {
    id: 2,
    title: 'Commande personnalisée',
    image: imgCustom,
    route: '/custom-order',
  },
  {
    id: 3,
    title: 'Historique des achats',
    image: imgHistory,
    route: '/order-history',
  },
  {
    id: 4,
    title: 'Paramètres du compte',
    image: imgProfile,
    route: '/settings',
  },
]);

const developerServices = ref([
  {
    id: 1,
    title: 'Publier un nouveau projet',
    image: imgProjects,
    route: '/publish',
  },
  {
    id: 2,
    title: 'Gérer les projets',
    image: imgCustom,
    route: '/manage-projects',
  },
  {
    id: 3,
    title: 'Gérer les commandes',
    image: imgHistory,
    route: '/manage-orders',
  },
  {
    id: 4,
    title: 'Paramètres du compte',
    image: imgProfile,
    route: '/settings',
  },
]);

const isDeveloper = computed(() => userStore.user?.email === userStore.developerEmail);

const goToSignup = () => {
  router.push('/login');
};
</script>


<style scoped>
@media screen and (max-width: 768px) {
    .service-card {
        flex-direction: column;
        align-items: center;
    }
    .service-image {
        width: 200px;
        height: 200px;
    }
    .service-info h2 {
        font-size: 1.5rem;
    }

}
.service-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
}

.service-card {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.service-image {
    user-select: none;
    width: 100px;
    height: 100px;
    margin: 10px;
    object-fit: cover;
}

.service-info h2 {
    user-select: none;
    margin: 0;
    font-size: 1.2rem;
}

.overlay-panel {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px;
    min-width: 300px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    z-index: 10;
}

.overlay-content {
    text-align: center;
}

.overlay-content h2 {
    font-size: 1.6rem;
    margin-bottom: 40px;
    color: #333;
}
</style>
