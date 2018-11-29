<template>
  <dl
    :class="{
      'stage-item': true,
      'stage-item--opened': isAccordionOpened
    }"
  >
    <dt @click="toggleAccordion" class="stage-item__header">
      <div class="stage-item__side">
        <p v-if="!dragStarted" class="stage-item__index">Этап №{{ index }}</p>
        <p v-else style="width:90px"></p>
      </div>
      <h3 class="stage-item__title">{{ title }}</h3>
      <!-- TODO: Make dynamic -->
      <div class="stage-item__side stage-item__side--right">
        <p class="stage-item__time">05:00</p>
      </div>
      <button class="handler" type="button">Drag handler</button>     
    </dt>
    <dd ref="panel" class="stage-item__body">
      <div class="stage-item__inner">
        <draggable
          v-model="steps" 
          :options="{
            ghostClass: 'ghost'
          }"
        >
          <StepItem
            v-for="(step, index) in steps"
            :key="step.id"
            :id="step.id"
            :title="step.title"
            :index="index + 1"
            :elemIds="step.elems"
          />
        </draggable>
        <button  
          type="button"
          class="button button--size--medium task-builder__button"
          @click="openAddStepModal"
        >
          Добавить шаг
        </button>
      </div>
    </dd>

    <ModalEdit 
      v-show="modalVisible"
      @close="modalVisible=false"
      title="Добавить шаг"
      :onSbm="() => addStepAndClearTitle()"
    > 
      <input 
        ref="toFocus"
        required
        slot="body"
        type="text"
        class="input modal__input"
        placeholder="Введите название шага"
        v-model="newStepTitle"
      >
      <button 
        slot="footer"
        type="submit"
        class="button button--size--small modal__button"
      >
        Добавить
      </button>
    </ModalEdit>    
  </dl>
</template>

<script>
  import StepItem from "@/components/StepItem.vue"
  import ModalEdit from "@/components/ModalEdit.vue"

  import draggable from 'vuedraggable'
  import { mapActions, mapGetters } from 'vuex'


  export default {
    components: {
      StepItem,
      ModalEdit,
      draggable
    },
    props: {
      id: {
        type: Number,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true,
        validator(value) {
          return Boolean( value.trim() )
        }
      },
      stepIds: {
        type: Array,
        required: true
      },
      dragStarted: {
        type: Boolean,
      }
    },
    computed: {
      steps: {
        get() {
          return this.stepIds.map(id => {
            return this.$store.state.steps.byId[id]
          })
        },

        set(steps) {
          const newSteps = steps.map(step => step.id)
          return this.$store.dispatch('setStepIds', { id: this.id, newSteps })
        }
      }
    },
    data() {
      return {
        isAccordionOpened: false,
        modalVisible: false,
        newStepTitle: ''
      }
    },
    methods: {
      ...mapActions([
        'addStep'
      ]),

      openAddStepModal() {
        this.modalVisible = true
        this.$nextTick(() => this.$refs.toFocus.focus())      
      },

      addStepAndClearTitle() {
        this.addStep({ 
          id: this.id, 
          newStepTitle: this.newStepTitle
        })
        this.newStepTitle = ''
      },

      toggleAccordion() {
        this.isAccordionOpened = !this.isAccordionOpened
      },

      updateHeight() {
        const panel = this.$refs.panel
        if (this.isAccordionOpened) {
          panel.style.maxHeight = panel.scrollHeight + 'px'
        } else {
          panel.style.maxHeight = null
        }
      }
    },
    updated() {
      this.updateHeight()
    }
  };
</script>

<style lang="scss">
  .stage-item {
    width: 100%;
    padding-bottom: 10px;

    &__header {
      position: relative;
      border-radius: 8px;
      background: #e5f0f8;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: 0 100px;
      cursor: pointer;

      &::before {
        content: url('../assets/arrow-bottom.svg');
        position: absolute;
        left: 35px;
        top: 16px;
      }
    }

    &__index,
    &__time {
      border: 1px solid $accent;
      border-radius: 20px;
      padding: 4px 15px;
      color: $accent;
      font-size: 14px;
    }

    &__side {
      display: flex;
      width: 20%;
      flex-grow: 1;

      &--right {
        justify-content: flex-end;
      }
    }

    &__body {
      max-height: 0;
      display: block;
      width: 100%;
      overflow: hidden;
      transition: max-height 0.2s ease-out;
      background: #fafafa;
      margin: 0;
      border-radius: 0 0 8px 8px;
    }

    &__inner {
      padding: 25px 36px;
    }

    &--opened & {

      &__header {
        border-radius: 8px 8px 0 0;  

        &::before {
          content: url('../assets/arrow-top.svg');
        }      
      }
    }
  }

  .handler {
    outline: none;
    position: absolute;
    cursor: move;
    right: 35px;
    top: 15px;
    width: 28px;
    height: 28px;
    font-size: 0;
    border: none;
    background: url('../assets/move.svg');
    background-size: cover;
  }

  .ghost {
    opacity: .55;
  }
</style>
