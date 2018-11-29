<template>
  <div class="container">

    <div class="constructor">
      <draggable 
        @start="dragStarted=true" 
        @end="dragStarted=false" 
        v-model="stages" 
        :options="{
          ghostClass: 'ghost',
          setData: modifyDragItem
        }"
      >
        <StageItem
          v-for="(stage, index) in stages"
          :key="stage.id"
          :id="stage.id"
          :title="stage.title"
          :stepIds="stage.steps"
          :index="index + 1"
          :dragStarted="dragStarted"
        />
      </draggable>
      <button 
        role="button"
        class="button constructor__button" 
        @click="modalVisible=true" 
      >
        Добавить этап
      </button>
    </div>


    <ModalEdit 
      v-show="modalVisible"
      @close="modalVisible=false"
      title="Добавить этап"
      :onSbm="() => addStageAndClearTitle()"
    > 
      <input 
        required
        slot="body"
        type="text"
        class="input modal__input"
        placeholder="Введите название этапа"
        v-model="newStageTitle"
      >
      <button 
        slot="footer"
        class="button button--size--small modal__button"
      >
        Добавить
      </button>
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

    addStageAndClearTitle() {
      this.addStage(this.newStageTitle)
      this.newStageTitle = ''
    },

    // Fix huge drag-image, replace it with the .stage-item__header
    modifyDragItem(dataTransfer, dragEl) {
      const HANDLER_PADDING = 45
      
      const header = dragEl.firstChild 
      const width = header.scrollWidth - HANDLER_PADDING
      const height = header.scrollHeight
      dataTransfer.setDragImage(dragEl.firstChild, width, height / 2)
    }
  }
}
</script>


<style lang="scss">
  .constructor {
    &__button {
      display: block;
      margin: 0 auto;
    }
  }
</style>