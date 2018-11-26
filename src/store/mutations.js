import Vue from 'vue'

export default {
  setState(state, newState) {
    this.replaceState(newState)
  },

  addStage(state, stage) {
    state.stages.push(stage)
  }
}