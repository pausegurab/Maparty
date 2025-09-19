import Registre from '../components/registre.vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from '@/App.vue'
import Principal from '../components/principal.vue'
import Login from '../components/login.vue'

const routes = [
    { path: '/registre', component: Registre },
    { path: '/', component: Principal},
    { path: '/login', component: Login}
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  export default router;