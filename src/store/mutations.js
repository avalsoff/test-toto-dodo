import Vue from 'vue'

export default {
  setState(state, newState) {
    this.replaceState(newState)
  },
  

  addStage(state, stage) {
    const id = stage.id
    state.stageIDs.push(id)
    state.stages.allIds.push(id)
    Vue.set(state.stages.byId, String(id), stage)
  },

  setStageIds(state, ids) {
    Vue.set(state, 'stageIDs', ids)
  },


  addStep(state, { stageId, stepData }) {
    const stepId = stepData.id;
    state.stages.byId[stageId].steps.push(stepId)
    state.steps.allIds.push(stepId)
    Vue.set(state.steps.byId, String(stepId), stepData)
  },

  setSteps(state, { stageId, newSteps}) {
    Vue.set(state.stages.byId[stageId], 'steps', newSteps)
  },

  
  addElem(state, { stepId, elemData }) {
    const elemId = elemData.id
    state.steps.byId[stepId].elems.push(elemId)
    state.elems.allIds.push(elemId)
    Vue.set(state.elems.byId, String(elemId), elemData)
  },

  setElems(state, { stepId, newElems}) {
    Vue.set(state.steps.byId[stepId], 'elems', newElems)
  },

  setElem(state, { id, elemData }) {
    Vue.set(state.elems.byId, String(id), elemData)
  }
}