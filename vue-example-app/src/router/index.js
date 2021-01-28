import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  /* 剧集的路径 */
  {
    path: '/',
    name: 'Tv',
    component: () => import('../views/Tv.vue')
  },
  /* 音乐的路径 */
  {
    path: '/music',
    name: 'Music',
    component: () => import('../views/Music.vue')
  },
  /* 书籍的路径 */
  {
    path: '/book',
    name: 'Book',
    component: () => import('../views/Book.vue')
  },
  /* 聊天的路径 */
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/Chat.vue')
  },
  /* Tv详情页面的路径 */
  {
    path: '/tvDetail/:id',
    name: 'TvDetail',
    component: () => import('../views/TvDetail.vue')
  },
  /* 书籍的路径 */
  {
    path:'./book',
    name:'Book',
    component:()=>import('../views/Book.vue')
  },
  /* 音乐的路径 */
  {
    path:'/music',
    name:'Music',
    component:()=>import('../views/Music.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
