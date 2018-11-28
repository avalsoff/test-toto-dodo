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

export const addStep = ({ commit }, { id: stageId, newStepTitle: title }) => {
  commit('addStep', {    
    stageId,
    stepData: {
      id: Date.now(),
      title,
      elems: []
    }
  });
}

export const setStageIds = ({ commit }, ids) => {
  commit('setStageIds', ids)
}

export const removeStage = ({ commit }, payload) => {
}
