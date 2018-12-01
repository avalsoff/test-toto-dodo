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
      <input 
        required
        slot="body"
        type="text"
        class="input modal__input"
        placeholder="Введите время в формате ЧЧ:ММ"
        :value="time | formatTime"
        @input="e => newElemTime = e.target.value"
      >

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
 
  import { mapActions } from 'vuex'

  export default {
    components: {
      ModalEdit
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
        newElemTime: this.$options.filters.formatTime(this.time)
      }
    },
    computed: {      
      minutes() {
        const [hours, minutes] = this.newElemTime.split(':')
        return hours * 60 + Number(minutes)
      },
    },
    methods: {
      ...mapActions([
        'editElem'
      ]),

      openEditModal() {
        this.modalVisible = true
        this.$refs.toFocus.focus()
      },

      validate() {
        const regexpHHMM = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
        return regexpHHMM.test(this.newElemTime)
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
        if (this.validate()) {
          this.editElement()
          this.modalVisible = false
        } else {
          alert('Неверный формат времени.')
        }
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
