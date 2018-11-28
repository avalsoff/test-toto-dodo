<template>
  <div class="container">
    <div class="constructor">
      <draggable 
        @start="dragStarted=true" 
        @end="dragStarted=false" 
        v-model="stages" 
        :options="{
          handle: '.handler', 
          ghostClass: 'ghost',
          setData: modifyDragItem
        }"
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
      <button @click="modalVisible=true" role="button">Добавить стадию</button>
    </div>
    <ModalEdit 
      v-show="modalVisible"
      @close="modalVisible=false"
      title="Добавить стадию"
    > 
      <input v-model="newStageTitle" type="text" name="" id="" placeholder="Введите название стадии">
      <button @click="addStage(newStageTitle)">Добавить</button>
    </ModalEdit>
  </div>
</template>

<script>
import StageItem from '@/components/StageItem.vue'
import ModalEdit from '@/components/ModalEdit.vue'

import draggable from 'vuedraggable'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    draggable,
    StageItem,
    ModalEdit
  },
  data() {
    return {
      newStageTitle: '',
      test: [],
      dragStarted: false,
      modalVisible: false
    }
  },
  computed: {
    stages: {
      get() {
        return this.$store.getters.stages
      },
      set(stages) {
        const ids = stages.map(stage => stage.id)
        this.$store.dispatch('setStageIds', ids)
      }
    }
  },
  methods: {
    ...mapActions([
      'addStage'
    ]),

    // Fix huge drag-image, replace it to the .stage-item__header
    modifyDragItem(dataTransfer, dragEl) {
      const HANDLER_PADDING = 45
      
      const header = dragEl.firstChild 
      const width = header.scrollWidth - HANDLER_PADDING;
      const height = header.scrollHeight
      dataTransfer.setDragImage(dragEl.firstChild, width, height / 2)
    }
  }
}
</script>


<style lang="scss">
  .container {
    max-width: 1100px;
    margin: 0 auto;
  }
</style>