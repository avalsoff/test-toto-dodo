

export const stages = state => {
  return state.stageIDs.map(id => state.stages.byId[id])
}

export const stepsByStageId = state => id => {
  const ids = state.stages.byId[id].steps
  return ids.map(id => state.steps.byId[id])
}

export const elemsByStepId = state => id => {
  const ids = state.steps.byId[id].elems
  return ids.map(id => state.elems.byId[id])
}


// DRY, but less readable

// const getterTakeElemsFromItemId = (from, take) => {
//   return state => id => {
//     const takeIds = state[from].byId[id][take]
//     return takeIds.map(id => state[take].byId[id])
//   }
// }

// export const stepsByStageId = getterTakeElemsFromItemId('stages', 'steps')

// export const elemsByStepId = getterTakeElemsFromItemId('steps', 'elems')

