import Vue from 'vue'

export default {
  setState(state, newState) {
    this.replaceState(newState)
  },

  addStage(state, stage) {
    state.stageIDs.push(stage.id)
    state.stages.byId[stage.id] = stage
    state.stages.allIds.push(stage.id)
  },

  setStageIds(state, ids) {
    state.stageIDs = ids
  }
}