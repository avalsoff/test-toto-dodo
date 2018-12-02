<template>
  <li class="elem">   
    <span class="line line--horizontal"></span>
    <div @click="openEditModal" title="Редактировать элемент" class="elem__body"></div>

    <ModalEdit 
      v-show="modalVisible"
      @close="modalVisible=false"
      title="Редактировать элемент"
      :onSbm="() => onEdit()"
    > 
      <input 
        ref="toFocus"
        required
        slot="body"
        type="text"
        class="input modal__input"
        placeholder="Введите название задания"
        :value="title"
        @input="e => newElemTitle = e.target.value"
      >
      <input 
        required
        slot="body"
        type="text"
        class="input modal__input"
        placeholder="Введите ФИО отвественного"
        :value="manager"
        @input="e => newElemManager = e.target.value"
      >
      <VueTimepicker 
        slot="body"
        :value="getTimeObj()"
        @input="e => newElemTime = e"
      ></VueTimepicker>

      <button 
        slot="footer"
        type="submit"
        class="button button--size--small modal__button"
      >
        Редактировать
      </button>
      <button 
        slot="footer"
        type="button"
        class="button button--size--small modal__button"
        @click="modalVisible=false"
      >
        Отмена
      </button>
    </ModalEdit>    
  </li>
</template>

<script>
  import ModalEdit from '@/components/ModalEdit'
 
  import VueTimepicker from 'vue2-timepicker'
  import { mapActions } from 'vuex'

  export default {
    components: {
      ModalEdit,
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
      manager: {
        type: String,
        required: true,
        validator(value) {
          return Boolean( value.trim() )
        }
      },
      time: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        modalVisible: false,
        newElemTitle: this.title,
        newElemManager: this.manager,
        newElemTime: this.getTimeObj()
      }
    },
    computed: {      
      minutes() {
        const { HH, mm } = this.newElemTime
        return HH * 60 + Number(mm)
      },
    },
    methods: {
      ...mapActions([
        'editElem'
      ]),

      getTimeObj() {
        const time = this.time
        const pad = n => n < 10 ? '0' + n : n
        const HH = pad( Math.floor(time / 60) % 24 )
        const mm = pad( time % 60 )

        return { HH, mm }
      },

      openEditModal() {
        this.modalVisible = true
        this.$refs.toFocus.focus()
      },

      editElement() {
        this.editElem({ 
          id: this.id, 
          elemData: {
            id: this.id,
            title: this.newElemTitle,
            manager: this.newElemManager,
            time: this.minutes
          }
        })
      },

      onEdit() {
        this.editElement()
        this.modalVisible = false
      },
    }
  }
</script>

<style lang="scss">
  .elem {
    width: 33.333333%;
    display: flex;
    align-items: center;

    &__body {
      cursor: move;
      border-radius: 50%;
      width: 33px;
      height: 33px;
      border: 1px solid $accent;
      background: $accent;
      background-image: url('../assets/server.svg');
      background-size: 21px;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
</style>
