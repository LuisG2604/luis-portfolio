//ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Contact from '@/views/Contact.vue';
import Inscription from '@/views/Inscription.vue';
import Login from '@/views/Login.vue';
import Services from '@/views/Services.vue';
import Projects from '@/views/SearchProjects.vue';
import Purchase from '@/views/Purchase.vue';
import Receipt from '@/views/Receipt.vue';
import Account from '@/views/AccountSettings.vue';
import Publish from '@/views/PublishProject.vue';
import ManageProjects from '@/views/ManageProjects.vue';
import ManageOrders from '@/views/ManageOrders.vue';
import CustomOrder from '@/views/CustomOrder.vue';
import OrderHistory from '@/views/OrderHistory.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home' , component: Home},
    { path: '/services', name: 'services', component: Services },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/inscription', name: 'inscription', component: Inscription },
    { path: '/login', name: 'login', component: Login },
    { path: '/projects', name: 'projects', component: Projects },
    { path: '/purchase', name: 'purchase', component: Purchase },
    { path: '/receipt', name: 'receipt', component: Receipt },
    { path: '/settings', name: 'settings', component: Account },
    { path: '/publish', name: 'publish', component: Publish },
    { path: '/manage-projects', name: 'manage-projects', component: ManageProjects },
    { path: '/manage-orders', name: 'manage-orders', component: ManageOrders },
    { path: '/custom-order', name: 'custom-order', component: CustomOrder },
    { path: '/order-history', name: 'order-history', component: OrderHistory },
  ],
});
export default router;
