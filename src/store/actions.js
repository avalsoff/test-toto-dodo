import cnst from '../const';

export const initStore = ({ commit }) => {
  const jsonState = localStorage.getItem(cnst.STORAGE_KEY)
  if (jsonState) {
    const state = JSON.parse(jsonState)
    commit('setState', state)
  }
}

export const addStage = ({ commit }, title) => {
  commit('addStage', {
    id: Date.now(),
    title,
    steps: []
  })
}

export const removeStage = ({ commit }, payload) => {
}
