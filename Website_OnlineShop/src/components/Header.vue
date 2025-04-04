<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
    <header class="header">
         <div class="header-left">
            <div class="logo">
                <img src="@/assets/logo.png" alt="Logo" />
            </div>        
            <nav class="navigation">
                <RouterLink to="/" class="nav-link">Accueil</RouterLink>
                <RouterLink to="/services" class="nav-link">Services</RouterLink>
                <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
            </nav>
         </div>
        <div class="auth-buttons">
            <template v-if="!userStore.isLoggedIn">
                <button @click="goToLogin" class="btn btn-primary">Se connecter</button>
                <button @click="goToSignup" class="btn btn-secondary">S'inscrire</button>
            </template>
            <template v-else>
                <div class="user-info" @click="toggleMenu">
                    <img :src="`http://localhost:4000/data/img/${userStore.getUserImage}`" alt="User Photo" class="user-avatar"/>
                    <span class="user-name">{{ userStore.getUserName }}</span>
                </div>
                <AccountMenu v-if="showMenu" @logout="logout" @close="showMenu = false"/>
            </template>
        </div>        
    </header>
</template>
  
<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import AccountMenu from '@/components/AccountMenu.vue';

const userStore = useUserStore();
const showMenu = ref(false);

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
};

const logout = () => {
    userStore.logout();
    showMenu.value = false;
};

const goToLogin = () => {
    window.location.href = '/login';
};

const goToSignup = () => {
    window.location.href = '/inscription';
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
    .header {
        flex-direction: column;
        padding: 10px 10px;
    }
    .header-left {
        flex-direction: column;
        margin-bottom: 10px;
    }
    .auth-buttons {
        flex-direction: row;
        gap: 10px;
    }
    
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;
    background-color: #ffffff;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.header-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
}

.logo img {
    height: 60px;
}
  
.navigation {
    display: flex;
    gap: 1em;
}
  
.nav-link {
    user-select: none;
    padding: 0em .5em;
    border-radius: 5px;
    font-size: 1.3em;
    text-decoration: none;
    color: #df3954;
    font-weight: bold;
    transition: 0.5s;
}
.nav-link:hover, .nav-link:focus{
    background-color: rgb(236, 236, 236) !important;
}
  
.auth-buttons {
    align-items: right;
    display: flex;
    gap: 10px;
}
  
.user-info {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 15px;
    transition: 0.5s;
    cursor: pointer;
}
.user-info:hover{
    background-color: #c0c0c0;
    transform: translateY(-2px);
}
button{
    padding: 5px 20px;
}
.user-avatar {
    width: 40px;
    height: 40px;
    object-fit: cover;
    cursor: pointer;
}

.user-name {
    font-weight: bold;
    color: #333;
    cursor: pointer;
}

</style>
  