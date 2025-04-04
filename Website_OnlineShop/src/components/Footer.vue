<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h3>Support</h3>
          <ul>
            <li>Adresse : 123 Rue Saint-Josehp, Gatineau</li>
            <li>Téléphone : +1 (123) 456-7890</li>
            <li>Email : support@example.com</li>
          </ul>
        </div>
  
        <div class="footer-section">
          <h3>Services</h3>
          <ul>
            <li>Rechercher des projets</li>
            <li>Créer une commande</li>
            <li>Suivi des commandes</li>
          </ul>
        </div>
  
        <div class="footer-section">
          <h3>Réseaux sociaux</h3>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>
    </footer>
  </template>
  
<script setup>

</script>

<style scoped>
.footer {
  background-color: #1b1214;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  width: 100%;
  margin-top: auto;
  box-shadow: -5px -5px 10px rgba(0, 0, 0, 0.5);
}

.footer-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ff9ba3;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
  font-size: 0.9rem;
}
</style>
