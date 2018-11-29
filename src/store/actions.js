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

export const setStageIds = ({ commit }, ids) => {
  commit('setStageIds', ids)
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

export const setStepIds = ({ commit }, { id: stageId, newSteps }) => {
  commit('setSteps', { stageId, newSteps })
}

export const addElem = ({ commit }, { id: stepId, elemData }) => {
  const { title, manager, time } = elemData
  commit('addElem', {    
    stepId,
    elemData: {
      id: Date.now(),
      title,
      manager,
      time
    }
  });
}

export const setElemIds = ({ commit }, { id: stepId, newElems }) => {
  commit('setElems', { stepId, newElems })
}