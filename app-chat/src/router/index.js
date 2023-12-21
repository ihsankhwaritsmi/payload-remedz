import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ChannelView from '../views/ChannelView.vue'
// import ListChannel from '../views/ListChannel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },

    {
      path: '/',
      name: 'home',
      component: LoginView
    },
  
    {
      path: '/channel',
      name: 'channel',
      component: ChannelView
    },
    {
      path: "/:pathMatch(.*)*",
      component: ()=> import("../views/NotFound.vue")
    }
   
   
  ]
})

export default router
