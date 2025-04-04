<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="home">
    <div class="home-panel">
      <h2>Bienvenue sur notre site</h2>
      <p>Découvrez nos services et contactez-nous pour toute question.</p>
      <router-link to="/services" class="btn btn-primary">Voir nos services</router-link>
    </div>
    <div class="features">
      <div class="feature-card" v-for="feature in features" :key="feature.id">
        <img :src="feature.icon" :alt="feature.title" class="feature-icon" />
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
    <div class="testimonials">
      <h1>Ce que disent nos clients</h1>
      <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial.id">
        <p>{{ testimonial.message }}</p>
        <h4>- {{ testimonial.author }}</h4>
      </div>
    </div>
    <div class="cta-panel">
      <h2>Prêt à commencer ?</h2>
      <p>Inscrivez-vous dès maintenant et découvrez nos projets.</p>
      <router-link to="/inscription" class="btn btn-primary">Créer un compte</router-link>
    </div>
  </div>
</template>

<script setup>
const features = [
  {
    id: 1,
    title: 'Projets Disponibles',
    description: 'Explorez une large sélection de projets disponibles pour répondre à vos besoins.',
    icon: '/src/assets/projects.png',
  },
  {
    id: 2,
    title: 'Commandes Personnalisées',
    description: 'Créez des commandes adaptées à vos besoins spécifiques.',
    icon: '/src/assets/custom.png',
  },
  {
    id: 3,
    title: 'Suivi Facile',
    description: 'Suivez l’état de vos commandes en toute simplicité.',
    icon: '/src/assets/history.png',
  },
];

const testimonials = [
  { id: 1, message: 'Service rapide et fiable, je suis très satisfait.', author: 'Jean Dupont' },
  { id: 2, message: 'Une équipe professionnelle et des projets de qualité.', author: 'Marie Curie' },
];
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  min-height: 70vh;
  padding: 40px 20px;
}

.home-panel {
  max-width: 1000px;
  width: 90%;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5) !important;
}

.home-panel h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.home-panel p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #666;
}

.btn {
  padding: 10px 20px;
  transition: background-color 1s;
}

.btn:active {
  transform: scale(0.98);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.feature-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
}

.feature-card h3 {
  margin: 10px 0;
  font-size: 1.5rem;
}

.feature-card p {
  font-size: 1rem;
  color: #666;
}

.testimonials {
  text-align: center;
  padding: 20px;
}

.testimonials h2 {
  margin-bottom: 20px;
  font-size: 2rem;
}

.testimonial-card {
  margin: 20px auto;
  padding: 30px;
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.testimonial-card p {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #666;
}

.testimonial-card h4 {
  font-size: 1.2rem;
  font-weight: bold;
}

.cta-panel {
  max-width: 800px;
  width: 90%;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.cta-panel h2 {
  margin-bottom: 10px;
  font-size: 2rem;
}

.cta-panel p {
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #666;
}
</style>
  