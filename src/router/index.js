import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Contact from '@/components/Contact'
import AddMovie from '@/components/Movie/AddMovie'
import Movie from '@/components/Movie/Movie'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
    {
      path: '/addMovie',
      name: 'AddMovie',
      component: AddMovie
    },
    {
      path: '/movies/:id',
      name: 'Movie',
      component: Movie,

    }
  ]
})
