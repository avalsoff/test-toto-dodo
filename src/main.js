import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

import cnst from './const'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.dispatch('initStore')
  },
  render: h => h(App)
}).$mount('#app')

store.subscribe((mutation, state) => {
  const jsonState = JSON.stringify(state)
  localStorage.setItem(cnst.STORAGE_KEY, jsonState)
})