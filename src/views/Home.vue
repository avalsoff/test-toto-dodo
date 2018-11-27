<template>
  <div class="container">
    <div class="constructor">
      <draggable 
        @start="dragStarted=true" 
        @end="dragStarted=false" 
        v-model="stages" 
        :options="{handle: '.handler', ghostClass: 'ghost'}"
      >
        <StageItem
          v-for="(stage, index) in stages"
          :key="stage.id"
          :id="stage.id"
          :title="stage.title"
          :index="index + 1"
          :dragStarted="dragStarted"
        />
      </draggable>
      <label>
        Введите имя стадии
        <input type="text" v-model="newStageTitle">
      </label>
      <button @click="addStage(newStageTitle)" role="button">Добавить стадию</button>
    </div>    
  </div>
</template>

<script>
import StageItem from '@/components/StageItem.vue'

import draggable from 'vuedraggable'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    draggable,
    StageItem
  },
  data() {
    return {
      newStageTitle: '',
      test: [],
      dragStarted: false
    }
  },
  computed: {
    stages: {
      get() {
        return this.$store.getters.stages
      },
      set(stage) {
        const ids = stage.map(stage => stage.id)
        this.$store.dispatch('setStageIds', ids)
      }
    }
  },
  methods: {
    ...mapActions([
      'addStage'
    ])
  }
}
</script>


<style lang="scss">
  .container {
    max-width: 1100px;
    margin: 0 auto;
  }
</style>