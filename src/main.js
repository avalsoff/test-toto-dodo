import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

import cnst from './const'

Vue.config.productionTip = false

Vue.filter('formatTime', time => {
  const fl = Math.floor
  const days = fl( fl(time / 24) / 60 )
  const hours = fl(time / 60) % 24
  const minutes = time % 60

  const pad = n => n < 10 ? '0' + n : n
  
  return days === 0
    ? hours === 0
      ? `${minutes} минут`
      : `${pad(hours)}:${pad(minutes)}`
    : `${days}д ${hours}ч ${minutes}м`
})

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