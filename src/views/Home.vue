<template>
  <div class="container">

    <div class="task-builder">
      <draggable 
        @start="dragStarted=true" 
        @end="dragStarted=false" 
        v-model="stages" 
        :options="{
          ghostClass: 'ghost',
          handle: '.handler',
          setData: modifyDragItem,
          forceFallback: true
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
        class="button task-builder__button" 
        @click="openAddStageModal" 
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
        ref="toFocus"
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

    openAddStageModal() {
      this.modalVisible = true
      this.$nextTick(() => this.$refs.toFocus.focus())      
    },

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
      dataTransfer.setDragImage(header, width, height / 2)
    }
  }
}
</script>


<style lang="scss">
  .task-builder {
    &__button {
      display: block;
      margin: 0 auto;
    }
  }
</style>