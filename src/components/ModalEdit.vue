<template>
  <transition name="modal-fade">
    <div @click.self="close" class="modal__backdrop">
      <div class="modal" role="dialog">
        <header class="modal__header">
          {{ title }}
        </header>
        <form 
          @submit.prevent="onSbm" 
          @keyup.esc="close"
        >            
          <section class="modal__body">
            <slot name="body"></slot>
          </section>
          <footer class="modal__footer">
            <slot name="footer"></slot>
          </footer>
        </form>
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
    },
    onSbm: {
      type: Function,
    }
  }
}
</script>

<style lang="scss">
.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  border-radius: 5px;
  min-width: 320px;

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

  &__header {
    font-size: 20px;
    padding: 15px 25px;
    border-bottom: 1px solid $border;
  }

  &__body {
    padding: 20px 25px;
    border-bottom: 1px solid $border;
  }

  &__footer {
    padding: 15px 25px;
    display: flex;
    flex-direction: row-reverse;
  }

  &__input {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .3s ease
}
</style>
