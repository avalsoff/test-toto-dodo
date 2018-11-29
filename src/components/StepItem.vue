<template>
  <div class="step-item">
    <div class="step-item__header">
      <p class="step-item__index">
        Шаг № {{ index }}
      </p>
      <span class="line line--horizontal"></span>
      <p class="step-item__title">
        {{ title }}
      </p>
      <span class="line line--horizontal"></span>
    </div>
    <div class="step-item__controls">      
      <button @click="openAddElemModal" title="Добавить элемент" type="button" class="step-item__add-elem"></button>
    </div>
    <div class="step-item__body">
      <draggable
        class="step-item__elems"
        v-model="elems" 
        element="ul"
        :options="{
          ghostClass: 'ghost',
        }"
      >
        <ElemItem
          v-for="(elem, index) in elems"
          :key="elem.id"
          :id="elem.id"
          :title="elem.title"
          :index="index"
        />
      </draggable>
    </div>

    <ModalEdit 
      v-show="modalVisible"
      @close="modalVisible=false"
      title="Добавить элемент"
      :onSbm="() => addElemAndClearAll()"
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
      <input 
        required
        slot="body"
        type="text"
        class="input modal__input"
        placeholder="Введите время"
        v-model="newElemTime"
      >
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

  import draggable from 'vuedraggable'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      ElemItem,
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
      elemIds: {
        type: Array,
        required: true
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

      addElemAndClearAll() {
        this.addElem({ 
          id: this.id, 
          elemData: {
            title: this.newElemTitle,
            manager: this.newElemManager,
            time: this.newElemTime
          }
        })
        this.newElemTitle = ''
        this.newElemManager = ''
        this.newElemTime = ''
      }
    },
    data() {
      return {
        modalVisible: false,
        newElemTitle: '',
        newElemManager: '',
        newElemTime: ''
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

  .line {
    width: 1px;
    height: 1px;
    background: rgba(#2c3e50, .25);
    flex-grow: 1;
  }
</style>
