<template>
  <div class="step-item">
    <div class="step-item__header">
      <p class="step-item__index">
        Шаг № {{ index }}
      </p>
      <span class="line line--fixed"></span>
      <p class="step-item__title">
        {{ time | formatTime }}
      </p>
      <span class="line line--horizontal"></span>
      <p class="step-item__title">
        {{ title }}
      </p>
      <span class="line line--fixed line--size--medium"></span>
    </div>
    <div class="step-item__controls">      
      <button 
        class="step-item__add-elem"
        type="button" 
        title="Добавить элемент" 
        :disabled="additionDisabled" 
        @click="openAddElemModal" 
      ></button>
    </div>
    <div class="step-item__body">
      <draggable
        class="step-item__elems"
        v-model="elems" 
        element="ul"
        :options="{
          ghostClass: 'ghost',
          handle: '.elem__body',    
          setData: modifyDragItem,            
          forceFallback: true
        }"
      >
        <ElemItem
          v-for="(elem, index) in elems"
          :key="elem.id"
          :id="elem.id"
          :title="elem.title"
          :manager="elem.manager"
          :time="elem.time"
          :index="index"
        />
      </draggable>
    </div>

    <ModalEdit 
      v-show="modalVisible"
      @close="modalVisible=false"
      title="Добавить элемент"
      :onSbm="() => onAdd()"
    > 
      <input 
        ref="toFocus"
        required
        slot="body"
        type="text"
        class="input modal__input"
        placeholder="Введите название задания"
        v-model="newElemTitle"
      >
      <input 
        required
        slot="body"
        type="text"
        class="input modal__input"
        placeholder="Введите ФИО отвественного"
        v-model="newElemManager"
      >
      <VueTimepicker 
        slot="body"
        v-model="newElemTime"
      ></VueTimepicker>

      <button 
        slot="footer"
        type="submit"
        class="button button--size--small modal__button"
      >
        Добавить
      </button>
    </ModalEdit>    
  </div>
</template>

<script>
  import ElemItem from '@/components/ElemItem.vue'
  import ModalEdit from '@/components/ModalEdit.vue'

  import VueTimepicker from 'vue2-timepicker'
  import draggable from 'vuedraggable'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      ElemItem,
      ModalEdit,
      draggable,
      VueTimepicker
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
      elemIds: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        modalVisible: false,
        newElemTitle: '',
        newElemManager: '',
        newElemTime: {HH: '00', mm: '00'}
      }
    },
    computed: {
      elems: {
        get() {
          return this.elemIds.map(id => {
            return this.$store.state.elems.byId[id]
          })
        },

        set(elems) {
          const newElems = elems.map(elem => elem.id)
          return this.$store.dispatch('setElemIds', { id: this.id, newElems })
        }
      },

      time() {
        return this.$store.getters.stepTime(this.id);
      },

      minutes() {
        const { HH, mm } = this.newElemTime
        return HH * 60 + Number(mm)
      },

      additionDisabled() {
        return this.elems.length >= 3
      }
    },
    methods: {
      ...mapActions([
        'addElem'
      ]),

      openAddElemModal() {
        this.modalVisible = true
        this.$nextTick(() => this.$refs.toFocus.focus())      
      },

      addElement() {
        this.addElem({ 
          id: this.id, 
          elemData: {
            title: this.newElemTitle,
            manager: this.newElemManager,
            time: this.minutes
          }
        })
      },

      clearAll() {
        this.newElemTitle = ''
        this.newElemManager = ''
        this.newElemTime = {HH:'00',mm:'00'}
      },

      onAdd() {
        this.addElement()
        this.clearAll()
      },
      
      // Fix huge drag-image, replace it with the .elem_body
      modifyDragItem(dataTransfer, dragEl) {
        const HANDLER_PADDING = 15
        
        const body = dragEl.lastChild 
        const width = body.scrollWidth - HANDLER_PADDING
        const height = body.scrollHeight
        dataTransfer.setDragImage(body, width, height / 2)
      }
    }
  }
</script>

<style lang="scss">
  .step-item {
    display: flex;
    align-items: center;
    padding-bottom: 15px;

    &__header {
      cursor: move;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 40%;
      flex-grow: 1
    }

    &__index,
    &__title {
      position: relative;
      border: 1px solid rgba(#2c3e50, .25);
      border-radius: 30px;
      background: #fff;
      padding: 7px 15px;
      margin: 0;
    }

    &__title {
      max-width: 70%;
    }

    &__add-elem {
      cursor: pointer;
      outline: none;
      background: url('../assets/add.svg');
      background-size: cover;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      left: 35px;
      top: 16px;

      &:disabled {
        opacity: .3;
      }
    }

    &__body {
      width: 40%;
      flex-grow: 1
    }

    &__elems {
      display: flex;
      align-items: center;
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
  }
</style>
