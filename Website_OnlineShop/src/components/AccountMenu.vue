<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->
<template>
    <div class="account-menu">
      <ul>
        <li @click="goToSettings">⚙️ Paramètres du compte</li>
        <li @click="logout">🚪 Se déconnecter</li>
      </ul>
    </div>
    <AccountSettings v-if="showSettings" @close="showSettings = false" />
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import AccountSettings from '@/views/AccountSettings.vue';
  
  const emit = defineEmits(['logout', 'close']);
  const router = useRouter();
  
  const goToSettings = () => {
    emit('close');
    router.push('settings');
  };
  
  const logout = () => {
    emit('logout');
    router.push('login');
  };
  </script>
  
  <style scoped>
  .account-menu {
    position: absolute;
    top: 70px;
    right: 40px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 200px;
    z-index: 1000;
  }
  
  .account-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .account-menu li {
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.5s;
    font-size: 1.1em;
    color: #333;
  }
  
  .account-menu li:hover {
    background-color: #f5f5f5;
  }
  </style>
  