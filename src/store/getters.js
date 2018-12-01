export const stages = state => {
  return state.stageIDs.map(id => state.stages.byId[id])
}

export const stepTime = state => id => {
  const elemIds = state.steps.byId[id].elems
  const elems = elemIds.map(id => state.elems.byId[id])
  return elems.reduce((sum, elem) => {
    return sum + elem.time
  }, 0)
}

export const stageTime = (state, getters) => id => {
  const stepIds = state.stages.byId[id].steps
  const times = stepIds.map(id => getters.stepTime(id))
  return times.reduce((sum, t) => sum + t, 0)
}