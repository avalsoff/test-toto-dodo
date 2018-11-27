import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  stageIDs: [],

  stages: {
    byId: {      
      // 'stage1': {
      //   id,
      //   title,
      //   steps: ['step1', ...]
      // },
    },
    allIds: []
  },

  steps: {
    byId: {
      // 'step1': {
      //   id,
      //   title,
      //   elems: ['elem1', ...]
      // },
    },
    allIds: []
  },

  elems: {
    byId: {
      // 'elem1': {
      //   id,
      //   title,
      //   manager,
      //   time
      // },
    },
    allIds: []
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})