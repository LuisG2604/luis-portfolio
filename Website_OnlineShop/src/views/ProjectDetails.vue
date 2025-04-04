<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="details-card">
    <div class="details-image">
      <img :src="'http://localhost:4000/data/img/' + project.image" alt="Project Image" />
    </div>
    <button class="close-btn btn-primary" @click="$emit('close')">X</button>
    <h2>{{ project.title }}</h2>
    <p>{{ project.description }}</p>
    <p style="font-size: 1.5em; font-weight: bold;">Prix: ${{ project.price }}</p>
    <button class="btn btn-primary" @click="goToPurchase">Acheter ce projet</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({ project: { type: Object, required: true }});

const router = useRouter();
const goToPurchase = () => {
  router.push({
    name: 'purchase',
    query: {
      title: props.project.title,
      description: props.project.description,
      price: props.project.price,
      image: props.project.image
    }
  });
};
</script>

<style scoped>
.details-card {
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}
.details-card h2, p{
  user-select: none;
  pointer-events: none;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 10px;
  padding: 5px 12px;
  cursor: pointer;
}

.details-image img {
  user-select: none;
  pointer-events: none;
  width: 80%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
}

</style>
