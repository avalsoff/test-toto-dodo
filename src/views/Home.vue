<template>
  <div class="container">
    <div class="constructor">
      <StageItem
        v-for="(stage, index) in stages"
        :key="stage.id"
        :id="stage.id"
        :title="stage.title"
        :index="index + 1"
      />
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

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    StageItem
  },
  data() {
    return {
      newStageTitle: ''
    }
  },
  computed: {
    ...mapGetters([
      'stages'
    ])
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