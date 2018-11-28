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

  addStep(state, { stageId, stepData }) {
    const stepId = stepData.id;
    state.stages.byId[stageId].steps.push(stepId)
    state.steps.allIds.push(stepId)
    Vue.set(state.steps.byId, String(stepId), stepData)
  },

  setStageIds(state, ids) {
    // state.stageIDs = ids
    Vue.set(state, 'stageIDs', ids)
  }
}