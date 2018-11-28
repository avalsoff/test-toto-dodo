<template>
  <transition name="modal-fade">
    <div @click.self="close" class="modal__backdrop">
      <div class="modal" role="dialog">
        <header class="modal__header">
          {{ title }}
        </header>
        <section class="modal__body">
          <slot></slot>
        </section>
        <footer class="modal__footer">
          <button class="btn-green" type="button" @click="close">Закрыть</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close');
    }
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;

  &__backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(#000, .3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .modal__header,
  .modal__footer {
    padding: 15px;
    display: flex;
  }

  .modal__header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal__footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal__body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease
}
</style>
