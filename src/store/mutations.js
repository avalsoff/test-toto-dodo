import Vue from 'vue'

export default {
  setState(state, newState) {
    this.replaceState(newState)
  },

  addStage(state, stage) {
    state.stageIDs.push(stage.id)
    Vue.set(state.stages.byId, String(stage.id), stage)
    // state.stages.byId[stage.id] = stage
    state.stages.allIds.push(stage.id)
  },

  setStageIds(state, ids) {
    // state.stageIDs = ids
    Vue.set(state, 'stageIDs', ids)
  }
}