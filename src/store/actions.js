// import * as api from '../api'
const STORAGE_KEY = 'toto-dodo-state'

export const initStore = ({ commit }) => {
  const state = localStorage.getItem(STORAGE_KEY)
  if (state) {
    commit('setState', state)
  }
}

export const removeStage = ({ commit }, payload) => {
}
