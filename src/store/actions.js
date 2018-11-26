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
    title,
    id: Date.now()
  })
}

export const removeStage = ({ commit }, payload) => {
}
